import { Router } from "express";
import { getAllProducts} from "../controllers/products.controller.js"; // Pendientes getProductById, createProduct, updateProduct, deleteProduct 

const router = Router();
router.get("/", getAllProducts);

export default router;