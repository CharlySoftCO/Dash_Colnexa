'use client';

import {
  Home,
  Users,
  BarChart3,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { AuthUser } from '@/lib/auth';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  active: boolean;
}

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
  onLogout: () => void;
  user: AuthUser | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', label: 'Inicio', icon: Home, active: true },
  { id: 'services', label: 'Servicios', icon: Users, active: false },
  { id: 'reports', label: 'Reportes', icon: BarChart3, active: false },
  { id: 'settings', label: 'Configuración', icon: Settings, active: false },
];

export default function Sidebar({ activeItem, onItemClick, onLogout, user, sidebarOpen, toggleSidebar }: SidebarProps) {
  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Overlay para móviles */}
      {isMobile && sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 30 }}
          onClick={toggleSidebar}
        />
      )}
      <aside
        style={{
          width: sidebarOpen ? 280 : 80,
          background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
          color: '#fff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '100vh',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: isMobile ? (sidebarOpen ? 0 : -280) : 0,
          top: 0,
          zIndex: isMobile ? 40 : 30,
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header del sidebar */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'space-between' : 'center',
        }}>
          {/* Logo y texto */}
          <div style={{ display: 'flex', alignItems: 'center', gap: sidebarOpen ? 12 : 0, justifyContent: 'center', width: '100%' }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#fff',
              margin: sidebarOpen ? 0 : '0 auto',
            }}>
              C
            </div>
            {sidebarOpen && (
              <span style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: 0.5 }}>
                Colnexa
              </span>
            )}
          </div>
          {/* Botón de cerrar solo en móvil y cuando el sidebar está abierto */}
          {isMobile && sidebarOpen && (
            <button
              onClick={toggleSidebar}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 28,
                cursor: 'pointer',
                position: 'absolute',
                top: 18,
                right: 18,
                zIndex: 50,
                padding: 0,
                lineHeight: 1,
              }}
              aria-label="Cerrar menú"
              title="Cerrar menú"
            >
              ×
            </button>
          )}
        </div>
        {/* Navegación */}
        <nav style={{ flex: 1, padding: sidebarOpen ? '20px 12px' : '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id} style={{ marginBottom: 4 }}>
                  <button
                    onClick={() => onItemClick(item.id)}
                    style={{
                      width: '100%',
                      padding: sidebarOpen ? '12px 16px' : '12px 0',
                      background: isActive
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'transparent',
                      border: 'none',
                      borderRadius: 12,
                      color: isActive ? '#fff' : '#cbd5e1',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarOpen ? 'flex-start' : 'center',
                      gap: sidebarOpen ? 12 : 0,
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                    }}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <IconComponent
                      size={20}
                      style={{
                        minWidth: 20,
                        opacity: isActive ? 1 : 0.8,
                      }}
                    />
                    {sidebarOpen && (
                      <span style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.label}
                      </span>
                    )}
                    {/* Indicador de activo */}
                    {isActive && sidebarOpen && (
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 4,
                        height: 20,
                        background: '#fff',
                        borderRadius: '0 2px 2px 0',
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                      }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Footer del sidebar */}
        <div style={{
          padding: '20px 12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {/* Perfil de usuario */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 12,
            gap: 12,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <div style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <User size={16} color="#fff" />
            </div>
            {sidebarOpen && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {user?.username ?? 'Usuario'}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#94a3b8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {user?.email ?? 'Administrador'}
                </div>
              </div>
            )}
          </div>
          {/* Botón de logout */}
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: sidebarOpen ? '12px 16px' : '12px 0',
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              borderRadius: 12,
              color: '#fca5a5',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              gap: sidebarOpen ? 12 : 0,
              transition: 'all 0.2s ease',
              fontSize: 14,
              fontWeight: 500,
            }}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
