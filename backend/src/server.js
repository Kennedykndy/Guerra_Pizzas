import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import config from "./core/config.js";
import { testDatabaseConnection } from "./core/database.js";
import { errorMiddleware } from "./core/errorMiddleware.js";
import menuRoutes from "./modules/menu/menuRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, "../../frontend");

app.use(express.json());

/*
  Arquivos estáticos do frontend
*/
app.use(express.static(frontendPath));

/*
  Testa a conexão com o banco
*/
testDatabaseConnection();

/*
  Rota principal da API
*/
app.get("/api", (request, response) => {
  response.json({
    message: "API Guerra Pizzas funcionando!",

    rotas: {
      listarPizzas: "GET /api/pizzas",
      buscarPizzaPorId: "GET /api/pizzas/:id",
      adicionarPizza: "POST /api/pizzas",
      alterarPizza: "PUT /api/pizzas/:id",
      removerPizza: "DELETE /api/pizzas/:id",
    },
  });
});

/*
  Rotas do módulo Menu/Pizzas
*/
app.use("/api/pizzas", menuRoutes);

/*
  Página principal do frontend
*/
app.get("/", (request, response) => {
  response.sendFile(path.join(frontendPath, "index.html"));
});

/*
  Middleware de tratamento de erros
*/
app.use(errorMiddleware);

/*
  Inicialização do servidor
*/
app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
  console.log(`Frontend: http://localhost:${config.port}`);
  console.log(`API: http://localhost:${config.port}/api`);
});
