'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HomePage from '@/components/dashboard/HomePage';
import ReportsPage from '@/components/dashboard/ReportsPage';
import SettingsPage from '@/components/dashboard/SettingsPage';
import ServicesPage from '@/components/dashboard/ServicesPage';
import { useProtectedRoute } from '@/lib/hooks/useAuth';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('home');
  const { isAuthenticated, isLoading } = useProtectedRoute();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  // Renderizar el contenido según la página activa
  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: 16 }}>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, el hook useProtectedRoute ya redirigirá
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout
      activeItem={activeItem}
      onItemClick={handleItemClick}
      onLogout={() => {}}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
