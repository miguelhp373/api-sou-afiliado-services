// src/types/express.d.ts
declare global {
    namespace Express {
      interface Request {
        user?: any; // ou defina um tipo mais específico para o usuário
      }
    }
  }
  