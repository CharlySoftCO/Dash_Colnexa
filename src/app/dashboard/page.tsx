'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const kpiData = [
  { label: 'Usuarios Activos', value: 1280 },
  { label: 'Ventas Hoy', value: '$3,200' },
  { label: 'Notificaciones', value: 12 },
  { label: 'Tickets Soporte', value: 5 },
];

const tableData = [
  { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', estado: 'Activo' },
  { id: 2, nombre: 'Ana Gómez', rol: 'Usuario', estado: 'Pendiente' },
  { id: 3, nombre: 'Carlos Ruiz', rol: 'Usuario', estado: 'Activo' },
  { id: 4, nombre: 'Laura Torres', rol: 'Soporte', estado: 'Inactivo' },
];

export default function Dashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (!jwt) {
      router.replace('/');
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    router.replace('/');
  };

  if (checking) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 220 : 64,
          background: '#232946',
          color: '#fff',
          transition: 'width 0.2s',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: sidebarOpen ? 'flex-start' : 'center',
          padding: sidebarOpen ? '24px 12px' : '24px 0',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 24,
            marginBottom: 32,
            cursor: 'pointer',
            alignSelf: sidebarOpen ? 'flex-end' : 'center',
          }}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? '⮜' : '☰'}
        </button>
        <nav style={{ width: '100%' }}>
          <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
            <li style={{ margin: '18px 0', width: '100%' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, display: 'block', padding: sidebarOpen ? '8px 16px' : '8px 0' }}>Inicio</a>
            </li>
            <li style={{ margin: '18px 0', width: '100%' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, display: 'block', padding: sidebarOpen ? '8px 16px' : '8px 0' }}>Usuarios</a>
            </li>
            <li style={{ margin: '18px 0', width: '100%' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, display: 'block', padding: sidebarOpen ? '8px 16px' : '8px 0' }}>Reportes</a>
            </li>
            <li style={{ margin: '18px 0', width: '100%' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, display: 'block', padding: sidebarOpen ? '8px 16px' : '8px 0' }}>Configuración</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header
          style={{
            background: '#fff',
            borderBottom: '1.5px solid #e2e8f0',
            padding: '0 32px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Image src="/logo.svg" alt="Logo" width={40} height={40} style={{ borderRadius: 8, background: '#f8fafc' }} />
            <span style={{ fontWeight: 700, fontSize: 20, color: '#232946', letterSpacing: 1 }}>Colnexa Panel</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#232946', fontWeight: 500 }}>Usuario</span>
            <button
              onClick={handleLogout}
              style={{ background: '#232946', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Main dashboard area */}
        <main style={{ flex: 1, padding: '32px 18px', background: 'none', display: 'flex', flexDirection: 'column', gap: 32 }}>
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

          {/* Gráfico de ejemplo */}
          <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(60,60,120,0.07)', padding: 24, border: '1.5px solid #e2e8f0', minHeight: 220 }}>
            {/* Aquí puedes integrar una librería de gráficos como Chart.js o Recharts */}
            <h3 style={{ color: '#232946', fontWeight: 600, marginBottom: 12 }}>Gráfico de ejemplo</h3>
            <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#718096', fontSize: 16 }}>
              [Gráfico aquí]
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
        </main>
      </div>
    </div>
  );
} 