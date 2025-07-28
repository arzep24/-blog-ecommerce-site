import React from 'react';

export function LoginForm({ onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Correo electrónico:
                <input type="email" name="email" placeholder="Email" required />
            </label>
            <br/>
            <label>
                Contraseña:
                <input type="password" name="password" placeholder="Password" required />
            </label>
            <br/>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
}