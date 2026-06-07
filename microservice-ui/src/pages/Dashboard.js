import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const s = {
  page: { padding: '2.5rem 2rem', maxWidth: 1100, margin: '0 auto' },
  hero: { marginBottom: '3rem' },
  title: { fontFamily: "'Space Mono', monospace", fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem' },
  sub: { color: 'var(--text2)', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  card: (accent) => ({
    background: 'var(--surface)',
    border: `1px solid var(--border)`,
    borderTop: `3px solid ${accent}`,
    borderRadius: 'var(--radius)',
    padding: '1.8rem',
  }),
  cardNum: { fontSize: '3rem', fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: '0.3rem' },
  cardLabel: { color: 'var(--text2)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' },
  arch: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem' },
  archTitle: { fontFamily: "'Space Mono', monospace", fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text2)' },
  flow: { display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' },
  box: (color) => ({
    background: color + '22',
    border: `1px solid ${color}`,
    color: color,
    padding: '0.6rem 1.2rem',
    borderRadius: 8,
    fontSize: '0.85rem',
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
  }),
  arrow: { color: 'var(--text2)', fontSize: '1.2rem' },
  cta: { display: 'flex', gap: '1rem', marginTop: '2rem' },
  btn: (color) => ({
    padding: '0.75rem 1.5rem',
    background: color,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  }),
};

export default function Dashboard() {
  const users = useSelector(s => s.users.list);
  const products = useSelector(s => s.products.list);

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.title}>🚀 Microservices Dashboard</h1>
        <p style={s.sub}>Spring Boot · Eureka · API Gateway · Kafka · React + Redux</p>
      </div>

      <div style={s.grid}>
        <div style={s.card('var(--accent)')}>
          <div style={{...s.cardNum, color: 'var(--accent)'}}>{users.length}</div>
          <div style={s.cardLabel}>Total Users</div>
        </div>
        <div style={s.card('var(--accent2)')}>
          <div style={{...s.cardNum, color: 'var(--accent2)'}}>{products.length}</div>
          <div style={s.cardLabel}>Total Products</div>
        </div>
        <div style={s.card('var(--accent3)')}>
          <div style={{...s.cardNum, color: 'var(--accent3)'}}>4</div>
          <div style={s.cardLabel}>Active Services</div>
        </div>
      </div>

      <div style={s.arch}>
        <div style={s.archTitle}>// ARCHITECTURE FLOW</div>
        <div style={s.flow}>
          <div style={s.box('#6c63ff')}>React UI</div>
          <span style={s.arrow}>→</span>
          <div style={s.box('#ff6584')}>API Gateway :8080</div>
          <span style={s.arrow}>→</span>
          <div style={s.box('#43e97b')}>User Service :8081</div>
          <span style={s.arrow}>+</span>
          <div style={s.box('#f7971e')}>Product Service :8082</div>
          <span style={s.arrow}>↕</span>
          <div style={s.box('#a18cd1')}>Kafka</div>
          <span style={s.arrow}>↕</span>
          <div style={s.box('#ffecd2')}>Eureka :8761</div>
        </div>
      </div>

      <div style={s.cta}>
        <Link to="/users" style={s.btn('var(--accent)')}>Manage Users →</Link>
        <Link to="/products" style={s.btn('var(--accent2)')}>Manage Products →</Link>
      </div>
    </div>
  );
}
