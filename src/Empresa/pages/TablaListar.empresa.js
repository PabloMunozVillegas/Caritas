import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileExcel, FaFilePdf, FaSearch } from 'react-icons/fa';
import { obtenerEmpresas } from '../api/apiGet';
import { useAuth } from '../../useContext';

const ListarEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { token } = useAuth();

    const obtEmpresas = async () => {
        try {
            const data = await obtenerEmpresas(token);
            setEmpresas(data);
        } catch (error) {
            console.error('Error fetching empresas:', error);
        }
    };

    useEffect(() => {
        obtEmpresas();
    }, []);

    const handleQuickDateRange = (range) => {
        const now = new Date();
        let start, end;

        switch (range) {
            case 'today':
                start = end = now.toISOString().split('T')[0];
                break;
            case 'week':
                start = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
                end = new Date().toISOString().split('T')[0];
                break;
            case 'month':
                start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
                end = new Date().toISOString().split('T')[0];
                break;
            case 'lastMonth':
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
                end = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
                break;
            default:
                break;
        }

        setStartDate(start);
        setEndDate(end);
    };

    const filteredEmpresas = empresas.filter(empresa => {
        const fecha = new Date(empresa.fecha);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            empresa.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!start || fecha >= start) &&
            (!end || fecha <= end)
        );
    });

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredEmpresas.map(({ nombre, fecha }) => ({
                Nombre: nombre,
                Fecha: new Date(fecha).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Empresas');
        XLSX.writeFile(workbook, 'Lista_Empresas.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['Nombre', 'Fecha'];
        const tableRows = filteredEmpresas.map(({ nombre, fecha }) => [
            nombre,
            new Date(fecha).toLocaleDateString(),
        ]);

        doc.text('Lista de Empresas', 14, 20);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });
        doc.save('Lista_Empresas.pdf');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Lista de Empresas</h1>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar empresa por nombre..."
                        className="w-full pl-10 pr-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Seleccione un rango de fechas..."
                    className="w-full md:w-1/3 py-3 px-4 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    value={`${startDate} - ${endDate}`}
                    readOnly
                />
                <div className="flex gap-2">
                    <button
                        onClick={() => handleQuickDateRange('today')}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Hoy
                    </button>
                    <button
                        onClick={() => handleQuickDateRange('week')}
                        className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => handleQuickDateRange('month')}
                        className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                    >
                        Mes
                    </button>
                    <button
                        onClick={() => handleQuickDateRange('lastMonth')}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
                    >
                        Mes Anterior
                    </button>
                </div>
            </div>

            {/* Botones de exportación */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
                >
                    <FaFileExcel />
                    Exportar
                </button>
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
                >
                    <FaFilePdf />
                    Exportar
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmpresas.length > 0 ? (
                            filteredEmpresas.map((empresa, index) => (
                                <tr
                                    key={empresa._id}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition duration-300`}
                                >
                                    <td className="py-3 px-6 text-gray-700 font-medium">{empresa.nombre}</td>
                                    <td className="py-3 px-6 text-gray-500">
                                        {new Date(empresa.fecha).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="py-6 text-center text-gray-500">
                                    No se encontraron empresas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumen */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Mostrando {filteredEmpresas.length} de {empresas.length} empresas registradas.</p>
            </div>
        </div>
    );
};

export default ListarEmpresas;
