import React from 'react';

const blogPosts = [
  {
    title: 'Como consultar o histórico de um veículo?'
,
    category: 'Dicas',
    date: '10 de Julho, 2024',
    excerpt: 'Aprenda o passo a passo para fazer uma consulta veicular completa e evitar dores de cabeça na hora da compra.'
,
  },
  {
    title: 'Os 10 carros mais econômicos de 2024',
    category: 'Notícias',
    date: '05 de Julho, 2024',
    excerpt: 'Confira a lista dos veículos que se destacam pelo baixo consumo de combustível e veja qual se encaixa no seu bolso.'
,
  },
  {
    title: 'Sinais de que um carro pode ter sido adulterado',
    category: 'Segurança',
    date: '01 de Julho, 2024',
    excerpt: 'Fique atento aos detalhes que podem indicar fraudes no chassi, motor ou hodômetro do veículo.'
,
  },
];

const Blog: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Blog Olho no Carro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 bg-blue-100 text-blue-800`}>
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mb-2 h-20">{post.title}</h2>
              <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-800">Leia mais &rarr;</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
