'use client';
import { useState } from 'react';
import CompAddOcorrencia from './CompAddOcorrencia';
import CompEditOcorrencia from './CompEditOcorrencia';

interface Ocorrencia {
    id: number;
    data: string;
    descricao: string;
    status: string;
}

const CompOcorrencias = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ocorrenciaParaEditar, setOcorrenciaParaEditar] = useState<Ocorrencia | null>(null);
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([
        { id: 1, data: '10/03/2024', descricao: 'Descrição inicial', status: 'Em andamento' }
    ]);

    const handleAddOcorrencia = (novaOcorrencia: Ocorrencia) => {
        setOcorrencias([...ocorrencias, novaOcorrencia]);
    };

    const handleEditClick = (ocorrencia: Ocorrencia) => {
        setOcorrenciaParaEditar(ocorrencia);
        setIsEditModalOpen(true);
    };

    const handleEditOcorrencia = (ocorrenciaAtualizada: Ocorrencia) => {
        setOcorrencias(ocorrencias.map(ocorrencia => 
            ocorrencia.id === ocorrenciaAtualizada.id ? ocorrenciaAtualizada : ocorrencia
        ));
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
                        <table className="min-w-full table-fixed">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">ID</th>
                                    <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Data</th>
                                    <th className="w-[45%] px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Descrição</th>
                                    <th className="w-32 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Status</th>
                                    <th className="w-24 px-6 py-3 text-left text-sm font-semibold text-gray-600 bg-gray-100">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ocorrencias.map((ocorrencia) => (
                                    <tr key={ocorrencia.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{String(ocorrencia.id).padStart(3, '0')}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.data}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.descricao}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500 truncate">{ocorrencia.status}</td>
                                        <td className="px-6 py-4 h-16 text-sm text-gray-500">
                                            <button 
                                                onClick={() => handleEditClick(ocorrencia)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {ocorrencias.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 h-16 text-center text-gray-500">
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

            {ocorrenciaParaEditar && (
                <CompEditOcorrencia
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setOcorrenciaParaEditar(null);
                    }}
                    onEdit={handleEditOcorrencia}
                    ocorrencia={ocorrenciaParaEditar}
                />
            )}
        </>
    );
};

export default CompOcorrencias;