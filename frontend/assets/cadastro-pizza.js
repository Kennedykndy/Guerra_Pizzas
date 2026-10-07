const API_URL = "/api/pizzas";

const form = document.getElementById("pizza-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const preco = Number(document.getElementById("preco").value);
  const categoria = document.getElementById("categoria").value.trim();
  const disponivel = Number(document.getElementById("disponivel").value);

  if (!nome || !categoria || !preco) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        descricao,
        preco,
        categoria,
        disponivel,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível cadastrar a pizza.");
    }

    alert("Pizza cadastrada com sucesso!");

    form.reset();

    console.log("Pizza cadastrada:", data);
  } catch (error) {
    console.error("Erro ao cadastrar pizza:", error);
    alert("Erro ao cadastrar a pizza.");
  }
});
