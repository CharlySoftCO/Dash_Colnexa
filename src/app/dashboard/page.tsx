'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (!jwt) {
      router.replace('/');
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    // Loader o pantalla en blanco mientras se verifica el JWT
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Bienvenido al Dashboard</h1>
      <p>¡Has iniciado sesión correctamente!</p>
    </div>
  );
} 