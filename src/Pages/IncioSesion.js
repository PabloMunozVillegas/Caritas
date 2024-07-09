import React, { useState } from 'react';

function InicioSesion() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
    });

    const fields = [
        { id: 'nombre', label: 'Nombre', type: 'text' },
        { id: 'apellido', label: 'Apellido', type: 'text' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <div>
            <h1>Inicio de Sesión</h1>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.id}>
                        <label htmlFor={field.id}>{field.label}:</label>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formData[field.id]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default InicioSesion;
