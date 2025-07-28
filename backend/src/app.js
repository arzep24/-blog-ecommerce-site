import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './api/routes/auth.routes.js';
import productsRoutes from './api/routes/products.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

function initializeApp() {
    console.log('Aplicación inicializada');
    app.listen(PORT, () => {console.log(`Servidor escuchando en http://localhost:${PORT}`);});
    
}
export {initializeApp};