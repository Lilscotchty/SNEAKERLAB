const DB_NAME = 'amarni-frame-cache';
const STORE = 'frames';
const VERSION = 1;

export const FRAME_COUNT = 758;

export const frameUrl = (i: number) => {
  const base = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/scroll-frames/frames`;
  return `${base}/frame_${String(i).padStart(4, '0')}.webp`;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getCachedFrame(n: number): Promise<Blob | null> {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(n);
      req.onsuccess = () => resolve((req.result as Blob) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function putCachedFrame(n: number, blob: Blob): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(blob, n);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* cache write failures are non-fatal */
  }
}

export async function clearFrameCache(): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* ignore */
  }
}

async function fetchAndCache(n: number, signal: AbortSignal): Promise<Blob | null> {
  const cached = await getCachedFrame(n);
  if (cached) return cached;
  try {
    const res = await fetch(frameUrl(n), { signal, mode: 'cors' });
    if (!res.ok) return null;
    const blob = await res.blob();
    await putCachedFrame(n, blob);
    return blob;
  } catch {
    return null;
  }
}

function decodeBlob(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

export type PreloadPhase = 'cache' | 'download' | 'decode';

export async function preloadAllFrames(
  onProgress: (done: number, total: number, phase: PreloadPhase) => void,
  signal: AbortSignal
): Promise<void> {
  let done = 0;
  const CONCURRENCY = 24;

  const run = async (n: number) => {
    const blob = await fetchAndCache(n, signal);
    if (blob) {
      await decodeBlob(blob);
    }
    done += 1;
    onProgress(done, FRAME_COUNT, cachedCount > 0 ? 'decode' : 'download');
  };

  let cachedCount = 0;
  const counts = await Promise.all(
    Array.from({ length: FRAME_COUNT }, (_, i) => getCachedFrame(i + 1).then((b) => (b ? 1 : 0)))
  );
  cachedCount = counts.reduce<number>((a, b) => a + b, 0);
  onProgress(0, FRAME_COUNT, cachedCount > 0 ? 'cache' : 'download');

  const queue = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1);
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const n = queue.shift();
      if (n === undefined) break;
      if (signal.aborted) return;
      await run(n);
    }
  });
  await Promise.all(workers);
}

export async function getFrameObjectUrl(n: number): Promise<string> {
  const blob = await getCachedFrame(n);
  if (blob) return URL.createObjectURL(blob);
  return frameUrl(n);
}
