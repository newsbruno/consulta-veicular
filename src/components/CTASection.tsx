import React, { useState } from 'react';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';
import AuthModal from './AuthModal';

const CTASection: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-8">
            <Award className="h-5 w-5 text-amber-300 mr-2" />
            <span className="text-sm font-semibold text-white">Plataforma #1 em Consultas Veiculares</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto para consultar seu<br />
            <span className="text-amber-300">próximo veículo?</span>
          </h2>

          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se a milhões de brasileiros que já escolheram a segurança e confiabilidade da nossa plataforma.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <span>COMEÇAR AGORA</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#precos"
              className="bg-blue-800 border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all duration-200 backdrop-blur-sm"
            >
              VER PREÇOS
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">100% Seguro</h4>
              <p className="text-blue-100">Pagamento protegido e dados criptografados</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">Resultado em 2min</h4>
              <p className="text-blue-100">Relatório completo em tempo recorde</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white text-lg">Garantia Total</h4>
              <p className="text-blue-100">100% de satisfação ou seu dinheiro de volta</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <p className="text-blue-100 mb-6 text-lg">Confiam em nossa plataforma:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                <span className="text-white font-semibold text-lg">Revendedoras</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                <span className="text-white font-semibold text-lg">Despachantes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                <span className="text-white font-semibold text-lg">Seguradoras</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                <span className="text-white font-semibold text-lg">Mecânicas</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-white/20">
                <span className="text-white font-semibold text-lg">Particulares</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default CTASection;
