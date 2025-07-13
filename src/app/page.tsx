'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación en el cliente
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    // Validación de formato de email
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://sstrapiss.colnexa.com.co/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Mensaje de error del backend (usuario o contraseña incorrectos)
        setError(data.error?.message || 'Correo electrónico o contraseña incorrectos');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('jwt', data.jwt);
      router.push('/dashboard');
    } catch (err) {
      setError('Error de red o del servidor');
    } finally {
      setIsLoading(false);
    }
  };

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
              <button
                type="button"
                onClick={() => setError('')}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: 18,
                  color: '#c53030',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: 0,
                  height: 24,
                  width: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Cerrar alerta"
              >
                ×
              </button>
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
