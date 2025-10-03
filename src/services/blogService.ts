import { LocalStorageDB } from './localStorageDB';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
};

export type CreatePostInput = Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'views'>;
export type UpdatePostInput = Partial<Omit<BlogPost, 'id' | 'createdAt' | 'authorId'>>;

const NAMESPACE = 'app';
const POSTS_COLLECTION = 'blog_posts';

const db = new LocalStorageDB(NAMESPACE);

function nowISO() {
  return new Date().toISOString();
}

function genId() {
  return `post_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getPosts(): BlogPost[] {
  return db.loadCollection<BlogPost>(POSTS_COLLECTION);
}

function savePosts(posts: BlogPost[]) {
  db.saveCollection<BlogPost>(POSTS_COLLECTION, posts);
}

export const blogService = {
  // Criar novo post
  createPost(input: CreatePostInput, authorId: string): BlogPost {
    const posts = getPosts();
    const slug = generateSlug(input.title);
    
    // Verificar se slug já existe
    const existingSlug = posts.find(p => p.slug === slug);
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const post: BlogPost = {
      id: genId(),
      ...input,
      slug: finalSlug,
      authorId,
      createdAt: nowISO(),
      updatedAt: nowISO(),
      views: 0,
    };

    posts.unshift(post);
    savePosts(posts);
    return post;
  },

  // Listar todos os posts
  getAllPosts(publishedOnly = false): BlogPost[] {
    const posts = getPosts();
    if (publishedOnly) {
      return posts.filter(p => p.published);
    }
    return posts;
  },

  // Buscar post por ID
  getPostById(id: string): BlogPost | null {
    const posts = getPosts();
    return posts.find(p => p.id === id) || null;
  },

  // Buscar post por slug
  getPostBySlug(slug: string): BlogPost | null {
    const posts = getPosts();
    const post = posts.find(p => p.slug === slug);
    
    // Incrementar visualizações
    if (post) {
      post.views += 1;
      savePosts(posts);
    }
    
    return post || null;
  },

  // Atualizar post
  updatePost(id: string, update: UpdatePostInput): BlogPost {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Post não encontrado.');
    }

    // Se o título mudou, atualizar slug
    let newSlug = posts[index].slug;
    if (update.title && update.title !== posts[index].title) {
      newSlug = generateSlug(update.title);
    }

    const updatedPost: BlogPost = {
      ...posts[index],
      ...update,
      slug: newSlug,
      updatedAt: nowISO(),
    };

    posts[index] = updatedPost;
    savePosts(posts);
    return updatedPost;
  },

  // Deletar post
  deletePost(id: string): boolean {
    const posts = getPosts();
    const filtered = posts.filter(p => p.id !== id);
    
    if (filtered.length === posts.length) {
      return false; // Post não encontrado
    }
    
    savePosts(filtered);
    return true;
  },

  // Buscar posts por categoria
  getPostsByCategory(category: string, publishedOnly = true): BlogPost[] {
    const posts = getPosts();
    return posts.filter(p => {
      const matchCategory = p.category.toLowerCase() === category.toLowerCase();
      return publishedOnly ? matchCategory && p.published : matchCategory;
    });
  },

  // Buscar posts por tag
  getPostsByTag(tag: string, publishedOnly = true): BlogPost[] {
    const posts = getPosts();
    return posts.filter(p => {
      const hasTag = p.tags.some(t => t.toLowerCase() === tag.toLowerCase());
      return publishedOnly ? hasTag && p.published : hasTag;
    });
  },

  // Buscar posts (pesquisa)
  searchPosts(query: string, publishedOnly = true): BlogPost[] {
    const posts = getPosts();
    const lowerQuery = query.toLowerCase();
    
    return posts.filter(p => {
      const matchesQuery = 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.excerpt.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery) ||
        p.tags.some(t => t.toLowerCase().includes(lowerQuery));
      
      return publishedOnly ? matchesQuery && p.published : matchesQuery;
    });
  },

  // Posts recentes
  getRecentPosts(limit = 5, publishedOnly = true): BlogPost[] {
    const posts = getPosts();
    const filtered = publishedOnly ? posts.filter(p => p.published) : posts;
    return filtered.slice(0, limit);
  },

  // Posts populares
  getPopularPosts(limit = 5, publishedOnly = true): BlogPost[] {
    const posts = getPosts();
    const filtered = publishedOnly ? posts.filter(p => p.published) : posts;
    return filtered.sort((a, b) => b.views - a.views).slice(0, limit);
  },

  // Seed inicial (posts de exemplo)
  seedPosts(): void {
    const existing = getPosts();
    if (existing.length > 0) return;

    const samplePosts: BlogPost[] = [
      {
        id: genId(),
        title: 'Como Identificar um Carro de Leilão',
        slug: 'como-identificar-carro-de-leilao',
        excerpt: 'Aprenda a identificar se um veículo passou por leilão e quais os cuidados necessários antes da compra.',
        content: `# Como Identificar um Carro de Leilão

Comprar um carro de leilão pode ser uma excelente oportunidade, mas também exige cuidados especiais. Neste guia, vamos mostrar como identificar se um veículo passou por leilão e o que você precisa saber.

## O que é um carro de leilão?

Veículos de leilão são aqueles que foram recuperados de sinistros, apreendidos, ou retomados de financiamento. Eles podem representar boas oportunidades, mas também riscos.

## Como identificar

1. **Consulta completa de histórico** - Nossa plataforma mostra todo o histórico de leilão
2. **Documentação** - Verifique se há restrições ou pendências
3. **Inspeção física** - Sempre faça vistoria presencial
4. **Laudo técnico** - Contrate um mecânico de confiança

## Vantagens

- Preços até 30% mais baixos
- Oportunidade de encontrar modelos raros
- Possibilidade de restauração

## Desvantagens

- Histórico de danos
- Dificuldade para financiamento
- Possíveis custos de recuperação

## Conclusão

Comprar um carro de leilão pode ser vantajoso, mas exige pesquisa e cuidado. Use nossa plataforma para fazer uma consulta completa antes de decidir!`,
        coverImage: '',
        author: 'Equipe Olho no Carro',
        authorId: 'admin',
        category: 'Dicas de Compra',
        tags: ['leilão', 'compra', 'veículos'],
        published: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        views: 1250,
      },
      {
        id: genId(),
        title: '10 Itens Essenciais para Verificar Antes de Comprar um Carro Usado',
        slug: '10-itens-essenciais-verificar-carro-usado',
        excerpt: 'Checklist completo com os principais pontos de atenção na compra de um veículo usado.',
        content: `# 10 Itens Essenciais para Verificar

A compra de um carro usado exige atenção a diversos detalhes. Confira nossa checklist completa!

## 1. Documentação
- CRLV atualizado
- Sem restrições
- Débitos em dia

## 2. Histórico de Multas
Verifique se há multas pendentes que podem dificultar a transferência.

## 3. Sinistros
Consulte o histórico de batidas e reparos.

## 4. KM Rodado
Confira se a quilometragem é compatível com o ano.

## 5. Estado Mecânico
- Motor
- Suspensão
- Freios
- Transmissão

## 6. Parte Elétrica
Teste todos os sistemas elétricos do veículo.

## 7. Lataria e Pintura
Procure por sinais de repintura ou acidentes.

## 8. Pneus
Verifique o estado e alinhamento.

## 9. Interior
Condição dos bancos, painéis e equipamentos.

## 10. Test Drive
Essencial para identificar problemas não visíveis.

Use nossa plataforma para fazer uma consulta completa antes da compra!`,
        coverImage: '',
        author: 'Equipe Olho no Carro',
        authorId: 'admin',
        category: 'Dicas de Compra',
        tags: ['compra', 'usados', 'checklist'],
        published: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        views: 890,
      },
      {
        id: genId(),
        title: 'Entenda o que é Gravame e Como Afeta a Compra do seu Veículo',
        slug: 'entenda-gravame-compra-veiculo',
        excerpt: 'Gravame financeiro pode impedir a transferência do veículo. Saiba como consultar e o que fazer.',
        content: `# O que é Gravame Financeiro?

Gravame é uma restrição financeira registrada no veículo quando ele é financiado. Entenda como isso afeta você.

## Como funciona

Quando você financia um carro, o banco registra um gravame no Detran. Isso impede a venda do veículo até a quitação total.

## Como consultar

Nossa plataforma mostra se o veículo possui gravame ativo, incluindo:
- Instituição financeira
- Data de início
- Situação atual

## O que fazer se encontrar gravame

1. Solicite a quitação ao vendedor
2. Peça o comprovante de baixa do gravame
3. Verifique se a baixa foi registrada no Detran

## Cuidados na compra

- Nunca compre com gravame ativo
- Exija documentação da quitação
- Faça nova consulta após a suposta baixa

Proteja-se! Faça uma consulta completa antes de fechar negócio.`,
        coverImage: '',
        author: 'Equipe Olho no Carro',
        authorId: 'admin',
        category: 'Documentação',
        tags: ['gravame', 'financiamento', 'documentação'],
        published: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        views: 670,
      },
    ];

    savePosts(samplePosts);
  },

  // Resetar tudo
  reset(): void {
    savePosts([]);
  },
};

export default blogService;
