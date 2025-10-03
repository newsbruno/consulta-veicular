import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type ConsultaOption = {
  title: string;
  description: string;
  price: string; // em R$
  oldPrice?: string;
  tag?: string;
  features: string[]; // ex: ['Placa', 'Chassi']
};

const consultaOptions: ConsultaOption[] = [
  {
    title: 'Veículo Completo',
    tag: 'Popular',
    description: 'A consulta mais completa do mercado, com informações e dados exclusivos, que só a Olho no Carro tem!',
    price: '64,90',
    oldPrice: '74,90',
    features: ['Placa', 'Chassi'],
  },
  {
    title: 'Veículo Essencial',
    description: 'Informações essenciais sobre o veículo, que te ajudam a negociar com mais segurança e acertar na escolha do seu próximo carro.',
    price: '45,90',
    oldPrice: '52,90',
    features: ['Placa'],
  },
  {
    title: 'Leilão + Dados do Veículo',
    description: 'Informações sobre o veículo de leilão, que te ajudam a negociar o melhor valor e evitar prejuízos!',
    price: '39,90',
    features: ['Placa', 'Chassi'],
  },
  {
    title: 'Gravame',
    description: 'Informações sobre o status de financiamento do veículo que te ajudam a evitar problemas na hora da transferência!',
    price: '29,90',
    features: ['Placa', 'Chassi'],
  },
];

const Consultar: React.FC = () => {
  // CEP removido desta tela

  // Pagamento
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ConsultaOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  // PIX form state
  const [pixName, setPixName] = useState('');
  const [pixCpf, setPixCpf] = useState('');
  const [pixQrReady, setPixQrReady] = useState(false);

  // Sem CEP nesta etapa

  // Helpers PIX
  const maskCpf = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 9);
    const p4 = d.slice(9, 11);
    if (p4) return `${p1}.${p2}.${p3}-${p4}`;
    if (p3) return `${p1}.${p2}.${p3}`;
    if (p2) return `${p1}.${p2}`;
    if (p1) return p1;
    return '';
  };

  const isPixPayerValid = () => pixName.trim().length > 3 && pixCpf.replace(/\D/g, '').length === 11;

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Veja nossas consultas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consultaOptions.map((option, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            {option.tag && (
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full self-start mb-3">
                {option.tag}
              </span>
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h2>
            <p className="text-gray-600 mb-4 flex-1">{option.description}</p>

            <div className="flex items-center space-x-4 mb-4">
              {option.features.map(feature => (
                <div key={feature} className="flex items-center">
                  <input type="radio" name={`option-${index}`} id={`${feature}-${index}`} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" defaultChecked={feature === 'Placa'} />
                  <label htmlFor={`${feature}-${index}`} className="ml-2 text-sm text-gray-700">{feature}</label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <input type="text" placeholder="Digite a Placa" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="text-right mb-4">
              {option.oldPrice && <span className="text-sm text-gray-500 line-through mr-2">de R$ {option.oldPrice}</span>}
              <span className="text-2xl font-bold text-gray-800">R$ {option.price}</span>
              <span className="text-gray-600"> /consulta</span>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => { setSelectedProduct(option); setShowPayment(true); setPaid(false); setPaymentMethod('pix'); }}
            >
              CONSULTAR
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Pagamento */}
      {showPayment && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => !isPaying && setShowPayment(false)} />
          <div className="relative bg-white w-full max-w-lg mx-4 my-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pagamento</h3>
                <p className="text-sm text-gray-600">{selectedProduct.title} • R$ {selectedProduct.price}</p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => !isPaying && setShowPayment(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {/* Abas de método */}
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-3 py-2 rounded-lg text-sm border ${paymentMethod === 'pix' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  onClick={() => { setPaymentMethod('pix'); setIsPaying(false); setPaid(false); setPixName(''); setPixCpf(''); setPixQrReady(false); }}
                >
                  Pagar com PIX
                </button>
                <button
                  className={`px-3 py-2 rounded-lg text-sm border ${paymentMethod === 'card' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  onClick={() => { setPaymentMethod('card'); setIsPaying(false); setPaid(false); setPixQrReady(false); }}
                >
                  Pagar com Cartão
                </button>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="space-y-4">
                  {/* Dados do pagador */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Nome completo</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Nome como no banco"
                        value={pixName}
                        onChange={(e) => setPixName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm text-gray-700 mb-1">CPF</label>
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={pixCpf}
                        onChange={(e) => setPixCpf(maskCpf(e.target.value))}
                        required
                      />
                    </div>
                  </div>

                  {!pixQrReady && (
                    <button
                      type="button"
                      disabled={!isPixPayerValid()}
                      onClick={() => setPixQrReady(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
                    >
                      Gerar QR Code PIX
                    </button>
                  )}

                  {pixQrReady && (
                    <>
                      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                        <div className="w-40 h-40 bg-gray-100 mx-auto mb-3 rounded" />
                        <p className="text-sm text-gray-600">Escaneie o QR Code no seu app do banco ou copie o código PIX.</p>
                        <p className="text-xs text-gray-500 mt-1">Pagador: {pixName} • CPF: {pixCpf}</p>
                      </div>
                      <button
                        disabled={isPaying}
                        onClick={async () => {
                          setIsPaying(true);
                          // simula confirmação do PIX
                          await new Promise(r => setTimeout(r, 1500));
                          setPaid(true);
                          setIsPaying(false);
                        }}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
                      >
                        {isPaying ? 'Confirmando pagamento...' : paid ? 'Pago com sucesso' : 'Já paguei via PIX'}
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <form
                  className="space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsPaying(true);
                    await new Promise(r => setTimeout(r, 1500));
                    setPaid(true);
                    setIsPaying(false);
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Número do cartão</label>
                      <input className="w-full p-3 border border-gray-300 rounded-lg" inputMode="numeric" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Validade</label>
                      <input className="w-full p-3 border border-gray-300 rounded-lg" placeholder="MM/AA" required />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">CVV</label>
                      <input className="w-full p-3 border border-gray-300 rounded-lg" inputMode="numeric" placeholder="123" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Nome impresso no cartão</label>
                      <input className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Nome completo" required />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isPaying}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
                  >
                    {isPaying ? 'Processando...' : 'Pagar R$ ' + selectedProduct.price}
                  </button>
                </form>
              )}

              {paid && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  Pagamento aprovado! Agora você pode prosseguir com a consulta.
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => !isPaying && setShowPayment(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-60"
                disabled={!paid}
                onClick={() => {
                  if (!selectedProduct) return;
                  setShowPayment(false);
                  navigate('/dashboard/resultado', {
                    state: {
                      product: selectedProduct,
                      paidAt: Date.now(),
                    },
                  });
                }}
              >
                Prosseguir para consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultar;
