# Vyrelith
 Bot - Web Dashboard

![Vyrelith Bot](https://img.shields.io/badge/Vyrelith-Discord%20Bot-red)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-orange)
![License](https://img.shields.io/badge/License-MIT-green)

Panel de control web moderno para Vyrelith
 Bot, un bot de Discord multifuncional con más de 112 comandos, moderación IA, música premium, sistemas de niveles y economía.

## 🚀 Características Principales

### 🤖 **Funcionalidades del Bot**
- **Moderación Avanzada**: Sistema de advertencias, logs automáticos, anti-raid
- **Música Premium**: Reproducción de alta calidad, colas, efectos de audio
- **Niveles y Economía**: Sistema de progresión, tienda personalizable
- **112+ Comandos**: Organizados en 10 categorías diferentes
- **Dashboard Web**: Interfaz intuitiva para gestión completa

### 🌐 **Sitio Web**
- **Diseño Moderno**: Interfaz responsive con modo claro/oscuro
- **Panel de Control**: Gestión de múltiples servidores
- **Estadísticas en Tiempo Real**: Monitoreo de shards, comandos, usuarios
- **Autenticación Segura**: Login con Discord OAuth2
- **Blog Integrado**: Publicaciones, categorías, sistema de comentarios
- **Sección de Equipo**: Perfiles de desarrolladores y colaboradores
- **Sistema de Partners**: Visualización de colaboradores y patrocinadores

### 🛠 **Tecnologías Utilizadas**
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MySQL 8, NextAuth.js
- **Base de Datos**: MySQL con tablas optimizadas
- **Autenticación**: Discord OAuth2 con JWT
- **Despliegue**: Compatible con Vercel, Docker, servidores Node.js
- **APIs**: REST API con 3 niveles de autenticación

## 📦 Instalación Local

### Prerrequisitos
- Node.js 18+ 
- MySQL 8+
- Cuenta de Discord Developer
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/Vyrelith-web.git
cd Vyrelith-web
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
# Base de Datos MySQL
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/Vyrelith"

# Discord OAuth
DISCORD_CLIENT_ID="tu_client_id"
DISCORD_CLIENT_SECRET="tu_client_secret"

# API del Bot
BOT_API_URL="http://localhost:3001"
BOT_API_KEY="tu_clave_api"
BOT_ADMIN_API_KEY="tu_clave_admin"

# NextAuth
NEXTAUTH_SECRET="tu_secreto_nextauth"
NEXTAUTH_URL="http://localhost:3000"

# Configuración del Sitio
NEXT_PUBLIC_APP_NAME="Vyrelith Bot"
NEXT_PUBLIC_APP_VERSION="2.0.0"
```

### 4. Configurar Base de Datos
1. Crear una base de datos MySQL llamada `vyrelith`
2. Ejecutar las migraciones SQL (consultar `database/schema.sql`)
3. Poblar datos iniciales si es necesario

### 5. Iniciar el Servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start

# Verificar tipos TypeScript
npm run type-check

# Linter
npm run lint
```

## 🗄️ Estructura del Proyecto

```
Vyrelith-Web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # Endpoints API
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── blog/          # API del blog
│   │   │   ├── dashboard/     # API del dashboard
│   │   │   ├── partners/      # API de partners
│   │   │   ├── stats/         # API de estadísticas
│   │   │   └── team/          # API del equipo
│   │   ├── auth/              # Páginas de autenticación
│   │   ├── blog/              # Páginas del blog
│   │   ├── dashboard/         # Panel de control
│   │   ├── docs/              # Documentación
│   │   └── [páginas públicas] # Otras páginas
│   ├── components/            # Componentes React
│   │   ├── layout/           # Componentes de layout
│   │   ├── sections/         # Secciones de páginas
│   │   └── ui/              # Componentes UI reutilizables
│   ├── lib/                  # Utilidades y configuraciones
│   │   ├── api/             # Clientes API
│   │   ├── auth/            # Configuración de autenticación
│   │   ├── db/              # Conexión a base de datos
│   │   └── utils/           # Funciones auxiliares
│   └── providers/           # Providers de React
├── public/                  # Archivos estáticos
├── migrations/             # Migraciones de base de datos
├── scripts/               # Scripts de utilidad
└── config/               # Archivos de configuración
```

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/Vyrelith-web)

1. Conectar tu repositorio GitHub
2. Configurar variables de entorno en el dashboard de Vercel
3. Desplegar automáticamente

### Opción 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Opción 3: Servidor Propio
```bash
# Configurar Nginx como proxy inverso
sudo apt install nginx
sudo systemctl start nginx
```

Configurar `/etc/nginx/sites-available/Vyrelith`:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 API Endpoints

### Públicos (Sin autenticación)
- `GET /api/health` - Estado del servicio
- `GET /api/stats` - Estadísticas del bot
- `GET /api/shards` - Información de shards
- `GET /api/partners` - Lista de partners
- `GET /api/team` - Miembros del equipo

### Autenticados (BOT_API_KEY)
- `GET /api/commands` - Lista de comandos
- `GET /api/bot/guilds` - Servidores del bot
- `GET /api/bot/panel` - Panel de control

### Administración (BOT_ADMIN_API_KEY)
- `GET /api/admin/stats` - Estadísticas avanzadas
- `POST /api/admin/cache/clear` - Limpiar caché
- `POST /api/admin/broadcast` - Enviar broadcast

## 🔧 Configuración Avanzada

### Base de Datos
La aplicación utiliza MySQL con las siguientes tablas principales:
- `usuarios` - Usuarios de Discord
- `servidores` - Servidores configurados
- `webblogposts` - Entradas del blog
- `webteammembers` - Miembros del equipo
- `webpartners` - Partners y colaboradores

### Variables de Entorno Adicionales
```env
# Opciones de cache
REDIS_URL="redis://localhost:6379"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-contraseña"

# CDN
NEXT_PUBLIC_CDN_URL="https://cdn.tudominio.com"
```

### Personalización
1. **Branding**: Editar colores en `tailwind.config.ts`
2. **Contenido**: Modificar datos en `/src/data/`
3. **Funcionalidades**: Extender componentes en `/src/components/`
4. **Estilos**: Personalizar CSS en `/src/app/globals.css`

## 🧪 Testing

```bash
# Test completo de la API
node api-test.js

# Test rápido
node api-test.js --quick

# Test de conexión a base de datos
node db-test.js

# Test de componentes (próximamente)
npm run test
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Guía de Contribución
- Sigue la estructura de código existente
- Añade tests para nuevas funcionalidades
- Documenta cambios en la API
- Mantén consistencia en estilos
- Revisa código antes de enviar PR

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- **Documentación**: [docs.Vyrelith.app](https://docs.Vyrelith.app)
- **Discord**: [discord.gg/Vyrelith](https://discord.gg/Vyrelith)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/Vyrelith-web/issues)
- **Email**: soporte@Vyrelith.app

## 🌟 Características Destacadas

✅ **Panel de Control Interactivo** - Gestión visual de servidores  
✅ **Autenticación con Discord** - Login seguro con OAuth2  
✅ **Blog Integrado** - Sistema completo de publicaciones  
✅ **Estadísticas en Tiempo Real** - Monitoreo de 112+ comandos  
✅ **Diseño Responsive** - Compatible móvil y escritorio  
✅ **Modo Claro/Oscuro** - Preferencias del usuario  
✅ **Sistema de Partners** - Visualización de colaboradores  
✅ **API Documentada** - 3 niveles de autenticación  
✅ **Base de Datos MySQL** - Optimizada para performance  
✅ **Despliegue Automático** - Vercel, Docker, servidores propios  

## 🚨 Solución de Problemas Comunes

### Problema: Error de conexión a base de datos
```bash
# Verificar que MySQL está corriendo
sudo systemctl status mysql

# Verificar credenciales en .env.local
# Probar conexión manual
node db-test.js
```

### Problema: Autenticación Discord falla
1. Verificar `DISCORD_CLIENT_ID` y `DISCORD_CLIENT_SECRET`
2. Asegurar que la callback URL está configurada en Discord Developer Portal
3. Verificar que el bot tiene los scopes correctos

### Problema: API del bot no responde
```bash
# Verificar que el bot está corriendo
curl http://localhost:3001/api/health

# Verificar claves API
# Revisar logs del bot
```

## 🔄 Actualizaciones

Mantén tu instalación actualizada:
```bash
# Actualizar dependencias
npm update

# Actualizar desde git
git pull origin main
npm install
npm run build

# Verificar cambios en la base de datos
# (ver migraciones en /migrations/)
```

---

**Vyrelith Bot** - © 2024 Vyrelith Team. Todos los derechos reservados.  
Diseñado con ❤️ para la comunidad de Discord.