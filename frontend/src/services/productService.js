const API_URL = '/api/products';

export const getAllProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los productos.');
        }

        const result = await response.json();
        return result.products;
    } catch (error) {
        console.error('Error en getAllProducts:', error);
        throw error;
    }
}