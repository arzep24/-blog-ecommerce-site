const API_URL = '/api/auth';

export const RegisterService = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar el usuario.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en RegisterService:', error);
        throw error;
    }
}

export const LoginService = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al iniciar sesión.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en LoginService:', error);
        throw error;
    }
}