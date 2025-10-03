import React from 'react';

const FaleConosco: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Fale Conosco</h1>
        <p className="text-lg text-gray-600 text-center mb-8">Tem alguma dúvida ou sugestão? Envie uma mensagem para nós!</p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input 
              type="text" 
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
            <input 
              type="text" 
              id="subject"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaleConosco;
