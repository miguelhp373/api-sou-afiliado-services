import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.JWT_SECRET; // A chave secreta da sua API

// Middleware para validar a API Key
export const validateApiKey = (req: any, res: any, next: any) => {
  const apiKey = req.headers['x-api-key']; // Verifica a chave da API no cabeçalho

  // Se a chave não for fornecida
  if (!apiKey) {
    return res.status(400).json({ message: 'API Key não fornecida' });
  }

  // Se a chave fornecida não for válida
  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'API Key inválida' });
  }

  // Chave válida, continue para a próxima função (a rota)
  next();
};
