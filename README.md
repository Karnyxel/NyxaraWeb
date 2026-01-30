
## 🚀 Puesta en Marcha

### Requisitos
- Node.js 18+ 
- MySQL 8+ (HizukiDB)
- Discord Application (para OAuth)

### Instalación
```bash
# 1. Clonar el repositorio
git clone [url-del-repositorio]
cd nyxara-web

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Configurar base de datos
# Ejecutar el SQL de creación de tablas en HizukiDB

# 5. Iniciar el servidor de desarrollo
npm run dev