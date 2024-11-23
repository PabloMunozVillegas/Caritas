import React, { useEffect, useState } from 'react';
import useApiFunctions from '../../Hoook/ApiFunc';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileExcel, FaFilePdf, FaSearch } from 'react-icons/fa';

const ListarEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { obtenerTodo } = useApiFunctions();

    const fetchEmpresas = async () => {
        try {
            const data = await obtenerTodo('listarSucursal');
            setEmpresas(data);
        } catch (error) {
            console.error('Error fetching empresas:', error);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const filteredEmpresas = empresas.filter((empresa) => {
        const fecha = new Date(empresa.fecha);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            empresa.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!start || fecha >= start) &&
            (!end || fecha <= end)
        );
    });

    const handleQuickFilter = (type) => {
        const now = new Date();
        switch (type) {
            case 'hoy':
                setStartDate(now.toISOString().split('T')[0]);
                setEndDate(now.toISOString().split('T')[0]);
                break;
            case 'semana':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                setStartDate(startOfWeek.toISOString().split('T')[0]);
                setEndDate(now.toISOString().split('T')[0]);
                break;
            case 'mes':
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                setStartDate(startOfMonth.toISOString().split('T')[0]);
                setEndDate(now.toISOString().split('T')[0]);
                break;
            default:
                setStartDate('');
                setEndDate('');
                break;
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredEmpresas.map(({ nombre, fecha }) => ({
                Nombre: nombre,
                Fecha: new Date(fecha).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sucursales');
        XLSX.writeFile(workbook, 'Lista_Sucursales.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['Nombre', 'Fecha'];
        const tableRows = filteredEmpresas.map(({ nombre, fecha }) => [
            nombre,
            new Date(fecha).toLocaleDateString(),
        ]);

        doc.text('Lista de Sucursales', 14, 20);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });
        doc.save('Lista_Sucursales.pdf');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">LISTA DE SUCURSALES</h1>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar sucursal por nombre..."
                    className="w-full md:w-1/4 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                    type="date"
                    className="p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                        onClick={() => handleQuickFilter('hoy')}
                    >
                        Hoy
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                        onClick={() => handleQuickFilter('semana')}
                    >
                        Semana
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                        onClick={() => handleQuickFilter('mes')}
                    >
                        Mes
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
                    Excel
                </button>
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
                >
                    <FaFilePdf />
                    PDF
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
                                    No se encontraron sucursales.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumen */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Mostrando {filteredEmpresas.length} de {empresas.length} sucursales registradas.</p>
            </div>
        </div>
    );
};

export default ListarEmpresas;
