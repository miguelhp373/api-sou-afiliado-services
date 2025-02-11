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

      // Acessando o user do request (caso você queira usar isso para logging ou auditoria)
      // Neste caso, a informação sobre o usuário não é extraída do token, já que estamos usando a API Key.
      const user = request.user;
      console.log(user); // Aqui você pode adicionar lógica adicional, caso queira registrar ou auditar

      // Consultando os dados do produto com a URL fornecida
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
