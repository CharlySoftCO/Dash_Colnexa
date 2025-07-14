'use client';

export default function SettingsPage() {
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0' }}>
      <h2 style={{ color: '#232946', fontWeight: 600, marginBottom: 20 }}>Configuración del Sistema</h2>
      <p style={{ color: '#718096', fontSize: 16 }}>
        Configura las preferencias del sistema, ajusta parámetros de seguridad y personaliza la experiencia.
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
          Las opciones de configuración avanzada estarán disponibles próximamente.
        </p>
      </div>
    </div>
  );
}
