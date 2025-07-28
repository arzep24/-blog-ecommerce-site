import db from "../config/db.js";

const productModel = {
    async create(productData) {
        const { name, description, price, quantity_available, status, image_url, seller_id } = productData;
        const query = `
        INSERT INTO products (name, description, price, quantity_available, status, image_url, seller_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
        const values = [name, description, price, quantity_available, status, image_url, seller_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },
    async findAll() {
        const query = 'SELECT * FROM products WHERE statiss = $1 ORDER BY created_at DESC';
        const { rows } = await db.query(query, ['disponible']);
        return rows;
    },
    async findById(id) {
        const query = 'SELECT * FROM products WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0] || null;
    },
    async update(id, productData) {
        const { name, description, price, quantity_available, status, image_url } = productData;
        const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, quantity_available = $4, status = $5, image_url = $6
        WHERE id = $7
        RETURNING *;
        `;
        const values = [name, description, price, quantity_available, status, image_url, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }
};