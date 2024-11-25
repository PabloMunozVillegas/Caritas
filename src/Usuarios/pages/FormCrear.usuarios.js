import React from 'react';
import FormularioDinamico from '../../shared/components/Formulario.shared';
import useApiFunctions from '../../Hoook/ApiFunc';

const CrearUsuarios = () => {
    const fields = [
        { label: 'NOMBRE', realName: 'nombres', type: 'text', apiEndpoint: null }, // Cambiado de 'nombre' a 'nombres'
        { label: 'APELLIDO', realName: 'apellidos', type: 'text', apiEndpoint: null },
        { label: 'USUARIO', realName: 'user', type: 'text', apiEndpoint: null },
        { label: 'CONTRASEÑA', realName: 'password', type: 'password', apiEndpoint: null }, // Cambiado type a password
        { label: 'EMPRESA', realName: 'sucursal', type: 'select', apiEndpoint: 'listarSucursal' }, // Cambiado de 'empresa' a 'sucursal'
        { 
            label: 'ROL', 
            realName: 'rol', 
            type: 'select', 
            apiEndpoint: null,
            options: [
                { _id: 'Usuario', nombre: 'Usuario' },
                { _id: 'Administrador', nombre: 'Administrador' }
            ]
        }
    ];
    
    const { crearTodo, obtenerTodo } = useApiFunctions();

    const handleSubmit = async (formData) => {
        try {
            // Asegurarse de que todos los campos requeridos estén presentes
            const userData = {
                nombres: formData.nombres,
                apellidos: formData.apellidos,
                user: formData.user,
                password: formData.password,
                sucursal: formData.sucursal, // Debe ser un MongoDB ID válido
                rol: formData.rol
            };

            const response = await crearTodo('crearUsuario', null, userData);
            console.log('Usuario creado exitosamente:', response);
            // Aquí puedes agregar una notificación de éxito o redirección
        } catch (error) {
            console.error('Error al crear usuario:', error);
            // Aquí puedes agregar una notificación de error
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Crear nuevo usuario</h1>
            <FormularioDinamico fields={fields} handleSubmit={handleSubmit} obtenerTodo={obtenerTodo} />
        </div>
    );
};

export default CrearUsuarios;