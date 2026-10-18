import { useEffect, useState } from 'react';
import { supabase, type Product } from '@/lib/supabase';

function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

const FALLBACK: Product[] = [
  { id: 'f1', slug: 'onyx-derb', name: 'Onyx Derb', subtitle: 'Calfskin Leather', price_cents: 89000, image_url: 'https://images.pexels.com/photos/15557047/pexels-photo-15557047.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
  { id: 'f2', slug: 'strata-chelsea', name: 'Strata Chelsea', subtitle: 'Suede / Rubber', price_cents: 112000, image_url: 'https://images.pexels.com/photos/38277608/pexels-photo-38277608.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
  { id: 'f3', slug: 'aero-runner', name: 'Aero Runner', subtitle: 'Technical Mesh', price_cents: 75000, image_url: 'https://images.pexels.com/photos/9853346/pexels-photo-9853346.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true, category_id: null },
  { id: 'f4', slug: 'monolith-oxford', name: 'Monolith Oxford', subtitle: 'Polished Cordovan', price_cents: 95000, image_url: 'https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
  { id: 'f5', slug: 'court-legacy-70', name: 'Court Legacy 70', subtitle: 'Nubuck / Gum Sole', price_cents: 62000, image_url: 'https://images.pexels.com/photos/12740481/pexels-photo-12740481.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true, category_id: null },
  { id: 'f6', slug: 'terra-trail-gtx', name: 'Terra Trail GTX', subtitle: 'Ripstop / Vibram', price_cents: 84000, image_url: 'https://images.pexels.com/photos/31650329/pexels-photo-31650329.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
  { id: 'f7', slug: 'ballete-flat', name: 'Ballete Flat', subtitle: 'Patent Leather', price_cents: 54000, image_url: 'https://images.pexels.com/photos/10743774/pexels-photo-10743774.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
  { id: 'f8', slug: 'aero-runner-mono', name: 'Aero Runner Mono', subtitle: 'Knit / Recycled', price_cents: 68000, image_url: 'https://images.pexels.com/photos/18202585/pexels-photo-18202585.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false, category_id: null },
];

export default function Listings() {
  const [products, setProducts] = useState<Product[]>(FALLBACK);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('id, slug, name, subtitle, price_cents, image_url, is_featured, category_id')
      .order('position')
      .then(({ data, error: err }) => {
        if (err) {
          setError('Could not load the latest arrivals.');
          return;
        }
        if (data && data.length > 0) {
          setProducts(data);
          setError(null);
        }
      });
  }, []);

  return (
    <section id="store" className="listings">
      <div className="section-header" style={{ maxWidth: 1600, margin: '0 auto 4rem' }}>
        <div>
          <span className="micro-label">Curated Selection</span>
          <h2>Latest Arrivals</h2>
        </div>
        {error && (
          <span className="micro-label" style={{ color: 'var(--text-muted)' }}>{error}</span>
        )}
      </div>
      <div className="listing-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-img-wrapper">
              <img src={p.image_url} alt={p.name} loading="lazy" />
            </div>
            <div className="product-meta">
              <div>
                <div className="product-title">{p.name}</div>
                {p.subtitle && <div className="micro-label">{p.subtitle}</div>}
              </div>
              <div className="product-price">{formatPrice(p.price_cents)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
