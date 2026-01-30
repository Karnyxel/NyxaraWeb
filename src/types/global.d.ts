declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Discord OAuth
      DISCORD_CLIENT_ID: string
      DISCORD_CLIENT_SECRET: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      
      // Database
      DATABASE_HOST: string
      DATABASE_PORT: string
      DATABASE_NAME: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      
      // Bot API
      BOT_API_URL: string
      NEXT_PUBLIC_BOT_API_URL: string
      NEXT_PUBLIC_BOT_API_KEY: string
      NEXT_PUBLIC_BOT_ADMIN_API_KEY: string
      NEXT_PUBLIC_BOT_API_URL: string
      
      // Site Configuration
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_SITE_NAME: string
      NEXT_PUBLIC_DISCORD_INVITE: string
      
      // Environment
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}