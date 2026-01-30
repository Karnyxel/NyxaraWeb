// src/components/sections/BlogSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  User, 
  Tag, 
  Eye, 
  MessageSquare, 
  Heart,
  ChevronRight,
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredimage: string;
  category_name: string;
  category_color: string;
  author_name: string;
  viewcount: number;
  commentcount: number;
  likecount: number;
  publishedat: string;
  tags: Array<{ id: number; name: string; slug: string; color: string }>;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  postcount: number;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBlogData();
  }, []);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      const [postsRes, categoriesRes] = await Promise.all([
        fetch('/api/blog/posts'),
        fetch('/api/blog/categories')
      ]);

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData.data || []);
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.data || []);
      }
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || 
      post.category_name.toLowerCase() === categories.find(c => c.id === selectedCategory)?.name.toLowerCase();
    
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando artículos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
          <BookOpen className="h-3 w-3 mr-2" />
          Blog de Nyxara
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
            Blog y Noticias
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Mantente al día con las últimas noticias, actualizaciones y guías sobre Nyxara Bot.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-2" />
              Todas
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
                style={{
                  background: selectedCategory === category.id ? category.color : undefined
                }}
              >
                {category.name} ({category.postcount})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {posts.length > 0 && posts[0] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href={`/blog/${posts[0].slug}`}>
            <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-nyxara-primary/50 transition-all group">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  {posts[0].featuredimage ? (
                    <img
                      src={posts[0].featuredimage}
                      alt={posts[0].title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      style={{ backgroundColor: posts[0].category_color }}
                      className="text-white"
                    >
                      {posts[0].category_name}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(posts[0].publishedat)}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {posts[0].author_name}
                    </div>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-nyxara-primary transition-colors">
                    {posts[0].title}
                  </CardTitle>
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{posts[0].viewcount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">{posts[0].commentcount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{posts[0].likecount}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      Leer artículo
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(1).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-nyxara-primary/50 transition-all duration-300 hover:scale-[1.02] group">
                <CardHeader>
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    {post.featuredimage ? (
                      <img
                        src={post.featuredimage}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: post.category_color, color: post.category_color }}
                      >
                        {post.category_name}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-nyxara-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag.id}
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: `${tag.color}20`,
                            color: tag.color
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedat)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.viewcount}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Leer más</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No se encontraron artículos</h3>
          <p className="text-gray-400">Intenta con otros filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}