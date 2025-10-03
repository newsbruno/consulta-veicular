import React from 'react';
import { Users, Shield, TrendingUp, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      value: '17.99M+',
      label: 'Consultas realizadas',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      value: '98%',
      label: 'Taxa de satisfação',
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: '25+',
      label: 'Informações por consulta',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      value: '< 2min',
      label: 'Tempo médio de resultado',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
