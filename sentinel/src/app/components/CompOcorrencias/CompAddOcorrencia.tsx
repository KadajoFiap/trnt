'use client';
import { useState } from 'react';

interface OcorrenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (ocorrencia: OcorrenciaData) => void;
    lastId: number;
}

interface OcorrenciaData {
    id: number;
    data: string;
    descricao: string;
    status: string;
}

const CompAddOcorrencia = ({ isOpen, onClose, onAdd, lastId }: OcorrenciaModalProps) => {
    const [formData, setFormData] = useState({
        descricao: '',
        status: 'Em andamento'
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validação dos campos
        if (!formData.descricao.trim()) {
            setError('Por favor, preencha a descrição');
            return;
        }

        // Criar nova ocorrência
        const novaOcorrencia: OcorrenciaData = {
            id: lastId + 1,
            data: new Date().toLocaleDateString(),
            descricao: formData.descricao,
            status: formData.status
        };

        onAdd(novaOcorrencia);
        setFormData({ descricao: '', status: 'Em andamento' });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 p-6 rounded-lg w-96 shadow-xl mx-4 md:mx-0">
                <h2 className="text-xl font-bold mb-4">Adicionar Nova Ocorrência</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição
                        </label>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                            rows={4}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompAddOcorrencia;
