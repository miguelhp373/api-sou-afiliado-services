import { Router, Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { validateApiKey } from './middleware/authMiddleware'; // Importe o middleware

// Cria um router para gerenciar as rotas
const productRouter = Router();

// Middleware para lidar com as rotas
const productRoutesMiddleware = (app: Router) => {
  // Rota protegida com o middleware de validação de API Key
  app.post('/mercado-livre/product-data', validateApiKey, async (request: any, response: any) => {
    try {
      
      const { url }: { url: string } = request.body;

      if (!url) {
        return response.status(400).json({ error: "URL é obrigatória" });
      }

      const productData = await ProductService.getProductData(url);
      
      return response.status(200).json(productData);

    } catch (error: any) {
      return response.status(500).json({ error: error.message || "Erro ao processar requisição" });
    }
  });
};

// Aplica o middleware para registrar as rotas
productRoutesMiddleware(productRouter);

export default productRouter;
