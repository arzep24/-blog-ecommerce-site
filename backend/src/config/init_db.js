
// Importamos solo la función 'query' y el 'pool' para poder cerrarlo
import db from './db.js';

const createTables = async () => {
  const queryText = `
-- ####################################################################
-- ##                  SCRIPT DE INICIALIZACIÓN DE BD                  ##
-- ####################################################################

-- ===== Tabla de Usuarios (La tabla central) =====
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    profile_picture_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===== Tabla de Posts (Para el contenido tipo post) =====
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===== Tabla de Productos (Para el marketplace) =====
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity_available INTEGER NOT NULL DEFAULT 1 CHECK (quantity_available >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'available',
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===== Tabla de Órdenes (Encabezado de una compra) =====
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending_payment',
    shipping_address TEXT,
    payment_intent_id VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===== Tabla de Artículos de la Orden (Detalle de una compra) =====
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- ===== Tabla de Seguidores (Relación muchos-a-muchos) =====
CREATE TABLE IF NOT EXISTS follows (
    follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- ===== Tabla de "Me Gusta" (Relación muchos-a-muchos) =====
CREATE TABLE IF NOT EXISTS likes (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- ===== Índices para mejorar el rendimiento de las búsquedas comunes =====
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
  `;

  try {
    console.log('Inicializando la base de datos...');
    await db.query(queryText);
    console.log('¡Tablas creadas exitosamente!');
  } catch (error) {
    console.error('Error al inicializar las tablas:', error);
  } finally {
    // Es crucial cerrar el pool aquí porque este script es de corta duración
    await db.end();
    console.log('Conexión del pool cerrado.');
  }
};

createTables();