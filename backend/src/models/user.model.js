import db from "../config/db.js";
import bcrypt, { compare } from "bcrypt";

const userModel = {
    async create(username, email, password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, role, created_at;
        `;
        const {rows} = await db.query(query, [username, email, hashedPassword]);
        return rows[0];
    },
    async findByEmail(email) {
        const query = `
            SELECT *
            FROM users
            WHERE email = $1;
        `;
        const {rows} = await db.query(query, [email]);
        return rows[0];
    },
    async findById(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = $1;
        `;
        const {rows} = await db.query(query, [id]);
        return rows[0] || null;
    },
    async comparePassword(plainTextPassword, hashedPassword) {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    },
}
export default userModel;