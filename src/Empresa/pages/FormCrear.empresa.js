import React from 'react';
import FormularioDinamico from '../../shared/components/Formulario.shared';
import useApiFunctions from '../../Hoook/ApiFunc';

const CrearEmpresa = () => {
    const fields = [
        { label: 'Nombre', realName: 'nombre', type: 'text', apiEndpoint: null }
    ];
    
    const { crearTodo, obtenerTodo } = useApiFunctions();  
    
    const handleSubmit = async (formData) => {
        try {
            const response = await crearTodo('crearEmpresa', null, formData);
            console.log('Respuesta', response);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Crear nueva empresa</h1>
            <FormularioDinamico 
                fields={fields} 
                handleSubmit={handleSubmit} 
                obtenerTodo={obtenerTodo} 
            />
        </div>
    );
};

export default CrearEmpresa;
