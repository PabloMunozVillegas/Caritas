import React, { useState, useEffect } from 'react';

const FormularioDinamico = ({ fields, handleSubmit, obtenerTodo, styleConfig, submitButtonText }) => {
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
                setApiData(prevData => ({
                    ...prevData,
                    [field.realName]: data
                }));
            } catch (error) {
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

    // Configuración de estilos predeterminados y sobrescritura con `styleConfig`
    const {
        formClass = "max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg",
        inputClass = "w-full p-3 border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out",
        buttonClass = "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none transition duration-300",
        errorClass = "text-red-500 text-sm mt-1",
    } = styleConfig || {};

    return (
        <form onSubmit={onSubmit} className={`${formClass} sm:p-6 md:p-8`}>
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
                                className={`${inputClass} ${errors[field.realName] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 hover:bg-blue-50`}
                            >
                                <option value="">Seleccione una opción</option>
                                {getSelectOptions(field).map(option => (
                                    <option key={option._id} value={option._id}>
                                        {option.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors[field.realName] && (
                                <p className={errorClass}>{errors[field.realName]}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <input
                                type={field.type}
                                name={field.realName}
                                value={formData[field.realName]}
                                onChange={handleChange}
                                className={`${inputClass} ${errors[field.realName] ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 hover:bg-blue-50`}
                                placeholder={`Ingresa el ${field.label.toLowerCase()}`}
                            />
                            {errors[field.realName] && (
                                <p className={errorClass}>{errors[field.realName]}</p>
                            )}
                        </>
                    )}
                </div>
            ))}
            <button 
                type="submit" 
                className={`${buttonClass} sm:py-2 sm:px-4 md:py-3 md:px-6`}
            >
                {submitButtonText || 'Enviar'}
            </button>
        </form>
    );
};

export default FormularioDinamico;
