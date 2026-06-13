import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, deleteUser, fetchUserProducts } from '../features/users/usersSlice';

const s = {
  page: { padding: '2.5rem 2rem', maxWidth: 1100, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { fontFamily: "'Space Mono', monospace", fontSize: '1.6rem', fontWeight: 700 },
  form: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem',
    display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end',
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
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: 'var(--surface2)' },
  th: { padding: '0.9rem 1.2rem', textAlign: 'left', fontSize: '0.78rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: '1px solid var(--border)' },
  td: { padding: '1rem 1.2rem', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' },
  badge: { background: 'var(--accent)22', color: 'var(--accent)', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem', fontFamily: "'Space Mono', monospace" },
  del: { background: 'transparent', border: '1px solid var(--accent2)', color: 'var(--accent2)', padding: '0.3rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' },
  empty: { textAlign: 'center', padding: '3rem', color: 'var(--text2)' },
  loading: { textAlign: 'center', padding: '3rem', color: 'var(--accent)', fontFamily: "'Space Mono', monospace" },
  wrap: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' },
  link: { background: 'transparent', border: '1px solid var(--accent3)', color: 'var(--accent3)', padding: '0.3rem 0.8rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', marginRight: '0.5rem' },
  productList: { listStyle: 'none', margin: '0.4rem 0 0', padding: 0, fontSize: '0.82rem', color: 'var(--text2)' },
};

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, status, userProducts } = useSelector(s => s.users);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    dispatch(createUser(form));
    setForm({ name: '', email: '' });
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>👤 Users</h1>
        <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>{list.length} total</span>
      </div>

      <form onSubmit={handleSubmit} style={s.form}>
        <div style={s.field}>
          <label style={s.label}>Name</label>
          <input style={s.input} placeholder="John Doe" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Email</label>
          <input style={s.input} placeholder="john@example.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <button type="submit" style={s.btn('var(--accent)')}>+ Add User</button>
      </form>

      <div style={s.wrap}>
        {status === 'loading' && <div style={s.loading}>// loading...</div>}
        {status !== 'loading' && list.length === 0 && <div style={s.empty}>No users yet. Add one above!</div>}
        {list.length > 0 && (
          <table style={s.table}>
            <thead style={s.thead}>
              <tr>
                <th style={s.th}>ID</th>
                <th style={s.th}>Name</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Products</th>
                <th style={s.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map(user => {
                const up = userProducts?.[user.id];
                return (
                <tr key={user.id}>
                  <td style={s.td}><span style={s.badge}>#{user.id}</span></td>
                  <td style={s.td}>{user.name}</td>
                  <td style={s.td}>{user.email}</td>
                  <td style={s.td}>
                    <button style={s.link} onClick={() => dispatch(fetchUserProducts(user.id))}>
                      {up?.status === 'loading' ? 'Loading...' : `View (${up?.status === 'succeeded' ? up.productCount : '?'})`}
                    </button>
                    {up?.status === 'succeeded' && (
                      <ul style={s.productList}>
                        {up.products.length === 0 && <li>No products</li>}
                        {up.products.map(p => <li key={p.id}>{p.name} - ${p.price?.toFixed(2)}</li>)}
                      </ul>
                    )}
                    {up?.status === 'failed' && <span style={{ color: 'var(--accent2)', fontSize: '0.8rem' }}>Failed to load</span>}
                  </td>
                  <td style={s.td}>
                    <button style={s.del} onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
