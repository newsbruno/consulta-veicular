import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona a consulta veicular?',
      answer: 'Nossa plataforma busca informações em múltiplas bases de dados oficiais do Brasil. Você informa a placa do veículo, realizamos uma busca completa em tempo real e geramos um relatório detalhado com mais de 25 informações essenciais sobre o veículo, incluindo histórico de débitos, sinistros, leilão, roubo/furto e muito mais.',
    },
    {
      question: 'Quanto tempo leva para receber o resultado?',
      answer: 'O resultado é praticamente instantâneo! Após confirmar o pagamento, você receberá o relatório completo em até 2 minutos. O processamento é totalmente automático e disponível 24 horas por dia, 7 dias por semana.',
    },
    {
      question: 'As informações são confiáveis e atualizadas?',
      answer: 'Sim! Trabalhamos com fontes oficiais e parceiros certificados, incluindo Detran, Renajud, Serpro e outras bases governamentais. Nossas informações são atualizadas diariamente para garantir a máxima precisão dos dados fornecidos.',
    },
    {
      question: 'Posso consultar qualquer veículo do Brasil?',
      answer: 'Sim, nossa base de dados abrange todos os veículos registrados no território nacional. Você pode consultar carros, motos, caminhões e outros veículos usando tanto placas antigas quanto placas do padrão Mercosul.',
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos pagamentos via PIX (com aprovação instantânea) e cartão de crédito (Visa, Mastercard, Elo, American Express). Todos os pagamentos são processados de forma segura com criptografia SSL.',
    },
    {
      question: 'O que é verificado na consulta completa?',
      answer: 'A consulta completa inclui: dados cadastrais, histórico de débitos e multas, sinistros e batidas, passagem por leilão, gravame financeiro, roubo e furto, restrições judiciais, Renajud, recalls, histórico de KM, custo de manutenção, score de avaliação e muito mais.',
    },
    {
      question: 'Posso imprimir ou compartilhar o relatório?',
      answer: 'Sim! Após receber o resultado, você pode imprimir o relatório em PDF, baixar para seu computador ou compartilhar via WhatsApp e email. O relatório fica salvo em seu histórico para consultas futuras.',
    },
    {
      question: 'Existe limite de consultas?',
      answer: 'Não! Você paga por consulta realizada, sem limite mínimo ou máximo. Não há mensalidade, assinatura ou taxas escondidas. Ideal tanto para uso eventual quanto profissional.',
    },
    {
      question: 'E se eu não ficar satisfeito com a consulta?',
      answer: 'Garantimos 100% de satisfação! Se por algum motivo você não ficar satisfeito com as informações recebidas, oferecemos reembolso total em até 7 dias. Sua satisfação é nossa prioridade.',
    },
    {
      question: 'Como faço para criar uma conta?',
      answer: 'É muito simples! Clique no botão "ENTRAR" no topo da página, escolha "Cadastre-se" e preencha seus dados básicos. O processo leva menos de 2 minutos e você já pode começar a consultar.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-6">
            <HelpCircle className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-semibold text-purple-700">Perguntas Frequentes</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Tire suas <span className="text-blue-600">dúvidas</span>
          </h2>
          <p className="text-xl text-slate-600">
            Reunimos as perguntas mais comuns para ajudá-lo a entender melhor nossos serviços.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg text-slate-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-6 w-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-center text-white shadow-xl">
          <MessageCircle className="h-16 w-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar! Entre em contato e teremos prazer em responder suas perguntas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Falar com Suporte
            </a>
            <a
              href="mailto:contato@consultaveicular.com.br"
              className="bg-blue-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-all duration-200 border-2 border-blue-500"
            >
              Enviar Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
