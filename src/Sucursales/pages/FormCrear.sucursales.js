import React from 'react';
import FormularioDinamico from '../../shared/components/Formulario.shared';
import useApiFunctions from '../../Hoook/ApiFunc';
import {Toaster, toast} from 'react-hot-toast';

const CrearSucursal = () => {
    const fields = [
        { label: 'Nombre', realName: 'nombre' , type: 'text', apiEndpoint: null },
        { label: 'Empresa', realName: 'empresa' , type: 'select', apiEndpoint: 'listarEmpresa' }
    ];
    
    const { crearTodo, obtenerTodo } = useApiFunctions();  // Add obtenerTodo here

    const handleSubmit = async (formData) => {
        try {
            const response = await crearTodo('crearSucursal', null, formData);
            if (response.status === 201) {
                toast.success('Sucursal creada exitosamente');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const customStyles = {

    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">CREAR NUEVA SUCURSAL</h1>
            <FormularioDinamico 
                fields={fields} 
                handleSubmit={handleSubmit} 
                obtenerTodo={obtenerTodo}  
                styleConfig={customStyles} 
                submitButtonText="Guardar Sucursal" 
            />
            <Toaster />
        </div>
    );
};

export default CrearSucursal;
