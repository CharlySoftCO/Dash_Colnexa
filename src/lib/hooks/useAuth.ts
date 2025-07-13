import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, AuthUser, LoginCredentials, AuthResponse } from '../auth';

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = authService.getToken();
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // Verificar si la sesión ha expirado
        if (authService.isSessionExpired()) {
          authService.logout();
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // Verificar token contra el servidor
        const isValid = await authService.verifyToken(token);
        if (!isValid) {
          authService.logout();
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        // Obtener información del usuario
        const userData = authService.getUser();
        setIsAuthenticated(true);
        setUser(userData);
      } catch (err) {
        console.error('Error verificando autenticación:', err);
        setError('Error verificando la sesión');
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AuthResponse = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error en login:', err);
      if (err?.message?.toLowerCase().includes('invalid')) {
        setError('Usuario o contraseña incorrectos.');
      } else if (err?.message?.toLowerCase().includes('blocked')) {
        setError('Tu cuenta está bloqueada. Contacta al administrador.');
      } else {
        setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Función de logout
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Redirigir al login
    router.push('/');
  }, [router]);

  // Función para refrescar la sesión
  const refreshSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const isValid = await authService.refreshSession();
      if (!isValid) {
        setUser(null);
        setIsAuthenticated(false);
        setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        router.push('/');
        return;
      }

      const userData = authService.getUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error refrescando sesión:', err);
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshSession,
  };
}

// Hook para proteger rutas
export function useProtectedRoute(redirectTo: string = '/') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
}

// Hook para redirigir usuarios autenticados
export function useRedirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
} 