import express from "express";

import config from "./core/config.js";
import { testDatabaseConnection } from "./core/database.js";
import { errorMiddleware } from "./core/errorMiddleware.js";
import menuRoutes from "./modules/menu/menuRoutes.js";

const app = express();

app.use(express.json());

// Testa a conexão com o banco
testDatabaseConnection();

/*
  Rota principal da API
  Exibe as rotas disponíveis.
*/
app.get("/", (request, response) => {
  response.json({
    message: "API Guerra Pizzas funcionando!",

    rotas: {
      listarPizzas: "GET http://localhost:3000/api/pizzas",
      buscarPizzaPorId: "GET http://localhost:3000/api/pizzas/:id",
      adicionarPizza: "POST http://localhost:3000/api/pizzas",
      alterarPizza: "PUT http://localhost:3000/api/pizzas/:id",
      removerPizza: "DELETE http://localhost:3000/api/pizzas/:id",
    },
  });
});

/*
  Rotas do módulo Menu/Pizzas
*/
app.use("/api/pizzas", menuRoutes);

/*
  Middleware de tratamento de erros
*/
app.use(errorMiddleware);

/*
  Inicialização do servidor
*/
app.listen(config.port, () => {
  console.log(`Servidor rodando na porta ${config.port}`);
  console.log(`API: http://localhost:${config.port}/`);
});
