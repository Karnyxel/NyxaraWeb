// src/components/sections/TestimonialsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Star, 
  Quote, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Testimonial {
  id: number;
  authorname: string;
  authorrole: string;
  authoravatar: string;
  content: string;
  rating: number;
  source: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
          <p className="mt-4 text-gray-400">Cargando testimonios...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-600 to-orange-500">
            <Star className="h-3 w-3 mr-2" />
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre por qué miles de servidores confían en Nyxara
          </p>
        </div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-full opacity-20 blur-xl" />
                    {testimonial.authoravatar ? (
                      <img
                        src={testimonial.authoravatar}
                        alt={testimonial.authorname}
                        className="relative w-24 h-24 rounded-full border-4 border-gray-800"
                      />
                    ) : (
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary flex items-center justify-center border-4 border-gray-800">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <Quote className="h-12 w-12 text-nyxara-primary/30 mb-4 mx-auto md:mx-0" />
                  
                  <p className="text-lg md:text-xl text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-xl">{testimonial.authorname}</h4>
                    <p className="text-gray-400 mb-2">{testimonial.authorrole}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-8 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-nyxara-primary' : 'bg-gray-700 hover:bg-gray-600'}`}
                aria-label={`Ir al testimonio ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}