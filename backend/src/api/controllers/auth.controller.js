import jwt from 'jsonwebtoken';
import userModel from "../../models/user.model.js";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    try {
        const newUser = await userModel.create(username, email, password);
        if (!newUser) {
            return res.status(500).json({ message: "Error al crear el usuario." });
        }
        res.status(201).json({ message: "Usuario registrado exitosamente.", username: newUser.username });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ message: "Error al registrar el usuario." });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }
    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }  
        const isPasswordValid = await userModel.comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        // Generar token JWT
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role || 'user' // Asignar un rol por defecto si no se especifica
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || 'defaultsecretkey',
            { expiresIn: '1h' } // El token expirará en 1 hora
        );
        res.status(200).json({ token});
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error en el servidor"});
    }
}