const CARDS = [
  {
    span: 'cat-large',
    img: 'https://images.pexels.com/photos/15557052/pexels-photo-15557052.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Formal black leather shoes',
    label: 'Avant-Garde',
    meta: '24 Styles',
  },
  {
    span: 'cat-small',
    img: 'https://images.pexels.com/photos/11256743/pexels-photo-11256743.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'White chelsea boots',
    label: 'Essentials',
  },
  {
    span: 'cat-wide',
    img: 'https://images.pexels.com/photos/12740481/pexels-photo-12740481.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Suede sneaker on concrete',
    label: 'Performance Heritage',
    meta: 'Sneaker Atelier',
  },
];

export default function Categories() {
  return (
    <section id="collections" className="categories">
      <div className="section-header">
        <div>
          <span className="micro-label">Archetypes</span>
          <h2>The Categories</h2>
        </div>
        <a href="#store" className="btn btn-ghost">View All</a>
      </div>
      <div className="category-grid">
        {CARDS.map((c) => (
          <div key={c.label} className={`cat-card ${c.span}`}>
            <img src={c.img} alt={c.alt} loading="lazy" />
            <div className="cat-info">
              <span style={{ fontWeight: 500 }}>{c.label}</span>
              {c.meta && <span className="micro-label">{c.meta}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
