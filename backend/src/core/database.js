import Database from "better-sqlite3";

import config from "./config.js";

const db = new Database(config.database.database);

db.pragma("foreign_keys = ON");

export function testDatabaseConnection() {
  try {
    db.prepare("SELECT 1").get();

    console.log("SQLite conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao SQLite:", error.message);
    throw error;
  }
}

export default db;
