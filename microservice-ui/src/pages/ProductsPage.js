import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, deleteProduct } from '../features/products/productsSlice';

const s = {
  page: { padding: '2.5rem 2rem', maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { fontFamily: "'Space Mono', monospace", fontSize: '1.6rem', fontWeight: 700 },
  form: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem',
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 0.8fr auto', gap: '1rem', alignItems: 'end',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.8px' },
  input: {
    background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8,
    padding: '0.65rem 1rem', color: 'var(--text)', fontSize: '0.9rem', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
  },
  btn: (color) => ({
    padding: '0.65rem 1.4rem', background: color, color: '#fff',
    border: 'none', borderRadius: 8, cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem',
    whiteSpace: 'nowrap',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' },
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '1.4rem',
    borderTop: '3px solid var(--accent2)',
    display: 'flex', flexDirection: 'column', gap: '0.6rem',
  },
  cardName: { fontWeight: 600, fontSize: '1rem' },
  cardDesc: { color: 'var(--text2)', fontSize: '0.85rem', flexGrow: 1 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' },
  price: { fontFamily: "'Space Mono', monospace", color: 'var(--accent3)', fontWeight: 700, fontSize: '1.1rem' },
  badge: { background: 'var(--accent2)22', color: 'var(--accent2)', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem', fontFamily: "'Space Mono', monospace" },
  del: { background: 'transparent', border: '1px solid var(--accent2)', color: 'var(--accent2)', padding: '0.3rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' },
  empty: { textAlign: 'center', padding: '3rem', color: 'var(--text2)' },
  loading: { textAlign: 'center', padding: '3rem', color: 'var(--accent)', fontFamily: "'Space Mono', monospace" },
};

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { list, status } = useSelector(s => s.products);
  const [form, setForm] = useState({ name: '', description: '', price: '', userId: '' });

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    dispatch(createProduct({ ...form, price: parseFloat(form.price), userId: form.userId ? parseInt(form.userId) : null }));
    setForm({ name: '', description: '', price: '', userId: '' });
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>📦 Products</h1>
        <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>{list.length} total</span>
      </div>

      <form onSubmit={handleSubmit} style={s.form}>
        <div style={s.field}>
          <label style={s.label}>Name</label>
          <input style={s.input} placeholder="Laptop" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Description</label>
          <input style={s.input} placeholder="Gaming Laptop" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Price ($)</label>
          <input style={s.input} placeholder="999.99" type="number" value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })} />
        </div>
        <div style={s.field}>
          <label style={s.label}>User ID</label>
          <input style={s.input} placeholder="1" type="number" value={form.userId}
            onChange={e => setForm({ ...form, userId: e.target.value })} />
        </div>
        <button type="submit" style={s.btn('var(--accent2)')}>+ Add Product</button>
      </form>

      {status === 'loading' && <div style={s.loading}>// loading...</div>}
      {status !== 'loading' && list.length === 0 && <div style={s.empty}>No products yet. Add one above!</div>}

      <div style={s.grid}>
        {list.map(product => (
          <div key={product.id} style={s.card}>
            <span style={s.badge}>#{product.id}</span>
            <div style={s.cardName}>{product.name}</div>
            <div style={s.cardDesc}>{product.description || 'No description'}</div>
            {product.userId && <div style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>Owner: User #{product.userId}</div>}
            <div style={s.cardFooter}>
              <span style={s.price}>${product.price?.toFixed(2)}</span>
              <button style={s.del} onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
