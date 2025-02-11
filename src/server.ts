import express, { Application } from "express";
import ProductDataRouter from "./routes/product.data.router"; // Importa as rotas

const app: Application = express();  // Tipando a variável `app` corretamente

// Use o middleware para o Express entender o corpo JSON
app.use(express.json());

// Registra as rotas
app.use('/api/', ProductDataRouter);  // Aqui que você usa o Router importado

const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
