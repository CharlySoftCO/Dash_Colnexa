'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem: string;
  onItemClick: (itemId: string) => void;
  onLogout?: () => void;
}

export default function DashboardLayout({ 
  children, 
  activeItem, 
  onItemClick, 
  onLogout 
}: DashboardLayoutProps) {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Abierto por defecto en escritorio

  // Detectar si es móvil (usar window.matchMedia para SSR safe)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detectar si es móvil para iniciar cerrado
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  // Calcular margin-left para el contenido principal en escritorio
  const mainMarginLeft = !isMobile ? (sidebarOpen ? 280 : 80) : 0;

  return (
    <div>
      {/* Sidebar: drawer en móviles, fijo en escritorio */}
      <Sidebar 
        activeItem={activeItem}
        onItemClick={onItemClick}
        onLogout={handleLogout}
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div style={{
        marginLeft: mainMarginLeft,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        {/* Header con botón de menú en móviles y toggle en escritorio */}
        <Header onLogout={handleLogout} user={user} onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
        {/* Main content area */}
        <main style={{ flex: 1, padding: '32px 18px', background: 'none', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {children}
        </main>
      </div>
    </div>
  );
} 