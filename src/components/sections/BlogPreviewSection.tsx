// src/components/sections/BlogPreviewSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Tag, 
  ChevronRight,
  BookOpen,
  Clock,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  featuredimage: string;
  publishedat: string;
  viewcount: number;
  commentcount: number;
  author: {
    displayname: string;
    avatarurl: string;
  };
  category: {
    name: string;
    color: string;
  };
}

export default function BlogPreviewSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?limit=3&featured=true');
      const data = await response.json();
      
      if (data.success) {
        setBlogPosts(data.data);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-transparent to-nyxara-dark/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-12 w-48 bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-64 bg-gray-800 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-nyxara-dark/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <BookOpen className="h-3 w-3 mr-2" />
            Blog Oficial
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Últimas{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Noticias y Tutoriales
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mantente actualizado con las últimas novedades, guías y consejos sobre Nyxara.
          </p>
        </motion.div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Featured image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
                    <img
                      src={post.featuredimage || '/blog-placeholder.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        style={{
                          backgroundColor: `${post.category.color}20`,
                          color: post.category.color
                        }}
                      >
                        {post.category.name}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedat).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        5 min
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author and stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-300">
                          {post.author.displayname}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Eye className="h-4 w-4" />
                          {post.viewcount}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MessageSquare className="h-4 w-4" />
                          {post.commentcount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-300" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <Button size="lg" variant="outline" className="group">
              <span className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                Ver todos los artículos
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}