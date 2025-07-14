'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { useAuth, useRedirectIfAuthenticated } from '@/lib/hooks/useAuth';
import Swal from 'sweetalert2';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuth();
  const { isLoading: checkingAuth } = useRedirectIfAuthenticated();

  const showToast = (icon: 'error' | 'warning' | 'success', title: string) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      background: '#fff',
      color: '#232946',
      customClass: {
        popup: 'swal2-toast',
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación en el cliente
    if (!email || !password) {
      showToast('warning', 'Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      showToast('warning', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    try {
      await login({
        identifier: email,
        password,
      });
    } catch (error: unknown) {
      // Mostrar mensaje de error del backend si existe
      let errorMsg = 'Correo electrónico o contraseña incorrectos.';
      const err = error as { response?: { status?: number; data?: { message?: unknown } }; message?: string };
      const status = err?.response?.status;
      if (err?.message?.toLowerCase().includes('invalid')) {
        errorMsg = 'Correo electrónico o contraseña incorrectos.';
      } else if (err?.message?.toLowerCase().includes('blocked')) {
        errorMsg = 'Tu cuenta está bloqueada. Contacta al administrador.';
      } else if (err?.response?.data?.message) {
        // Strapi 3.x error format
        const msgArr = err.response.data.message;
        if (Array.isArray(msgArr) && msgArr[0]?.messages?.[0]?.message) {
          const backendMsg = msgArr[0].messages[0].message;
          const backendId = msgArr[0].messages[0].id;
          if (
            backendMsg.toLowerCase().includes('invalid') ||
            backendId === 'Auth.form.error.invalid'
          ) {
            errorMsg = 'Correo electrónico o contraseña incorrectos.';
          } else {
            errorMsg = backendMsg;
          }
        }
      } else if (status === 400 || status === 401) {
        errorMsg = 'Correo electrónico o contraseña incorrectos.';
      }
      showToast('error', errorMsg);
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
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
          {/* Eliminar renderizado de error aquí */}

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
              <input type="checkbox" disabled={isLoading} />
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
