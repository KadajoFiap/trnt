'use client';
import { useState } from 'react';
import CompAddOcorrencia from '../CompAddOcorrencia/CompAddOcorrencia';

interface Ocorrencia {
    id: number;
    data: string;
    descricao: string;
    status: string;
}

const CompOcorrencias = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
        { id: 1, data: '10/03/2024', descricao: 'Descrição inicial', status: 'Em andamento' }
    ]);

    const handleAddOcorrencia = (novaOcorrencia: Ocorrencia) => {
        setOcorrencias([...ocorrencias, novaOcorrencia]);
    };

    return (
        <>
            <div className="bg-[#f4f4f4] min-h-screen pt-30 ps-10 pe-10 pb-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[30px] font-medium">Ocorrências</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        + Adicionar Ocorrência
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md min-h-[500px] flex flex-col">
                    <div className="flex-1 overflow-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Data</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Descrição</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100 whitespace-nowrap">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ocorrencias.map((ocorrencia) => (
                                    <tr key={ocorrencia.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">{String(ocorrencia.id).padStart(3, '0')}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ocorrencia.data}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ocorrencia.descricao}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ocorrencia.status}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <button className="text-blue-600 hover:text-blue-800">Editar</button>
                                        </td>
                                    </tr>
                                ))}
                                {ocorrencias.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Nenhuma ocorrência registrada
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CompAddOcorrencia
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddOcorrencia}
                lastId={ocorrencias.length > 0 ? Math.max(...ocorrencias.map(o => o.id)) : 0}
            />
        </>
    );
};

export default CompOcorrencias;