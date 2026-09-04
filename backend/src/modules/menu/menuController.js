import {
  listarPizzas,
  buscarPizzaPorId,
  adicionarPizza,
  alterarPizza,
  removerPizza,
} from "./menuService.js";

// GET /api/pizzas
export function listar(req, res, next) {
  try {
    const pizzas = listarPizzas();

    res.status(200).json(pizzas);
  } catch (error) {
    next(error);
  }
}

// GET /api/pizzas/:id
export function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: true,
        message: "ID da pizza inválido.",
      });
    }

    const pizza = buscarPizzaPorId(id);

    if (!pizza) {
      return res.status(404).json({
        error: true,
        message: "Pizza não encontrada.",
      });
    }

    res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
}

// POST /api/pizzas
export function criar(req, res, next) {
  try {
    const { nome, descricao, preco, categoria, disponivel } = req.body;

    if (!nome || preco === undefined || !categoria) {
      return res.status(400).json({
        error: true,
        message: "Nome, preço e categoria são obrigatórios.",
      });
    }

    const pizza = adicionarPizza({
      nome,
      descricao,
      preco,
      categoria,
      disponivel,
    });

    res.status(201).json(pizza);
  } catch (error) {
    next(error);
  }
}

// PUT /api/pizzas/:id
export function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: true,
        message: "ID da pizza inválido.",
      });
    }

    const { nome, descricao, preco, categoria, disponivel } = req.body;

    if (!nome || preco === undefined || !categoria) {
      return res.status(400).json({
        error: true,
        message: "Nome, preço e categoria são obrigatórios.",
      });
    }

    const pizza = alterarPizza(id, {
      nome,
      descricao,
      preco,
      categoria,
      disponivel,
    });

    if (!pizza) {
      return res.status(404).json({
        error: true,
        message: "Pizza não encontrada.",
      });
    }

    res.status(200).json(pizza);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/pizzas/:id
export function excluir(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: true,
        message: "ID da pizza inválido.",
      });
    }

    const removida = removerPizza(id);

    if (!removida) {
      return res.status(404).json({
        error: true,
        message: "Pizza não encontrada.",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
