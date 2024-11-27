import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, X, ChevronDown } from 'lucide-react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import { obtenerSucursalId, obtenerEmpresas } from '../api/apiGet';
import { obtenerCalificaicones } from '../api/apiPost';
import { useAuth } from '../../useContext';

const ListarReacciones = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursales, setSelectedSucursales] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('2024-01-01');
  const [fechaFin, setFechaFin] = useState('2024-12-31');
  const [dataBySucursal, setDataBySucursal] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empresaSearchTerm, setEmpresaSearchTerm] = useState('');
  const [sucursalSearchTerm, setSucursalSearchTerm] = useState('');
  const { token } = useAuth();

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'];

  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  };

  // Fetch Empresas on component mount
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await obtenerEmpresas(token);
        setEmpresas(response);
      } catch (err) {
        setError('Error al cargar las empresas');
        console.error(err);
      }
    };
    fetchEmpresas();
  }, [token]);

  // Fetch Sucursales when Empresa is selected
  useEffect(() => {
    const fetchSucursales = async () => {
      if (selectedEmpresa) {
        try {
          const response = await obtenerSucursalId(selectedEmpresa, token);
          setSucursales(response);
          // Reset selected sucursales when empresa changes
          setSelectedSucursales([]);
        } catch (err) {
          setError('Error al cargar las sucursales');
          console.error(err);
        }
      }
    };
    fetchSucursales();
  }, [selectedEmpresa, token]);

  const handleListarReacciones = async () => {
    // Input validation
    if (!selectedEmpresa) {
      setError('Por favor seleccione una empresa');
      return;
    }
    
    if (selectedSucursales.length === 0) {
      setError('Por favor seleccione al menos una sucursal');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = {};
      for (const sucursalId of selectedSucursales) {
        const formData = { 
          sucursal: [sucursalId], 
          fechaInicio: fechaInicio, 
          fechaFin: fechaFin 
        };
        const response = await obtenerCalificaicones(formData, token);
        results[sucursalId] = response;
      }
      setDataBySucursal(results);
    } catch (err) {
      setError('Error al obtener los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Multi-select sucursal functions
  const toggleSucursal = (sucursalId) => {
    setSelectedSucursales(prev => 
      prev.includes(sucursalId)
        ? prev.filter(id => id !== sucursalId)
        : [...prev, sucursalId]
    );
  };

  // Helpers to get names
  const getEmpresaNombre = (id) => {
    return empresas.find(e => e._id === id)?.nombre || '';
  };

  const getSucursalNombre = (id) => {
    return sucursales.find(s => s._id === id)?.nombre || '';
  };

  // Filtered lists for search
  const filteredEmpresas = empresas.filter(empresa => 
    empresa.nombre.toLowerCase().includes(empresaSearchTerm.toLowerCase())
  );

  const filteredSucursales = sucursales.filter(sucursal => 
    sucursal.nombre.toLowerCase().includes(sucursalSearchTerm.toLowerCase())
  );

  // Pie chart data generator
  const getPieChartData = (sucursalId) => {
    const data = dataBySucursal[sucursalId]?.totalCalificaciones;
    return data ? 
      Object.entries(data).map(([name, value]) => ({
        name,
        value
      })).filter(item => item.value > 0) : [];
  };

  // Excel export function
  const exportToExcel = () => {
    if (Object.keys(dataBySucursal).length === 0) return;
    
    const allData = [];
    Object.entries(dataBySucursal).forEach(([sucursalId, data]) => {
      data.data.forEach(item => {
        allData.push({
          Sucursal: getSucursalNombre(sucursalId),
          Empresa: getEmpresaNombre(selectedEmpresa),
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 max-w-7xl mx-auto"
    >
      <motion.div 
        variants={itemVariants}
        className="space-y-6"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
            >
              {/* Empresa Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <select 
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione una empresa</option>
                  {filteredEmpresas.map((empresa) => (
                    <option key={empresa._id} value={empresa._id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sucursales Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sucursal
                </label>
                <select 
                  value={selectedSucursales}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedSucursales(values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione una empresa</option>
                  {filteredSucursales.map((sucursal) => (
                    <option key={sucursal._id} value={sucursal._id}>
                      {sucursal.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Fecha Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-500" />
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Fecha Fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-500" />
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Buscar Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleListarReacciones}
                disabled={loading || !selectedEmpresa}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 col-span-full mt-4"
              >
                {loading ? 'Cargando...' : 'Buscar'}
              </motion.button>
            </motion.div>

            {/* Error Handling */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Resultados por sucursal */}
            {Object.keys(dataBySucursal).length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Resultados de {selectedSucursales.length} sucursal{selectedSucursales.length !== 1 ? 'es' : ''}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportToExcel}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <Download size={20} />
                    <span>Exportar a Excel</span>
                  </motion.button>
                </div>

                {selectedSucursales.map(sucursalId => (
                  <motion.div 
                    key={sucursalId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">
                      {getSucursalNombre(sucursalId)}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pie Chart */}
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
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
                      </motion.div>

                      {/* Summary */}
                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-800">Resumen de Calificaciones</h4>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                          {Object.entries(dataBySucursal[sucursalId]?.totalCalificaciones || {}).sort((a, b) => {
                              // Aquí defines el orden según las claves. Puedes modificar este arreglo si lo necesitas.
                              const order = ["excelente", "Bueno", "Regular", "Mala", "MuyMala"];
                              return order.indexOf(a[0]) - order.indexOf(b[0]);
                            }).map(([key, value]) => {
                              let displayName = "";
                              let emoji = "";

                              switch (key) {
                                case "excelente":
                                  displayName = "Muy Bueno";
                                  emoji = "🌟";
                                  break;
                                case "Bueno":
                                  displayName = "Bueno";
                                  emoji = "👍";
                                  break;
                                case "Regular":
                                  displayName = "Regular";
                                  emoji = "😐";
                                  break;
                                case "Mala":
                                  displayName = "Deficiente";
                                  emoji = "👎";
                                  break;
                                case "MuyMala":
                                  displayName = "Malo";
                                  emoji = "💔";
                                  break;
                                default:
                                  displayName = key; // En caso de que no haya transformación
                                  emoji = ""; // No se añade emoji si el key no se transforma
                              }

                              return (
                                <motion.div 
                                  key={key}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                >
                                  <span className="font-medium text-gray-700">{displayName} {emoji}</span>
                                  <span className="text-2xl font-bold text-gray-900">{value}</span>
                                </motion.div>
                              );
                            })}



                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ListarReacciones;