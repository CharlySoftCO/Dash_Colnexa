// Utilidades de autenticación para Dash Colnexa

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role?: string;
  blocked: boolean;
  createdAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

class AuthService {
  private readonly STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://sstrapiss.colnexa.com.co';
  private readonly JWT_KEY = process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'jwt';
  private readonly SESSION_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600000');

  /**
   * Inicia sesión con las credenciales proporcionadas
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.STRAPI_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error de autenticación');
      }

      const data: AuthResponse = await response.json();
      this.setToken(data.jwt);
      this.setUser(data.user);
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Verifica si el JWT es válido contra el servidor
   */
  async verifyToken(jwt: string): Promise<boolean> {
    try {
      // Usar el endpoint correcto para Strapi 3.x
      const response = await fetch(`${this.STRAPI_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error verificando JWT:', error);
      // En caso de error de red, asumir válido temporalmente
      return true;
    }
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.JWT_KEY);
  }

  /**
   * Almacena el token
   */
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.JWT_KEY, token);
  }

  /**
   * Elimina el token
   */
  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.JWT_KEY);
  }

  /**
   * Obtiene la información del usuario
   */
  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Almacena la información del usuario
   */
  setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Elimina la información del usuario
   */
  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  /**
   * Obtiene los headers de autorización para las peticiones API
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Verifica si la sesión ha expirado
   */
  isSessionExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decodificar el JWT para obtener la fecha de expiración
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();

      return currentTime > expirationTime;
    } catch (error) {
      console.error('Error decodificando JWT:', error);
      return true;
    }
  }

  /**
   * Refresca la sesión si es necesario
   */
  async refreshSession(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    if (this.isSessionExpired()) {
      this.logout();
      return false;
    }

    const isValid = await this.verifyToken(token);
    if (!isValid) {
      this.logout();
      return false;
    }

    return true;
  }
}

// Exportar una instancia singleton
export const authService = new AuthService();

// Funciones de utilidad para uso directo
export const login = (credentials: LoginCredentials) => authService.login(credentials);
export const logout = () => authService.logout();
export const isAuthenticated = () => authService.isAuthenticated();
export const getToken = () => authService.getToken();
export const getUser = () => authService.getUser();
export const verifyToken = (jwt: string) => authService.verifyToken(jwt);
export const refreshSession = () => authService.refreshSession(); 