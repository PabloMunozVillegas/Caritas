import React, { useState } from 'react';
import useApiFunctions from '../../Hoook/ApiFunc';

const CrearCorreo = () => {
    const { crearTodo, obtenerTodo } = useApiFunctions();
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        text: '',
        html: '',
    });
    const [configData, setConfigData] = useState({
        correo: '',
        password: '',
        host: '',
        port: '',
    });

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'email') {
            setEmailData({
                ...emailData,
                [name]: value,
            });
        } else if (type === 'config') {
            setConfigData({
                ...configData,
                [name]: name === 'port' ? parseInt(value, 10) || '' : value, 
            });
        }
    };

    const handleSendEmailNow = async () => {
        try {
            await obtenerTodo('enviarEmail');
            console.log('Correo enviado exitosamente');
            alert('Correo enviado exitosamente');
        } catch (error) {
            alert('Error al enviar correo');
        }
    };
    
    

    const handleSendEmail = async () => {
        try {
            await crearTodo('crearEmail', '', emailData);
            alert('Correo enviado exitosamente');
        } catch (error) {
            alert('Error al enviar correo');
        }
    };

    const handleSaveConfig = async () => {
        try {
            await crearTodo('crearCongfiguracion', '', configData);
            alert('Configuración guardada exitosamente');
        } catch (error) {
            alert('Error al guardar configuración');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración de Correos</h1>

                {/* Configuración del correo */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Guardar Configuración</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="correo"
                        placeholder="Correo"
                        value={configData.correo}
                        onChange={(e) => handleInputChange(e, 'config')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={configData.password}
                        onChange={(e) => handleInputChange(e, 'config')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="host"
                        placeholder="Host"
                        value={configData.host}
                        onChange={(e) => handleInputChange(e, 'config')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="port"
                        placeholder="Puerto"
                        value={configData.port}
                        onChange={(e) => handleInputChange(e, 'config')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleSaveConfig}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Guardar Configuración
                    </button>
                </div>

                <hr className="my-6 border-gray-300" />

                {/* Enviar Correo */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Enviar Correo</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        name="to"
                        placeholder="Destinatario"
                        value={emailData.to}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Asunto"
                        value={emailData.subject}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        name="text"
                        placeholder="Texto del Correo"
                        value={emailData.text}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        name="html"
                        placeholder="HTML del Correo"
                        value={emailData.html}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleSendEmail}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Guardar Correo
                    </button>


                    <button
                        onClick={handleSendEmailNow}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Enviar Correo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CrearCorreo;
