import React, { useState } from 'react';
import { Check, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import AuthModal from './AuthModal';

const PricingSection: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const plans = [
    {
      name: 'Veículo Essencial',
      icon: <Shield className="h-8 w-8" />,
      description: 'Informações básicas para consultas rápidas',
      price: '45,90',
      oldPrice: '52,90',
      popular: false,
      features: [
        'Dados cadastrais básicos',
        'Verificação de débitos',
        'Histórico de multas',
        'Status de licenciamento',
        'Informações do proprietário',
        'Consulta por Placa',
        'Relatório em PDF',
        'Suporte por email',
      ],
      color: 'from-slate-600 to-slate-700',
      borderColor: 'border-slate-200',
    },
    {
      name: 'Veículo Completo',
      icon: <Star className="h-8 w-8" />,
      description: 'A consulta mais completa do mercado',
      price: '64,90',
      oldPrice: '74,90',
      popular: true,
      features: [
        'Tudo do plano Essencial',
        'Histórico de leilão completo',
        'Verificação de sinistros',
        'Análise de roubo e furto',
        'Histórico de KM rodado',
        'Gravame financeiro',
        'Restrições judiciais',
        'Renajud detalhado',
        'Recall do fabricante',
        'Consulta por Placa e Chassi',
        'Score de avaliação',
        'Relatório completo em PDF',
        'Suporte prioritário',
      ],
      color: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-200',
    },
    {
      name: 'Leilão Especializado',
      icon: <TrendingUp className="h-8 w-8" />,
      description: 'Focado em veículos de leilão',
      price: '39,90',
      oldPrice: null,
      popular: false,
      features: [
        'Histórico de leilão detalhado',
        'Avaliação de danos',
        'Custos de recuperação',
        'Valor de mercado',
        'Status de salvados',
        'Consulta por Placa e Chassi',
        'Relatório especializado',
        'Suporte técnico',
      ],
      color: 'from-emerald-600 to-emerald-700',
      borderColor: 'border-emerald-200',
    },
  ];

  return (
    <section id="precos" className="py-20 lg:py-32 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Zap className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-700">Planos e Preços</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Escolha o plano ideal para <span className="text-blue-600">sua necessidade</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Preços justos e transparentes. Sem mensalidades, você paga apenas pelas consultas que realizar.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl border-2 ${
                plan.popular ? 'border-blue-500 shadow-2xl scale-105' : plan.borderColor
              } overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-6 py-2 rounded-bl-2xl font-bold text-sm flex items-center space-x-1 shadow-lg">
                  <Star className="h-4 w-4 fill-current" />
                  <span>MAIS POPULAR</span>
                </div>
              )}

              <div className="p-8">
                {/* Icon & Title */}
                <div className={`bg-gradient-to-br ${plan.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6 h-12">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline space-x-2 mb-2">
                    {plan.oldPrice && (
                      <span className="text-lg text-slate-400 line-through">R$ {plan.oldPrice}</span>
                    )}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900">R$ {plan.price}</span>
                    <span className="text-slate-600 ml-2">/consulta</span>
                  </div>
                  {plan.oldPrice && (
                    <div className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Economize R$ {(parseFloat(plan.oldPrice.replace(',', '.')) - parseFloat(plan.price.replace(',', '.'))).toFixed(2).replace('.', ',')}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {plan.popular ? 'COMEÇAR AGORA' : 'SELECIONAR PLANO'}
                </button>

                {/* Features */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="font-semibold text-slate-900 mb-4">O que está incluído:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-600' : 'text-emerald-600'}`} />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantees */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 lg:p-12 border border-emerald-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">100% Seguro</h4>
              <p className="text-slate-600">Seus dados e pagamento totalmente protegidos com criptografia SSL</p>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Resultado Instantâneo</h4>
              <p className="text-slate-600">Receba o relatório completo em até 2 minutos após o pagamento</p>
            </div>
            <div className="space-y-3">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Satisfação Garantida</h4>
              <p className="text-slate-600">Se não ficar satisfeito, devolvemos 100% do seu dinheiro</p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default PricingSection;
