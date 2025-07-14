'use client';

import { AuthUser } from '@/lib/auth';
import Image from 'next/image';

interface HeaderProps {
  onLogout: () => void;
  user: AuthUser | null;
  onMenuClick?: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onLogout, user, onMenuClick, sidebarOpen }: HeaderProps) {
  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: isMobile ? '0 10px' : '0 32px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 16 }}>
        {/* Botón de menú/flecha siempre visible */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            style={{
              background: 'rgba(102,126,234,0.08)',
              border: 'none',
              borderRadius: 8,
              color: '#232946',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
              cursor: 'pointer',
            }}
            aria-label={isMobile ? (sidebarOpen ? 'Cerrar menú' : 'Abrir menú') : (sidebarOpen ? 'Colapsar sidebar' : 'Expandir sidebar')}
          >
            {isMobile ? (
              sidebarOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" /></svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )
            ) : (
              sidebarOpen ? <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg> : <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
            )}
          </button>
        )}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={isMobile ? 28 : 40}
          height={isMobile ? 28 : 40}
          style={{ borderRadius: 8, background: '#f8fafc' }}
        />
        <span style={{ fontWeight: 700, fontSize: isMobile ? 16 : 20, color: '#232946', letterSpacing: 1, display: isMobile ? 'block' : 'inline' }}>
          {isMobile ? 'Colnexa' : 'Colnexa Panel'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 16 }}>
        {/* Solo mostrar nombre de usuario en desktop */}
        {!isMobile && <span style={{ color: '#232946', fontWeight: 500 }}>{user?.username ?? 'Usuario'}</span>}
        <button
          onClick={onLogout}
          style={{
            background: '#232946',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: isMobile ? '6px 10px' : '8px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: isMobile ? 14 : 15,
            width: isMobile ? 'auto' : undefined,
            height: isMobile ? 32 : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.2s ease',
          }}
          aria-label="Cerrar sesión"
        >
          {/* Icono y texto en móvil, solo texto en desktop */}
          {isMobile && (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21V7a4 4 0 0 1 8 0v14" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          )}
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
