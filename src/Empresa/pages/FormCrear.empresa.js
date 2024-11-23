import React from 'react';
import FormularioDinamico from '../../shared/components/Formulario.shared';
import useApiFunctions from '../../Hoook/ApiFunc';
import { Toaster, toast } from 'react-hot-toast';

const CrearEmpresa = () => {
    const fields = [
        { label: 'Nombre', realName: 'nombre', type: 'text', apiEndpoint: null }
    ];

    const { crearTodo, obtenerTodo } = useApiFunctions();

    const handleSubmit = async (formData) => {
        try {
            const response = await crearTodo('crearEmpresa', null, formData);
            if (response.status === 201) {
                toast.success('Empresa creada exitosamente');
            } else {
                console.error('Error al crear empresa:', response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Configuración de estilos personalizados
    const customStyles = {
       
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">CREAR UNA NUEVA EMPRESA</h1>
            <FormularioDinamico 
                fields={fields} 
                handleSubmit={handleSubmit} 
                obtenerTodo={obtenerTodo} 
                styleConfig={customStyles} 
                submitButtonText="Guardar Empresa"
            />
            <Toaster />
        </div>
    );
};

export default CrearEmpresa;
