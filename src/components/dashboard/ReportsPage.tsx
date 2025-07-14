'use client';

export default function ReportsPage() {
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0' }}>
      <h2 style={{ color: '#232946', fontWeight: 600, marginBottom: 20 }}>Reportes y Analytics</h2>
      <p style={{ color: '#718096', fontSize: 16 }}>
        Genera reportes detallados, visualiza métricas importantes y analiza el rendimiento del sistema.
      </p>

      <div style={{
        marginTop: 24,
        padding: 32,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: 12,
        textAlign: 'center',
      }}>
        <h3 style={{ color: '#232946', fontWeight: 600, marginBottom: 12 }}>Funcionalidad en desarrollo</h3>
        <p style={{ color: '#718096' }}>
          Los reportes avanzados y analytics estarán disponibles próximamente.
        </p>
      </div>
    </div>
  );
}
