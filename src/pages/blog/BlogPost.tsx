import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Tag } from 'lucide-react';
import blogService, { BlogPost as BlogPostType } from '../../services/blogService';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }

    const foundPost = blogService.getPostBySlug(slug);
    
    if (!foundPost) {
      navigate('/blog');
      return;
    }

    setPost(foundPost);
    
    // Buscar posts relacionados da mesma categoria
    const related = blogService
      .getPostsByCategory(foundPost.category, true)
      .filter(p => p.id !== foundPost.id)
      .slice(0, 3);
    
    setRelatedPosts(related);
    setLoading(false);
  }, [slug, navigate]);

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-900 to-slate-700 relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>

          {/* Category */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{post.author}</div>
                <div className="text-sm text-slate-500">Autor</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Eye className="h-4 w-4" />
              {post.views} visualizações
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-p:text-lg prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-img:rounded-xl prose-img:shadow-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-slate-900 mb-8">Posts relacionados</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="block p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {related.excerpt}
                  </p>
                  <span className="text-sm text-blue-600">Ler mais →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
