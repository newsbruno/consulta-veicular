import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Carlos Eduardo Silva',
      role: 'Comprador de veículos',
      image: '👨‍💼',
      rating: 5,
      text: 'Evitei um prejuízo enorme! Descobri que o carro tinha histórico de leilão que o vendedor omitiu. Valeu cada centavo da consulta.',
      verified: true,
    },
    {
      name: 'Marina Santos',
      role: 'Revendedora',
      image: '👩‍💼',
      rating: 5,
      text: 'Uso a plataforma diariamente na minha loja. As informações são precisas e o relatório é muito completo. Indispensável para meu negócio!',
      verified: true,
    },
    {
      name: 'Roberto Mendes',
      role: 'Particular',
      image: '👨',
      rating: 5,
      text: 'Comprei meu primeiro carro com total segurança. O relatório me deu todas as informações que eu precisava para negociar um bom preço.',
      verified: true,
    },
    {
      name: 'Juliana Oliveira',
      role: 'Despachante',
      image: '👩',
      rating: 5,
      text: 'Recomendo para todos os meus clientes. A consulta é rápida, completa e o preço é justo. Já evitamos vários problemas com transferências.',
      verified: true,
    },
    {
      name: 'Fernando Costa',
      role: 'Mecânico',
      image: '🧑‍🔧',
      rating: 5,
      text: 'Como mecânico, sempre indico essa consulta antes de qualquer negociação. Já vi muitos casos de carros com problemas graves ocultos.',
      verified: true,
    },
    {
      name: 'Patrícia Almeida',
      role: 'Corretora de Seguros',
      image: '👩‍💻',
      rating: 5,
      text: 'Essencial para cotação de seguros! Com essas informações consigo oferecer as melhores condições para meus clientes.',
      verified: true,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-6">
            <Star className="h-4 w-4 text-amber-600 mr-2 fill-current" />
            <span className="text-sm font-semibold text-amber-700">Avaliação 4.9/5.0</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            O que nossos <span className="text-blue-600">clientes dizem</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Milhares de pessoas já confiaram em nossa plataforma para tomar decisões seguras na compra de veículos.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <Quote className="h-10 w-10 text-blue-100" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 text-base">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      {testimonial.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">17.99M+</div>
              <div className="text-blue-100">Consultas Realizadas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Avaliação Média</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
