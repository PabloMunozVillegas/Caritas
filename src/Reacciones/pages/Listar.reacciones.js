import React, { useState, useEffect } from 'react';
import { Calendar, Download, X, ChevronDown } from 'lucide-react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import useApiFunctions from '../../Hoook/ApiFunc';

const ListarReacciones = () => {
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursales, setSelectedSucursales] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('2024-01-01');
  const [fechaFin, setFechaFin] = useState('2024-12-31');
  const [dataBySucursal, setDataBySucursal] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { obtenerTodo, crearTodo } = useApiFunctions();

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'];

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await obtenerTodo('listarSucursal');
        setSucursales(response);
      } catch (err) {
        setError('Error al cargar las sucursales');
      }
    };
    fetchSucursales();
  }, [obtenerTodo]);

  const handleListarReacciones = async () => {
    if (selectedSucursales.length === 0) {
      setError('Por favor seleccione al menos una sucursal');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Obtener datos para cada sucursal individualmente
      const results = {};
      for (const sucursalId of selectedSucursales) {
        const response = await crearTodo('obtenerCalificaicones', null, {
          sucursal: [sucursalId],
          fechaInicio,
          fechaFin,
        });
        results[sucursalId] = response;
      }
      setDataBySucursal(results);
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (Object.keys(dataBySucursal).length === 0) return;
    
    const allData = [];
    Object.entries(dataBySucursal).forEach(([sucursalId, data]) => {
      data.data.forEach(item => {
        allData.push({
          Sucursal: getSucursalNombre(sucursalId),
          ...item.calificaciones.reduce((acc, cal) => {
            acc[cal.tipo] = cal.cantidad;
            return acc;
          }, {})
        });
      });
    });
    
    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reacciones');
    XLSX.writeFile(workbook, `reacciones_${fechaInicio}_${fechaFin}.xlsx`);
  };

  // Funciones del multiselect (sin cambios)
  const toggleSucursal = (sucursalId) => {
    setSelectedSucursales(prev => 
      prev.includes(sucursalId)
        ? prev.filter(id => id !== sucursalId)
        : [...prev, sucursalId]
    );
  };

  const removeSucursal = (sucursalId) => {
    setSelectedSucursales(prev => prev.filter(id => id !== sucursalId));
  };

  const getSucursalNombre = (id) => {
    return sucursales.find(s => s._id === id)?.nombre || '';
  };

  const filteredSucursales = sucursales.filter(sucursal => 
    sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para generar datos del pie chart para una sucursal específica
  const getPieChartData = (sucursalId) => {
    const data = dataBySucursal[sucursalId]?.totalCalificaciones;
    return data ? 
      Object.entries(data).map(([name, value]) => ({
        name,
        value
      })).filter(item => item.value > 0) : [];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header y controles (sin cambios) */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard de Reacciones</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Multi-select component (sin cambios) */}
              <div className="relative md:col-span-2">
                <div 
                  className="w-full min-h-[42px] px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 cursor-pointer bg-white"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedSucursales.length === 0 ? (
                    <span className="text-gray-500">Seleccione sucursales...</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedSucursales.map(id => (
                        <span 
                          key={id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {getSucursalNombre(id)}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSucursal(id);
                            }}
                            className="ml-1 hover:text-blue-900"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <ChevronDown 
                    className={`absolute right-2 top-3 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    size={20}
                  />
                </div>

                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Buscar sucursales..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredSucursales.map((sucursal) => (
                        <div
                          key={sucursal._id}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                            selectedSucursales.includes(sucursal._id) ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => toggleSucursal(sucursal._id)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSucursales.includes(sucursal._id)}
                            onChange={() => {}}
                            className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span>{sucursal.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-500" />
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-500" />
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                onClick={handleListarReacciones}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {loading ? 'Cargando...' : 'Buscar'}
              </button>
            </div>

            {error && (
              <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Resultados por sucursal */}
            {Object.keys(dataBySucursal).length > 0 && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Resultados de {selectedSucursales.length} sucursal{selectedSucursales.length !== 1 ? 'es' : ''}
                  </h3>
                  <button
                    onClick={exportToExcel}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <Download size={20} />
                    <span>Exportar a Excel</span>
                  </button>
                </div>

                {selectedSucursales.map(sucursalId => (
                  <div key={sucursalId} className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">
                      {getSucursalNombre(sucursalId)}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-800">Distribución de Calificaciones</h4>
                        </div>
                        <div className="p-4">
                          <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsChart>
                                <Pie
                                  data={getPieChartData(sucursalId)}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={150}
                                  label
                                >
                                  {getPieChartData(sucursalId).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </RechartsChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-800">Resumen de Calificaciones</h4>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {Object.entries(dataBySucursal[sucursalId]?.totalCalificaciones || {}).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">{key}</span>
                                <span className="text-2xl font-bold text-gray-900">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarReacciones;