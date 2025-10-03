import React, { useState } from 'react';
import { Search, Shield, Zap, CheckCircle } from 'lucide-react';
import AuthModal from './AuthModal';

const HeroSection: React.FC = () => {
  const [placa, setPlaca] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  const formatPlaca = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
  };

  const handlePlacaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlaca(e.target.value);
    if (formatted.length <= 8) {
      setPlaca(formatted);
    }
  };

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Content */}
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Consulta Mais Completa do Brasil</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-tight">
            Consulta veicular completa e confiável
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Acesse mais de 25 informações essenciais sobre qualquer veículo do Brasil em segundos.
          </p>

          {/* Search Form */}
          <div className="max-w-xl mx-auto pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={placa}
                  onChange={handlePlacaChange}
                  placeholder="Digite a placa (ex: ABC-1234)"
                  className="w-full px-5 py-4 text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200"
              >
                Consultar agora
              </button>
            </form>
            <p className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              Pagamento seguro e resultado instantâneo
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>17.99M+ consultas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>98% satisfação</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Resultado em 2min</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default HeroSection;