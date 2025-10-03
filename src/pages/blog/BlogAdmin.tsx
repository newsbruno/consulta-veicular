import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Image, X } from 'lucide-react';
import blogService, { BlogPost, CreatePostInput } from '../../services/blogService';
import authService from '../../services/authService';

const BlogAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    published: false,
    coverImage: '',
  });

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadPosts();
  }, [currentUser, navigate]);

  const loadPosts = () => {
    const allPosts = blogService.getAllPosts(false);
    setPosts(allPosts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

    if (editingPost) {
      blogService.updatePost(editingPost.id, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        published: formData.published,
        coverImage: formData.coverImage,
      });
    } else {
      const input: CreatePostInput = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        published: formData.published,
        coverImage: formData.coverImage,
        author: currentUser.name,
        authorId: currentUser.id,
      };
      blogService.createPost(input, currentUser.id);
    }

    resetForm();
    loadPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published,
      coverImage: post.coverImage || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      blogService.deletePost(id);
      loadPosts();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      published: false,
      coverImage: '',
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Imagem muito grande! Máximo 2MB.');
      return;
    }

    // Converter para Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, coverImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium text-slate-900">Gerenciar Blog</h1>
            <p className="text-slate-600 mt-1">Criar e gerenciar posts do blog</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {showForm ? 'Cancelar' : 'Novo Post'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-medium text-slate-900 mb-6">
              {editingPost ? 'Editar Post' : 'Novo Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resumo
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Imagem de Capa
                </label>
                {formData.coverImage ? (
                  <div className="relative">
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: '' })}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <Image className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Clique para fazer upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-slate-500 mt-2">
                      PNG, JPG ou WEBP (máx. 2MB)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Conteúdo (Markdown)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  rows={12}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">
                  Publicar post
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {editingPost ? 'Atualizar' : 'Criar Post'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">
              Posts ({posts.length})
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {posts.length === 0 ? (
              <div className="p-12 text-center text-slate-600">
                Nenhum post criado ainda
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-slate-900">
                          {post.title}
                        </h3>
                        {post.published ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            <Eye className="h-3 w-3" />
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            <EyeOff className="h-3 w-3" />
                            Rascunho
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span>{post.category}</span>
                        <span>{post.views} visualizações</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
