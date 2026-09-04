import { Router } from "express";

import {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
} from "./menuController.js";

const router = Router();

// GET /api/pizzas
router.get("/", listar);

// GET /api/pizzas/:id
router.get("/:id", buscarPorId);

// POST /api/pizzas
router.post("/", criar);

// PUT /api/pizzas/:id
router.put("/:id", atualizar);

// DELETE /api/pizzas/:id
router.delete("/:id", excluir);

export default router;
