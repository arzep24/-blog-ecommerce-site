import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    // Verifica si el token JWT está presente en los encabezados de la solicitud.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere un token.' });
    }
     // El formato es "Bearer TOKEN". Nos quedamos solo con el token.
    const token = authHeader.split(' ')[1];

    // 2. Verificar el token
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Adjuntar el payload al request para que las siguientes funciones lo usen    
        req.user = decodedPayload;
        // 4. Continuar al siguiente paso
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}

export const isAdmin = (req, res, next) => {
    // La información del usuario ya fue añadida a req.user por el middleware anterior
    // Verifica si el usuario tiene el rol de administrador
    if (req.user && req.user.role === 'admin') {
        // Si es admin, continuar
        next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
}