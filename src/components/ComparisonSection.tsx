import React from 'react';
import { Check, Minus } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const comparisons = [
    {
      feature: 'Histórico de leilão detalhado',
      us: true,
      others: false,
    },
    {
      feature: 'Score de avaliação',
      us: true,
      others: false,
    },
    {
      feature: 'Custo médio de manutenção',
      us: true,
      others: false,
    },
    {
      feature: 'Renajud detalhado',
      us: true,
      others: false,
    },
    {
      feature: 'Recall do fabricante',
      us: true,
      others: false,
    },
    {
      feature: 'Histórico de KM rodado',
      us: true,
      others: false,
    },
    {
      feature: 'Resultado em 2 minutos',
      us: true,
      others: false,
    },
    {
      feature: 'Suporte 24/7',
      us: true,
      others: false,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-medium text-slate-900">
            Por que escolher nossa plataforma
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Recursos exclusivos que fazem a diferença
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border-b border-slate-200">
            <div className="text-sm font-medium text-slate-600">Recurso</div>
            <div className="text-center text-sm font-medium text-slate-900">Nossa plataforma</div>
            <div className="text-center text-sm font-medium text-slate-600">Outros</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="text-sm text-slate-700 flex items-center">
                  {item.feature}
                </div>
                <div className="flex justify-center items-center">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex justify-center items-center">
                  <Minus className="h-5 w-5 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
