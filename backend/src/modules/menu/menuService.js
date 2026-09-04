import db from "../../core/database.js";

// Cria a tabela de pizzas caso ela ainda não exista
db.exec(`
  CREATE TABLE IF NOT EXISTS pizzas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    categoria TEXT NOT NULL,
    disponivel INTEGER NOT NULL DEFAULT 1
  )
`);

// Lista todas as pizzas
export function listarPizzas() {
  return db.prepare("SELECT * FROM pizzas ORDER BY id").all();
}

// Busca uma pizza pelo ID
export function buscarPizzaPorId(id) {
  return db.prepare("SELECT * FROM pizzas WHERE id = ?").get(id);
}

// Adiciona uma pizza
export function adicionarPizza({
  nome,
  descricao,
  preco,
  categoria,
  disponivel = 1,
}) {
  const resultado = db
    .prepare(
      `
      INSERT INTO pizzas (nome, descricao, preco, categoria, disponivel)
      VALUES (?, ?, ?, ?, ?)
    `,
    )
    .run(nome, descricao, preco, categoria, disponivel);

  return buscarPizzaPorId(resultado.lastInsertRowid);
}

// Altera uma pizza
export function alterarPizza(
  id,
  { nome, descricao, preco, categoria, disponivel },
) {
  const resultado = db
    .prepare(
      `
      UPDATE pizzas
      SET nome = ?,
          descricao = ?,
          preco = ?,
          categoria = ?,
          disponivel = ?
      WHERE id = ?
    `,
    )
    .run(nome, descricao, preco, categoria, disponivel, id);

  if (resultado.changes === 0) {
    return null;
  }

  return buscarPizzaPorId(id);
}

// Remove uma pizza
export function removerPizza(id) {
  const resultado = db.prepare("DELETE FROM pizzas WHERE id = ?").run(id);

  return resultado.changes > 0;
}
