'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Clock, Zap, TrendingUp, Users, Star, Crown, Target, Award, Medal } from 'lucide-react';

export default function TopStatsSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500">
              <Trophy className="h-3 w-3 mr-2" />
              Próximamente
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Tops del Bot
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Sección en desarrollo. Pronto podrás ver estadísticas avanzadas,
            rankings y métricas detalladas del rendimiento de Nyxara.
          </p>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Comandos */}
          <Card className="border-gray-800 hover:border-orange-500/30 transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-400" />
                Comandos Más Usados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Crown className="h-4 w-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium">/play</p>
                      <p className="text-xs text-gray-500">Música</p>
                    </div>
                  </div>
                  <Badge className="bg-gray-800">423 ejecuciones</Badge>
                </div>
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-2xl bg-gray-900/50 border border-dashed border-gray-700">
                    <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Datos en tiempo real</p>
                    <p className="text-sm text-gray-500">Disponible próximamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Servidores */}
          <Card className="border-gray-800 hover:border-blue-500/30 transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Servidores Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Star className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Comunidad Nyxara</p>
                      <p className="text-xs text-gray-500">Servidor oficial</p>
                    </div>
                  </div>
                  <Badge className="bg-gray-800">1.2K miembros</Badge>
                </div>
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-2xl bg-gray-900/50 border border-dashed border-gray-700">
                    <TrendingUp className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Análisis de crecimiento</p>
                    <p className="text-sm text-gray-500">Disponible próximamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Usuarios */}
          <Card className="border-gray-800 hover:border-purple-500/30 transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                Usuarios Destacados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Award className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Usuario Top</p>
                      <p className="text-xs text-gray-500">Contribuidor</p>
                    </div>
                  </div>
                  <Badge className="bg-gray-800">156 comandos</Badge>
                </div>
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-2xl bg-gray-900/50 border border-dashed border-gray-700">
                    <Medal className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Rankings de usuarios</p>
                    <p className="text-sm text-gray-500">Disponible próximamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información de desarrollo */}
        <Card className="mt-8 bg-gradient-to-r from-gray-900/50 to-black/50 border border-white/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-block p-4 rounded-2xl bg-orange-500/10 mb-4">
                <Trophy className="h-12 w-12 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sección en Desarrollo</h3>
              <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
                Estamos trabajando en una sección completa de estadísticas avanzadas
                que incluirá rankings, métricas detalladas y análisis del rendimiento
                del bot en tiempo real.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-orange-400 font-bold text-lg mb-2">📊 Métricas Avanzadas</div>
                  <p className="text-sm text-gray-400">Análisis detallado del uso del bot</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-orange-400 font-bold text-lg mb-2">🏆 Rankings</div>
                  <p className="text-sm text-gray-400">Top servidores, usuarios y comandos</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-orange-400 font-bold text-lg mb-2">📈 Tendencias</div>
                  <p className="text-sm text-gray-400">Evolución y crecimiento en el tiempo</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-800">
                <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                  <Clock className="h-3 w-3 mr-2" />
                  Disponible en la próxima actualización
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}