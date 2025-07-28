import db from "../../config/db.js"; 

export const getAllProducts = async (req, res) => {
    try {
        const query = 'SELECT * FROM products WHERE status = $1';
        const { rows } = await db.query(query, ['disponible']);

        res.status(200).json({
            message: 'Productos obtenidos exitosamente.',
            products: rows
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos." });
    }
}