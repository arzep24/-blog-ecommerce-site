import React from 'react';

export function RegisterForm({ onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre de usuario:
                 <input type="text" name="username" placeholder="Username" required />
            </label>
            <br/>
            <label>Correo electrónico:
                <input type="email" name="email" placeholder="Email" required />
            </label>
            <br/>
            <label>
                Contraseña:
                <input type="password" name="password" placeholder="Password" required />
            </label>
            <br/>
            <button type="submit">Registrar</button>
        </form>
    );
}