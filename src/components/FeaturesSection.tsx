import React from 'react';
import { Shield, FileText, AlertTriangle, Eye, Clock, MapPin, CheckCircle, Car, TrendingUp } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Risco de comercialização',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Dados de leilão',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Batidas e sinistros',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Roubo e furto',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Histórico de KM',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Gravame financeiro',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Débitos e multas',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Restrições judiciais',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Renajud detalhado',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Aceitação em seguro',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Histórico de manutenção',
      color: 'text-lime-600',
      bgColor: 'bg-lime-50',
      borderColor: 'border-lime-200'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Custo médio de manutenção',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Dados cadastrais nacionais',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Recall do fabricante',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Score de leilão',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const categories = [
    {
      icon: <Car className="h-6 w-6" />,
      title: 'Informações Gerais do Veículo',
      description: 'Dados básicos, especificações técnicas e características'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Situação Legal e Restrições',
      description: 'Status legal, restrições judiciais e impedimentos'
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Condição Técnica e Segurança',
      description: 'Histórico de sinistros, recalls e manutenções'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Avaliação de Mercado',
      description: 'Valor de mercado, depreciação e aceitação'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Ferramentas de Identificação',
      description: 'Verificação de autenticidade e procedência'
    }
  ];

  return (
    <section id="recursos" className="py-20 lg:py-32 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
            <span className="text-sm font-semibold text-emerald-700">Consulta Mais Completa</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Descubra tudo o que nossa <span className="text-emerald-600">consulta completa</span> oferece
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Mais de 25 informações essenciais sobre qualquer veículo brasileiro em uma única consulta. 
            Dados precisos e atualizados para sua total segurança.
          </p>
        </div>

        {/* Main Feature Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 lg:p-12 mb-20 border border-emerald-200">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-600 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-emerald-800">Veículo Completo</h3>
                    <p className="text-lg text-emerald-700">+ de 25 informações detalhadas</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  Ver modelo da consulta →
                </a>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-200 mb-8">
              <p className="text-slate-700 text-lg leading-relaxed">
                Quer saber tudo sobre o veículo antes de comprar? Faça a consulta mais completa do mercado! 
                Com ela, você pode validar dados cadastrais, saber se o veículo já foi batido, roubado, 
                se tem multas, débitos, passagem por leilão e muito mais. <strong>Informações exclusivas que só 
                nossa plataforma oferece.</strong>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className={`flex items-center space-x-4 ${feature.bgColor} ${feature.borderColor} border p-5 rounded-xl transition-all duration-200 hover:shadow-md`}>
                  <div className={`${feature.color} p-2 rounded-lg bg-white shadow-sm`}>
                    {feature.icon}
                  </div>
                  <span className="text-slate-800 font-semibold text-sm">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Importante:</strong> Essas informações dependem da disponibilidade na base de dados de nossos parceiros oficiais. 
                  Garantimos acesso às fontes mais confiáveis e atualizadas do mercado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works + Categories */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* How it works */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Como funciona nossa consulta
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                Processo simples, rápido e 100% seguro para obter todas as informações do veículo.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-slate-900 mb-2">Digite a placa</h4>
                  <p className="text-slate-600 leading-relaxed">Informe apenas a placa do veículo que deseja consultar. Nosso sistema aceita placas antigas e do Mercosul.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-slate-900 mb-2">Processamento instantâneo</h4>
                  <p className="text-slate-600 leading-relaxed">Nossa plataforma busca em múltiplas bases de dados oficiais em tempo real para garantir informações precisas.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-slate-900 mb-2">Relatório completo</h4>
                  <p className="text-slate-600 leading-relaxed">Receba todas as informações organizadas em um relatório detalhado e fácil de entender.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200">
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Categorias de informação</h4>
                <p className="text-slate-600">Organizamos todas as informações em categorias específicas para facilitar sua análise.</p>
              </div>
              
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="bg-slate-100 p-3 rounded-xl">
                        <div className="text-slate-700">
                          {category.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-slate-900">{category.title}</h5>
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="text-sm text-slate-600">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;