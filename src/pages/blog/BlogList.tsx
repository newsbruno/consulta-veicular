import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Clock, ArrowRight, Search } from 'lucide-react';
import blogService, { BlogPost } from '../../services/blogService';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    blogService.seedPosts();
    const allPosts = blogService.getAllPosts(true);
    setPosts(allPosts);
    if (allPosts.length > 0) {
      setFeaturedPost(allPosts[0]);
    }
    setLoading(false);
  }, []);

  const filteredPosts = searchTerm
    ? blogService.searchPosts(searchTerm, true)
    : posts;

  const regularPosts = filteredPosts.slice(featuredPost ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link to="/" className="text-sm text-slate-300 hover:text-white mb-6 inline-block">
            ← Voltar para home
          </Link>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Descubra dicas, guias completos e as últimas novidades sobre consulta veicular
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar posts..."
                className="w-full px-5 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && !searchTerm && (
          <div className="mb-16">
            <div className="text-sm font-semibold text-blue-600 mb-4">DESTAQUE</div>
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-blue-500 to-purple-600">
                  {featuredPost.coverImage ? (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                      {featuredPost.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(featuredPost.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {featuredPost.views}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Ler artigo
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Posts Grid */}
        {regularPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">
              {searchTerm ? 'Nenhum post encontrado.' : 'Nenhum post publicado ainda.'}
            </p>
          </div>
        ) : (
          <>
            <div className="text-sm font-semibold text-slate-600 mb-6">TODOS OS POSTS</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-5xl font-bold">
                            {post.title.charAt(0)}
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-slate-600 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
