import React from 'react';

const Historico: React.FC = () => {
  const consultas = [
    {
      placa: 'ABC-1234',
      consulta: 'Veículo Completo',
      data: '15/07/2024',
      status: 'Concluída',
    },
    {
      placa: 'XYZ-5678',
      consulta: 'Veículo Essencial',
      data: '14/07/2024',
      status: 'Concluída',
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Histórico de Consultas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consulta</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consultas.map((consulta, index) => (
              <tr key={index}>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{consulta.placa}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{consulta.consulta}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{consulta.data}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {consulta.status}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900">Ver detalhes</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historico;
