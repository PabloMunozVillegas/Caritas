import React from 'react';
import FormularioDinamico from '../../shared/components/Formulario.shared';
import useApiFunctions from '../../Hoook/ApiFunc';

const CrearSucursal = () => {
    const fields = [
        { label: 'Nombre', realName: 'nombre' , type: 'text', apiEndpoint: null },
        { label: 'Empresa', realName: 'empresa' , type: 'select', apiEndpoint: 'listarEmpresa' }
    ];
    
    const { crearTodo, obtenerTodo } = useApiFunctions();  // Add obtenerTodo here

    const handleSubmit = async (formData) => {
        const response = await crearTodo('crearSucursal', null, formData);
        console.log('Respuesta', response);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Crear nueva empresa</h1>
            {/* Pass obtenerTodo as a prop */}
            <FormularioDinamico fields={fields} handleSubmit={handleSubmit} obtenerTodo={obtenerTodo} />
        </div>
    );
};

export default CrearSucursal;
