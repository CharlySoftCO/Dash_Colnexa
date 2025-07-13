'use client';

const kpiData = [
  { label: 'Usuarios Activos', value: 1280 },
  { label: 'Ventas Hoy', value: '$3,200' },
  { label: 'Notificaciones', value: 12 },
  { label: 'Tickets Soporte', value: 5 },
];

const chartData = [
  { mes: 'Ene', ventas: 4000, porcentaje: 100 },
  { mes: 'Feb', ventas: 3000, porcentaje: 75 },
  { mes: 'Mar', ventas: 2000, porcentaje: 50 },
  { mes: 'Abr', ventas: 2780, porcentaje: 70 },
  { mes: 'May', ventas: 1890, porcentaje: 47 },
  { mes: 'Jun', ventas: 2390, porcentaje: 60 },
  { mes: 'Jul', ventas: 3490, porcentaje: 87 },
];

const tableData = [
  { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', estado: 'Activo' },
  { id: 2, nombre: 'Ana Gómez', rol: 'Usuario', estado: 'Pendiente' },
  { id: 3, nombre: 'Carlos Ruiz', rol: 'Usuario', estado: 'Activo' },
  { id: 4, nombre: 'Laura Torres', rol: 'Soporte', estado: 'Inactivo' },
];

export default function HomePage() {
  return (
    <>
      {/* KPIs */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'flex-start' }}>
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(60,60,120,0.07)',
              padding: '24px 32px',
              minWidth: 180,
              flex: '1 1 180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              border: '1.5px solid #e2e8f0',
            }}
          >
            <span style={{ color: '#718096', fontSize: 15 }}>{kpi.label}</span>
            <span style={{ fontWeight: 700, fontSize: 28, color: '#232946', marginTop: 6 }}>{kpi.value}</span>
          </div>
        ))}
      </section>

      {/* Gráfico de ventas */}
      <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0', minHeight: 320 }}>
        <h3 style={{ color: '#232946', fontWeight: 600, marginBottom: 20 }}>Ventas Mensuales</h3>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: 200, padding: '20px 0', gap: 8 }}>
          {chartData.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  width: '100%',
                  height: `${item.porcentaje}%`,
                  background: 'linear-gradient(180deg, #667eea 0%, #5a67d8 100%)',
                  borderRadius: '4px 4px 0 0',
                  minHeight: 20,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                title={`${item.mes}: $${item.ventas.toLocaleString()}`}
              />
              <span style={{ marginTop: 8, fontSize: 12, color: '#718096', fontWeight: 500 }}>{item.mes}</span>
              <span style={{ fontSize: 10, color: '#a0aec0', marginTop: 2 }}>${item.ventas}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: '#667eea', borderRadius: 2 }}></div>
            <span style={{ fontSize: 14, color: '#718096' }}>Ventas ($)</span>
          </div>
        </div>
      </section>

      {/* Tabla de datos */}
      <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0' }}>
        <h3 style={{ color: '#232946', fontWeight: 600, marginBottom: 12 }}>Usuarios recientes</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ textAlign: 'left', padding: 10, color: '#718096', fontWeight: 600 }}>ID</th>
                <th style={{ textAlign: 'left', padding: 10, color: '#718096', fontWeight: 600 }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: 10, color: '#718096', fontWeight: 600 }}>Rol</th>
                <th style={{ textAlign: 'left', padding: 10, color: '#718096', fontWeight: 600 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: 10 }}>{row.id}</td>
                  <td style={{ padding: 10 }}>{row.nombre}</td>
                  <td style={{ padding: 10 }}>{row.rol}</td>
                  <td style={{ padding: 10 }}>{row.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
} 