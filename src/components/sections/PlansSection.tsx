'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Sparkles, 
  Crown, 
  Zap,
  Shield,
  Music,
  Users,
  BarChart3,
  Globe,
  Lock,
  CreditCard,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  tierlevel: 'free' | 'basic' | 'premium' | 'enterprise';
  description: string;
  pricemonthly: number;
  priceyearly: number;
  color: string;
  icon: string;
  ispopular: boolean;
  features_list: string;
  feature_count: number;
}

export default function PlansSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plans');
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.data || []);
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (tierlevel: string) => {
    switch (tierlevel) {
      case 'enterprise':
        return <Crown className="h-8 w-8" />;
      case 'premium':
        return <Sparkles className="h-8 w-8" />;
      case 'basic':
        return <Star className="h-8 w-8" />;
      case 'free':
        return <Zap className="h-8 w-8" />;
      default:
        return <Star className="h-8 w-8" />;
    }
  };

  const getPlanColor = (tierlevel: string) => {
    switch (tierlevel) {
      case 'enterprise':
        return 'from-purple-600 to-pink-600';
      case 'premium':
        return 'from-nyxara-primary to-nyxara-secondary';
      case 'basic':
        return 'from-blue-500 to-cyan-500';
      case 'free':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getPlanFeatures = (featuresList: string) => {
    if (!featuresList) return [];
    return featuresList.split(',').map(f => f.trim());
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis';
    return `$${price.toFixed(2)}`;
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    if (monthly === 0 || yearly === 0) return 0;
    const monthlyYearly = monthly * 12;
    const savings = monthlyYearly - yearly;
    const percentage = (savings / monthlyYearly) * 100;
    return Math.round(percentage);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando planes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
          <CreditCard className="h-3 w-3 mr-2" />
          {plans.length} Planes Disponibles
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
            Planes y Precios
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Elige el plan perfecto para tu servidor. Todos los planes incluyen características básicas, 
          con opciones premium para servidores más grandes.
        </p>
      </div>

      {/* Selector de ciclo de facturación */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex bg-gray-900/50 rounded-xl p-1 border border-gray-800">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('monthly')}
            className="px-8"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mensual
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('yearly')}
            className="px-8"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Anual
            {billingCycle === 'yearly' && (
              <Badge className="ml-2 bg-green-500">Ahorra hasta 20%</Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Grid de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => {
          const isYearly = billingCycle === 'yearly';
          const price = isYearly ? plan.priceyearly : plan.pricemonthly;
          const savings = calculateSavings(plan.pricemonthly, plan.priceyearly);
          const features = getPlanFeatures(plan.features_list);
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={plan.ispopular ? 'relative' : ''}
            >
              {plan.ispopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
                    <Sparkles className="h-3 w-3 mr-2" />
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:scale-[1.02] ${plan.ispopular ? 'border-2 border-yellow-500/50' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${getPlanColor(plan.tierlevel)}`}>
                      {getPlanIcon(plan.tierlevel)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <p className="text-gray-400 text-sm capitalize">{plan.tierlevel}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        {formatPrice(price)}
                      </span>
                      {price > 0 && (
                        <span className="text-gray-400 ml-2">
                          /{isYearly ? 'año' : 'mes'}
                        </span>
                      )}
                    </div>
                    
                    {isYearly && savings > 0 && price > 0 && (
                      <p className="text-green-400 text-sm mt-1">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        Ahorras {savings}% vs mensual
                      </p>
                    )}
                    
                    {price === 0 && (
                      <p className="text-green-400 text-sm mt-1">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        Siempre gratuito
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {features.length > 6 && (
                      <div className="text-center pt-2">
                        <span className="text-gray-500 text-sm">
                          +{features.length - 6} características más
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Características especiales por plan */}
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="grid grid-cols-2 gap-2">
                      {plan.tierlevel === 'enterprise' && (
                        <>
                          <Badge variant="outline" className="justify-center">
                            <Shield className="h-3 w-3 mr-1" />
                            Soporte 24/7
                          </Badge>
                          <Badge variant="outline" className="justify-center">
                            <Users className="h-3 w-3 mr-1" />
                            Servidores Ilimitados
                          </Badge>
                        </>
                      )}
                      {plan.tierlevel === 'premium' && (
                        <>
                          <Badge variant="outline" className="justify-center">
                            <Music className="h-3 w-3 mr-1" />
                            Música HD
                          </Badge>
                          <Badge variant="outline" className="justify-center">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analytics Avanzados
                          </Badge>
                        </>
                      )}
                      {plan.tierlevel === 'basic' && (
                        <>
                          <Badge variant="outline" className="justify-center">
                            <Globe className="h-3 w-3 mr-1" />
                            Comandos Básicos
                          </Badge>
                          <Badge variant="outline" className="justify-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Moderación
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button
                    variant={plan.ispopular ? 'premium' : 'default'}
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {price === 0 ? 'Usar Gratis' : 'Seleccionar Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Comparativa de características */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Comparativa Completa de Características
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4">Característica</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="text-center py-3 px-4">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Comandos Totales', free: '50+', basic: '80+', premium: '112+', enterprise: '112+' },
                    { feature: 'Servidores Máx.', free: '1', basic: '3', premium: '10', enterprise: 'Ilimitados' },
                    { feature: 'Música HD', free: '❌', basic: '✅', premium: '✅', enterprise: '✅' },
                    { feature: 'Moderación IA', free: '❌', basic: '✅', premium: '✅', enterprise: '✅' },
                    { feature: 'Analytics', free: 'Básico', basic: 'Avanzado', premium: 'Completo', enterprise: 'Completo+' },
                    { feature: 'Soporte', free: 'Comunidad', basic: 'Email', premium: 'Prioritario', enterprise: '24/7' },
                    { feature: 'API Access', free: '❌', basic: 'Limitado', premium: 'Completo', enterprise: 'Completo+' },
                    { feature: 'Backups', free: '❌', basic: '✅', premium: '✅', enterprise: '✅' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-800/50">
                      <td className="py-3 px-4 font-medium">{row.feature}</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="text-center py-3 px-4">
                          <span className={plan.tierlevel === 'free' && row.free === '❌' ? 'text-red-400' : 
                                         plan.tierlevel === 'free' && row.free === '✅' ? 'text-green-400' : 
                                         'text-gray-300'}>
                            {row[plan.tierlevel as keyof typeof row]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preguntas frecuentes */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 border-nyxara-primary/20">
          <CardContent className="py-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Preguntas Frecuentes
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Resolvemos tus dudas sobre nuestros planes y pagos
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: '¿Puedo cambiar de plan en cualquier momento?',
                  a: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican inmediatamente.'
                },
                {
                  q: '¿Qué métodos de pago aceptan?',
                  a: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express) y pagos a través de Discord.'
                },
                {
                  q: '¿Hay periodo de prueba?',
                  a: 'Ofrecemos un periodo de prueba de 7 días para nuestros planes premium. No se requiere tarjeta de crédito.'
                },
                {
                  q: '¿Los precios incluyen impuestos?',
                  a: 'Los precios mostrados no incluyen impuestos. Estos se aplicarán según tu ubicación al momento del pago.'
                },
                {
                  q: '¿Qué pasa si cancelo mi suscripción?',
                  a: 'Mantendrás acceso a las características premium hasta el final del periodo facturado.'
                },
                {
                  q: '¿Ofrecen descuentos para servidores grandes?',
                  a: 'Sí, para servidores con más de 500 miembros ofrecemos descuentos especiales. Contáctanos para más información.'
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-3">{faq.q}</h4>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" className="gap-3">
                <CreditCard className="h-5 w-5" />
                Ver más preguntas frecuentes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}