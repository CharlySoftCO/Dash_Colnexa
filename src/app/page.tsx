'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { useAuth, useRedirectIfAuthenticated } from '@/lib/hooks/useAuth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, isLoading, error } = useAuth();
  const { isLoading: checkingAuth } = useRedirectIfAuthenticated();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación en el cliente
    if (!email || !password) {
      alert('Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    try {
      await login({
        identifier: email,
        password,
      });
    } catch (error: any) {
      // Mostrar mensaje de error más amigable
      if (error?.message?.toLowerCase().includes('invalid')) {
        alert('Usuario o contraseña incorrectos.');
      } else if (error?.message?.toLowerCase().includes('blocked')) {
        alert('Tu cuenta está bloqueada. Contacta al administrador.');
      } else {
        alert('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
      }
      console.error('Error en login:', error);
    }
  };

  // Mostrar loader mientras se verifica la autenticación
  if (checkingAuth) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#718096', fontSize: 16 }}>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Header + Welcome Moderno */}
        <div className={styles.headerModern}>
          <div className={styles.logoModern}>
            <div className={styles.logoModernImg}>
              <div className={styles.logoContent}>
                <span className={styles.logoText}>C</span>
              </div>
            </div>
          </div>
          <div className={styles.welcomeModern}>
            <h2>¡Bienvenido!</h2>
            <p>Accede a tu cuenta para continuar</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error} style={{ position: 'relative' }}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="/forgot-password" className={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {isLoading ? (
              <div className={styles.spinner} />
            ) : (
              <>
                <span style={{ lineHeight: 1 }}>Iniciar Sesión</span>
                <ArrowRight size={20} style={{ verticalAlign: 'middle' }} />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className={styles.backLinkContainer}>
          <a href="https://colnexa.com.co" className={styles.backLink}>
            ← Atrás
          </a>
        </div>


      </div>

              {/* Background decoration */}
        <div className={styles.background}>
          <div className={styles.circles}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
          </div>
        </div>

        {/* Background Video */}
        <video 
          src="/login.mp4" 
          autoPlay 
          loop 
          muted
          playsInline
          className={styles.backgroundVideo}
        />
      </div>
  );
}
