import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { 
  Bot, 
  Shield, 
  Music, 
  Zap, 
  Sparkles, 
  Users, 
  BarChart3,
  CheckCircle,
  Server,
  Clock,
  Globe,
  Lock,
  Heart
} from "lucide-react"

export default function Home() {
  const stats = [
    { label: "Servidores", value: "128", icon: Server, color: "text-purple-400" },
    { label: "Usuarios", value: "25,847", icon: Users, color: "text-pink-400" },
    { label: "Comandos", value: "112", icon: Zap, color: "text-blue-400" },
    { label: "Uptime", value: "99.8%", icon: Clock, color: "text-green-400" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Moderación Avanzada",
      description: "Sistema automático anti-raid, logs detallados y protección 24/7.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Music,
      title: "Música HD",
      description: "Reproductor con calidad superior, búsqueda en múltiples plataformas y colas ilimitadas.",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: BarChart3,
      title: "Analíticas",
      description: "Estadísticas detalladas de tu servidor, actividad de usuarios y crecimiento.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Sparkles,
      title: "Dashboard Web",
      description: "Configura todo desde nuestra web intuitiva y moderna.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Globe,
      title: "Chat Global",
      description: "Conecta tu servidor con comunidades de todo el mundo.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Lock,
      title: "Seguridad Premium",
      description: "Protección contra spam, bots maliciosos y ataques DDoS.",
      color: "from-red-500 to-pink-500",
    },
  ]

  const commandsByCategory = [
    { category: "Moderación", count: 24, color: "bg-red-500" },
    { category: "Música", count: 18, color: "bg-green-500" },
    { category: "Diversión", count: 42, color: "bg-yellow-500" },
    { category: "Utilidades", count: 28, color: "bg-blue-500" },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-nyxara-dark via-black to-nyxara-darker" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 animate-pulse bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
              <Sparkles className="h-3 w-3 mr-2" />
              VERSIÓN 2.0 DISPONIBLE
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-nyxara-primary via-nyxara-secondary to-nyxara-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                Nyxara Bot
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              El bot de Discord más completo con{" "}
              <span className="font-bold text-nyxara-primary">112 comandos</span>, 
              sistema de{" "}
              <span className="font-bold text-nyxara-secondary">música premium</span> 
              {" "}y moderación{" "}
              <span className="font-bold text-green-400">inteligente</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="gap-3 group">
                <Bot className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Invitar a Discord
                <Sparkles className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button size="xl" variant="outline" className="gap-3">
                <Users className="h-5 w-5" />
                Ver Dashboard
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="glass-effect card-hover">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center mb-3">
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-center">{stat.value}</div>
                      <div className="text-gray-400 text-center text-sm mt-1">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Características{" "}
              <span className="text-gradient">Destacadas</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Todo lo que necesitas para llevar tu servidor de Discord al siguiente nivel
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="glass-effect card-hover group">
                  <CardContent className="pt-6">
                    <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mb-3">{feature.title}</CardTitle>
                    <p className="text-gray-400">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm text-nyxara-primary">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Incluido en todas las versiones
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commands Preview */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">112 Comandos</span> Disponibles
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Organizados por categorías para una fácil navegación
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {commandsByCategory.map((cat) => (
              <Card key={cat.category} className="glass-effect card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="mb-2">{cat.category}</CardTitle>
                      <div className="text-3xl font-bold">{cat.count} comandos</div>
                    </div>
                    <div className={`h-12 w-12 rounded-full ${cat.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">{cat.count}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${cat.color} rounded-full`}
                        style={{ width: `${(cat.count / 112) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="gap-3">
              <Sparkles className="h-5 w-5" />
              Ver Todos los Comandos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Premium */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 border-nyxara-primary/30">
            <CardContent className="py-12 text-center">
              <div className="max-w-2xl mx-auto">
                <Badge variant="premium" className="mb-4">
                  <Sparkles className="h-3 w-3 mr-2" />
                  PLAN PREMIUM
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Lleva tu servidor al{" "}
                  <span className="text-gradient">siguiente nivel</span>
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Desbloquea características exclusivas, soporte prioritario 
                  y recursos ilimitados para tu comunidad.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="premium" className="gap-3">
                    <Heart className="h-5 w-5" />
                    Ver Planes Premium
                  </Button>
                  <Button size="lg" variant="outline" className="gap-3">
                    <Users className="h-5 w-5" />
                    Ver Demo
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-6">
                  * Los pagos se procesan directamente por Discord
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}