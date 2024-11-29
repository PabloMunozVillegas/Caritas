import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Send, 
    Plus, 
    Trash2, 
    Settings, 
    MoreVertical, 
    FileText, 
    CloudUpload, 
    Users 
} from 'lucide-react';
import useApiFunctions from '../../Hoook/ApiFunc';
import { useAuth } from '../../useContext';
import { obtenerCorreo } from '../api/apiGet';

const CrearCorreo = () => {
    const { crearTodo } = useApiFunctions();
    const { token } = useAuth();

    // Server Configuration State
    const [serverConfig, setServerConfig] = useState({
        correo: '',
        password: '',
        host: '',
        port: '',
    });

    // Email Composition State (now including recipients)
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        text: '',
        html: '',
    });

    // Recipient Management
    const [recipients, setRecipients] = useState([]);
    const [currentRecipient, setCurrentRecipient] = useState('');

    // Send Options State
    const [isSendMenuOpen, setIsSendMenuOpen] = useState(false);
    const [sendMethod, setSendMethod] = useState(null);

    // Handlers for Server Configuration
    const handleServerConfigChange = (e) => {
        const { name, value } = e.target;
        setServerConfig(prev => ({
            ...prev,
            [name]: name === 'port' ? parseInt(value, 10) || '' : value
        }));
    };

    // Save Server Configuration
    const handleSaveConfig = async () => {
        try {
            await crearTodo('crearCongfiguracion', '', serverConfig);
            alert('Configuración guardada exitosamente');
        } catch (error) {
            alert('Error al guardar configuración');
        }
    };

    // Recipient Management
    const addRecipient = () => {
        if (currentRecipient.includes('@') && !recipients.includes(currentRecipient)) {
            const updatedRecipients = [...recipients, currentRecipient];
            setRecipients(updatedRecipients);
            
            // Format recipients as comma-separated string with spaces
            const recipientString = updatedRecipients
                .map((email) => `${email}`)
                .join(', ');
            
            setEmailData(prev => ({
                ...prev,
                to: recipientString
            }));
            
            setCurrentRecipient('');
        }
    };

    const removeRecipient = (email) => {
        const updatedRecipients = recipients.filter(r => r !== email);
        setRecipients(updatedRecipients);
        
        // Reformat recipients string
        const recipientString = updatedRecipients
            .map((email, index) => `remitente${index + 1}: ${email}`)
            .join(', ');
        
        setEmailData(prev => ({
            ...prev,
            to: recipientString
        }));
    };

    // Email Composition Handlers
    const handleEmailCompositionChange = (e) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Send Email Methods
    const handleSendEmail = async () => {
        try {
            const response = await crearTodo('crearEmail', '', emailData);
            alert('Correo guardado exitosamente');
        } catch (error) {
            alert('Error al guardar correo');
        }
    };

    const handleSendEmailNow = async (method) => {
        try {
            switch(method) {
                case 'immediate':
                    const immediateResponse = await obtenerCorreo(token);
                    alert('Correo enviado inmediatamente');
                    break;
                case 'background':
                    // Implement background send logic
                    alert('Enviando en segundo plano');
                    break;
                case 'scheduled':
                    // Implement scheduled send logic
                    alert('Correo programado');
                    break;
                default:
                    alert('Método de envío no seleccionado');
            }
            setIsSendMenuOpen(false);
        } catch (error) {
            alert('Error al enviar correo');
        }
    };

    // Animation Variants
    const stationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 50 
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Server Configuration Station */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-xl rounded-2xl p-6"
                >
                    <div className="flex items-center mb-4">
                        <Settings className="mr-2 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Configuración del Servidor</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo del Servidor"
                            value={serverConfig.correo}
                            onChange={handleServerConfigChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={serverConfig.password}
                            onChange={handleServerConfigChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="host"
                            placeholder="Servidor Host"
                            value={serverConfig.host}
                            onChange={handleServerConfigChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            name="port"
                            placeholder="Puerto"
                            value={serverConfig.port}
                            onChange={handleServerConfigChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleSaveConfig}
                        className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Guardar Configuración
                    </button>
                </motion.div>

                {/* Email Composition Station with Recipients */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-xl rounded-2xl p-6"
                >
                    <div className="flex items-center mb-4">
                        <Mail className="mr-2 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Composición de Correo</h2>
                    </div>
                    
                    {/* Recipient Management */}
                    <div className="flex items-center mb-4">
                        <input
                            type="email"
                            value={currentRecipient}
                            onChange={(e) => setCurrentRecipient(e.target.value)}
                            placeholder="Añadir correo del destinatario"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md mr-2"
                        />
                        <button
                            onClick={addRecipient}
                            className="bg-green-500 text-white p-2 rounded-full"
                        >
                            <Plus />
                        </button>
                    </div>

                    {/* Recipients Display */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {recipients.map((email, index) => (
                            <div
                                key={email}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                            >
                                remitente{index + 1}: {email}
                                <button
                                    onClick={() => removeRecipient(email)}
                                    className="ml-2 text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Email Composition Fields */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Asunto del Correo"
                            value={emailData.subject}
                            onChange={handleEmailCompositionChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            name="text"
                            placeholder="Texto del Correo"
                            value={emailData.text}
                            onChange={handleEmailCompositionChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                        />
                        <textarea
                            name="html"
                            placeholder="Contenido HTML (Opcional)"
                            value={emailData.html}
                            onChange={handleEmailCompositionChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                        />
                        <button
                            onClick={handleSendEmail}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Guardar Correo
                        </button>
                    </div>
                </motion.div>

                {/* Sending Station */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-xl rounded-2xl p-6 relative"
                >
                    <div className="flex items-center mb-4">
                        <Send className="mr-2 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Envío de Correos</h2>
                    </div>

                    <div className="relative">
                        <button 
                            onClick={() => setIsSendMenuOpen(!isSendMenuOpen)}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 flex items-center justify-center"
                        >
                            Opciones de Envío <MoreVertical className="ml-2" />
                        </button>

                        {isSendMenuOpen && (
                            <div className="absolute z-10 right-0 mt-2 w-64 bg-white border rounded-md shadow-lg">
                                <button 
                                    onClick={() => handleSendEmailNow('immediate')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                    <CloudUpload className="mr-2" /> Envío Inmediato
                                </button>
                                <button 
                                    onClick={() => handleSendEmailNow('background')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                    <FileText className="mr-2" /> Envío en Segundo Plano
                                </button>
                                <button 
                                    onClick={() => handleSendEmailNow('scheduled')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                    <Users className="mr-2" /> Envío Programado
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CrearCorreo;