import React from 'react';
import { Copy, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';

const IndiqueGanhe: React.FC = () => {
  const referralLink = 'https://olhonocarro.com.br/indicado?hashlink=8d38b95-e558-4c04-97d6';

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      {/* Abas de Navegação */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-6 py-3 font-semibold text-white bg-blue-600 border-b-2 border-blue-600 rounded-t-lg">
          INDIQUE E GANHE
        </button>
        <button className="px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 rounded-t-lg">
          CARTEIRA
        </button>
        <button className="px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 rounded-t-lg">
          SAQUES REALIZADOS
        </button>
        <button className="px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 rounded-t-lg">
          TERMOS DE USO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Conteúdo da Esquerda */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Indique a Olho no Carro para os seus amigos e ganhe 10% por indicação.</h2>
          <p className="text-gray-600">
            Você pode usar o valor para compras ou sacar o dinheiro!
          </p>
          
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              readOnly 
              value={referralLink}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <Copy size={18} />
              <span>Copiar link</span>
            </button>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-gray-700">Compartilhe nas redes sociais</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                <Share2 size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-800 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo da Direita (Imagem) */}
        <div className="flex justify-center">
          <img src="/path-to-your-mascot-image.png" alt="Mascote Olho no Carro" className="max-w-xs" />
        </div>
      </div>
    </div>
  );
};

export default IndiqueGanhe;
