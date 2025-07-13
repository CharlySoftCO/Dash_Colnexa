'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulación de envío de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validación básica
      if (!email) {
        setError('Por favor ingresa tu correo electrónico');
        return;
      }

      if (!email.includes('@')) {
        setError('Por favor ingresa un correo electrónico válido');
        return;
      }

      // Simular envío exitoso
      setIsSubmitted(true);
      console.log('Email de recuperación enviado a:', email);
      
    } catch (err) {
      setError('Error al enviar el email. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successHeader}>
            <CheckCircle className={styles.successIcon} />
            <h1>Email Enviado</h1>
            <p>
              Hemos enviado un enlace de recuperación a tu correo electrónico.
            </p>
          </div>

          <div className={styles.successContent}>
            <p>
              Si no encuentras el email, revisa tu carpeta de spam o 
              solicita un nuevo enlace.
            </p>
            
            <div className={styles.actions}>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className={styles.primaryButton}
              >
                Enviar Nuevamente
              </button>
              
              <Link href="/" className={styles.secondaryButton}>
                Volver al Login
              </Link>
            </div>
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header + Welcome Moderno */}
        <div className={styles.headerModern}>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={20} />
            Volver
          </Link>
          
          <div className={styles.logoModern}>
            <div className={styles.logoModernImg}>
              <div className={styles.logoContent}>
                <span className={styles.logoText}>C</span>
              </div>
            </div>
          </div>
          
          <div className={styles.welcomeModern}>
            <h2>Recuperar Contraseña</h2>
            <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
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

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner} />
            ) : (
              'Enviar Enlace de Recuperación'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            ¿Recordaste tu contraseña?{' '}
            <Link href="/" className={styles.link}>
              Iniciar Sesión
            </Link>
          </p>
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