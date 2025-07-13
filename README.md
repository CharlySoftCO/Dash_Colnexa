# 🚀 Dash Colnexa - Dashboard Administrativo

Un dashboard administrativo moderno y elegante construido con Next.js 15, TypeScript y React 19 para la gestión de usuarios y reportes de Colnexa.

## ✨ Características

- 🔐 **Autenticación segura** con JWT y Strapi
- 📱 **Diseño responsive** y moderno
- 🎨 **UI/UX elegante** con gradientes y animaciones
- 📊 **Dashboard interactivo** con KPIs y gráficos
- 👥 **Gestión de usuarios** completa
- 📈 **Reportes y analytics** (en desarrollo)
- ⚙️ **Panel de configuración** (en desarrollo)
- 🌙 **Modo oscuro** (preparado)
- ♿ **Accesibilidad** optimizada

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **UI**: React 19 + CSS Modules
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Backend**: Strapi CMS
- **Estilos**: CSS Modules + Tailwind utilities

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/dash-colnexa.git
cd dash-colnexa
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=https://sstrapiss.colnexa.com.co
NEXT_PUBLIC_APP_NAME=Dash Colnexa
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
dash-colnexa/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── forgot-password/   # Recuperación de contraseña
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de login
│   ├── components/            # Componentes reutilizables
│   │   ├── dashboard/         # Páginas del dashboard
│   │   └── layout/           # Componentes de layout
│   └── lib/                  # Utilidades y helpers
├── public/                   # Archivos estáticos
├── package.json             # Dependencias
└── README.md               # Documentación
```

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

- **Login**: Integración con Strapi `/auth/local`
- **Validación**: Verificación automática de tokens
- **Persistencia**: Almacenamiento en localStorage
- **Protección**: Rutas protegidas automáticamente

### Flujo de Autenticación

1. Usuario ingresa credenciales
2. Validación contra Strapi backend
3. Almacenamiento de JWT
4. Redirección al dashboard
5. Verificación automática en cada navegación

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: `#667eea` (Azul)
- **Secundario**: `#764ba2` (Púrpura)
- **Neutro**: `#f8fafc` (Gris claro)
- **Texto**: `#232946` (Gris oscuro)

### Características de Diseño
- **Glassmorphism**: Efectos de cristal y blur
- **Gradientes**: Transiciones suaves de color
- **Animaciones**: Micro-interacciones fluidas
- **Responsive**: Adaptable a todos los dispositivos

## 📊 Funcionalidades

### Dashboard Principal
- **KPIs**: Métricas clave en tiempo real
- **Gráficos**: Visualización de datos de ventas
- **Tablas**: Lista de usuarios recientes
- **Navegación**: Sidebar colapsible

### Gestión de Usuarios
- **Lista completa**: Todos los usuarios del sistema
- **Estados**: Activo, Inactivo, Bloqueado
- **Filtros**: Búsqueda y ordenamiento
- **Acciones**: Editar, eliminar, bloquear

### Reportes (En Desarrollo)
- **Analytics**: Métricas avanzadas
- **Exportación**: PDF, Excel, CSV
- **Filtros**: Por fecha, usuario, categoría
- **Gráficos**: Interactivos y responsivos

### Configuración (En Desarrollo)
- **Perfil**: Información del usuario
- **Seguridad**: Cambio de contraseña
- **Preferencias**: Tema, idioma, notificaciones
- **Sistema**: Configuraciones administrativas

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Despliegue rápido
- **Docker**: Containerización disponible

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Email**: soporte@colnexa.com.co
- **Documentación**: [docs.colnexa.com.co](https://docs.colnexa.com.co)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/dash-colnexa/issues)

## 🔮 Roadmap

- [ ] **Reportes avanzados** con gráficos interactivos
- [ ] **Configuración completa** del sistema
- [ ] **Notificaciones en tiempo real**
- [ ] **Modo oscuro** implementado
- [ ] **Tests unitarios** y de integración
- [ ] **PWA** (Progressive Web App)
- [ ] **Multi-idioma** (i18n)
- [ ] **Auditoría de seguridad** completa

---

**Desarrollado con ❤️ por el equipo de Colnexa**

## 🔑 Flujo de Autenticación y Configuración

### ¿Cómo funciona la autenticación?

- El usuario inicia sesión usando su correo y contraseña.
- El frontend envía las credenciales a Strapi (`/auth/local`).
- Si son correctas, Strapi responde con un JWT y los datos del usuario.
- El JWT se almacena en localStorage y se usa para autenticar todas las peticiones.
- En cada navegación, el frontend valida el JWT consultando `/users/me` en Strapi.
- Si el token expira o es inválido, el usuario es redirigido automáticamente al login y se muestra un mensaje claro.
- Las rutas privadas (como el dashboard) están protegidas y muestran un loader mientras se valida la sesión.

### Configuración de entorno

Asegúrate de tener un archivo `.env.local` en la raíz del proyecto con al menos:

```
NEXT_PUBLIC_STRAPI_URL=https://sstrapiss.colnexa.com.co
```

Puedes agregar otras variables según tu entorno y necesidades.

---
