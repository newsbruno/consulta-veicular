import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Status = 'ok' | 'alert' | 'warn' | 'info';

type SummaryItem = {
  label: string;
  status: Status;
  value?: string;
};

const statusColors: Record<Status, string> = {
  ok: 'text-green-600',
  alert: 'text-red-600',
  warn: 'text-yellow-600',
  info: 'text-blue-600',
};

type ConsultaProduct = {
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  tag?: string;
  features: string[];
};

type ResultadoLocationState = {
  product?: ConsultaProduct;
  paidAt?: number;
} | null;

const ResultadoConsulta: React.FC = () => {
  const location = useLocation() as { state: ResultadoLocationState };
  const navigate = useNavigate();
  const { product, paidAt } = location.state || {};
  const paidAtText = useMemo(() => (paidAt ? new Date(paidAt).toLocaleString() : new Date().toLocaleString()), [paidAt]);
  const [open, setOpen] = useState<Record<string, boolean>>({
    gerais: true,
    tecnicas: false,
    legal: false,
    condicao: false,
    modelo: false,
    identificacao: false,
    indicados: false,
  });

  // Mock de dados inspirados no layout
  const resumo: SummaryItem[] = [
    { label: 'Chassi Remarcado', status: 'ok', value: 'Não' },
    { label: 'Restrição por Furto', status: 'alert', value: 'Possível' },
    { label: 'Sinistro', status: 'warn', value: 'Possível' },
    { label: 'Débitos e Multas', status: 'ok', value: 'Sem Débitos' },
    { label: 'Leilão', status: 'info', value: 'Verificar' },
    { label: 'Alienação', status: 'ok', value: 'Não' },
    { label: 'Alteração de Características', status: 'ok', value: 'Não' },
    { label: 'Histórico de Roubo e Furto', status: 'ok', value: 'Não' },
  ];

  return (
    <div className="space-y-6">
      {/* Header da consulta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-200 rounded" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-600">{product?.title || 'Consulta'}</p>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Resultado da Consulta</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">Placa:</span>
                <span>-</span>
                <span className="hidden md:inline text-gray-300">•</span>
                <span className="font-semibold">Status:</span>
                <span>Completa</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between md:justify-end gap-4">
              <div>
                <p className="font-semibold">Data da Consulta</p>
                <p>{paidAtText}</p>
              </div>
              <div>
                <p className="font-semibold">ID</p>
                <p>OC-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Imprimir</button>
              <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Compartilhar</button>
              <button onClick={() => navigate('/dashboard/consultar')} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Nova consulta</button>
            </div>
          </div>
        </div>

        {/* Busca na consulta */}
        <div className="mt-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Pesquisar item na consulta"
          />
        </div>
      </div>

      {/* Resumo de consulta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-green-700 font-semibold">Resumo da consulta {product ? `• ${product.title}` : ''}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {resumo.map((item) => (
            <div key={item.label} className="border border-gray-200 rounded-lg p-3">
              <div className={`text-xs font-semibold ${statusColors[item.status]}`}>{item.label}</div>
              <div className="text-gray-900 font-bold mt-1">{item.value || '-'}</div>
              <div className="text-xs text-gray-500 mt-1">Ver mais</div>
            </div>
          ))}
        </div>
      </div>

      {/* Seções em acordeão */}
      {[
        { id: 'gerais', title: 'Informações gerais do veículo' },
        { id: 'tecnicas', title: 'Informações técnicas do modelo' },
        { id: 'legal', title: 'Situação Legal e Restrições' },
        { id: 'condicao', title: 'Condições e segurança' },
        { id: 'modelo', title: 'Análises do modelo' },
        { id: 'identificacao', title: 'Ferramentas de identificação' },
        { id: 'indicados', title: 'Indicados para você' },
      ].map((sec) => (
        <div key={sec.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => setOpen((o) => ({ ...o, [sec.id]: !o[sec.id] }))}
          >
            <span className="font-semibold text-gray-800">{sec.title}</span>
            <span className="text-gray-500 text-sm">{open[sec.id] ? 'Recolher' : 'Expandir'}</span>
          </button>
          {open[sec.id] && (
            <div className="px-4 pb-4 text-sm text-gray-700">
              <div className="border border-dashed rounded-lg p-4 text-gray-500">
                Conteúdo da seção "{sec.title}" aparecerá aqui.
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultadoConsulta;
