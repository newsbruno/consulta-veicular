import React from 'react';

const Catalogo: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Catálogo Olho no Carro</h1>
        <p className="text-lg text-gray-600">Saiba tudo sobre o veículo e acerte na escolha.</p>
        <p className="mt-4 text-gray-500">
          Quer escolher o melhor carro? Confira review completo, opinião do dono e ficha técnica das versões para saber se esse veículo é o ideal para você.
        </p>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        {/* Abas de Navegação */}
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button className="px-6 py-3 font-semibold text-white bg-blue-600 border-b-2 border-blue-600 rounded-t-lg">
            MARCA/MODELO
          </button>
          <button className="px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 rounded-t-lg">
            PLACA
          </button>
        </div>

        {/* Formulário de Busca */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Modelo" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Modelo" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Ano" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Versão" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              BUSCAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Catalogo;
