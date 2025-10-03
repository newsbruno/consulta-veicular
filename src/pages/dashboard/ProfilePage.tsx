import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Necessário atualizar os dados cadastrais</h1>
        <p className="text-lg text-gray-600">
          Olá Bruno Henrique Rodrigues de Araujo, para poder realizar a consulta de veículos, é necessário que você atualize os dados cadastrais.
        </p>
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
            <input 
              type="text" 
              id="birthdate"
              placeholder="DD/MM/AAAA" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
