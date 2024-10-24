import React, { useState, useEffect } from 'react';

const FormularioDinamico = ({ fields, handleSubmit, obtenerTodo }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.realName]: '' }), {})
    );

    const [apiData, setApiData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const selectFields = fields.filter(field => field.type === 'select' && field.apiEndpoint);

        selectFields.forEach(async (field) => {
            try {
                const data = await obtenerTodo(field.apiEndpoint);
                console.log('Datos obtenidos:', data);
                setApiData(prevData => ({
                    ...prevData,
                    [field.realName]: data
                }));
            } catch (error) {
                console.error(`Error fetching data for ${field.realName}:`, error);
            }
        });
    }, [fields, obtenerTodo]);

    const validateForm = () => {
        const newErrors = {};
        fields.forEach(field => {
            if (!formData[field.realName]) {
                newErrors[field.realName] = `El campo ${field.label} es requerido`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(formData);
        }
    };

    const getSelectOptions = (field) => {
        if (field.options) {
            return field.options;
        }
        return apiData[field.realName] || [];
    };

    return (
        <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            {fields.map((field, index) => (
                <div key={index} className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        {field.label} <span className="text-red-500">*</span>
                    </label>
                    {field.type === 'select' ? (
                        <>
                            <select
                                name={field.realName}
                                value={formData[field.realName]}
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors[field.realName] ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-blue-50`}
                            >
                                <option value="">Seleccione una opción</option>
                                {getSelectOptions(field).map(option => (
                                    <option key={option._id} value={option._id}>
                                        {option.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors[field.realName] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field.realName]}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <input
                                type={field.type}
                                name={field.realName}
                                value={formData[field.realName]}
                                onChange={handleChange}
                                className={`w-full p-3 border ${errors[field.realName] ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-blue-50`}
                                placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                            />
                            {errors[field.realName] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field.realName]}</p>
                            )}
                        </>
                    )}
                </div>
            ))}
            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            >
                Crear Usuario
            </button>
        </form>
    );
};

export default FormularioDinamico;