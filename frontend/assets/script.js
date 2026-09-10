const API_URL = "/api/pizzas";

let cart = [];
let pizzas = [];

/*
  Busca as pizzas na API
*/
async function carregarPizzas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Não foi possível carregar as pizzas.");
    }

    pizzas = await response.json();

    console.log("Pizzas carregadas da API:", pizzas);

    exibirPizzas(pizzas);
  } catch (error) {
    console.error("Erro ao carregar pizzas:", error);

    const menuItems = document.getElementById("menu-items");

    if (menuItems) {
      menuItems.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        Não foi possível carregar o cardápio.
                        Verifique se o servidor está funcionando.
                    </div>
                </div>
            `;
    }
  }
}

/*
  Exibe as pizzas recebidas da API
*/
function exibirPizzas(pizzas) {
  const menuItems = document.getElementById("menu-items");

  if (!menuItems) {
    console.error("Elemento #menu-items não encontrado.");
    return;
  }

  menuItems.innerHTML = "";

  const pizzasDisponiveis = pizzas.filter(
    (pizza) => Number(pizza.disponivel) === 1,
  );

  if (pizzasDisponiveis.length === 0) {
    menuItems.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Nenhuma pizza disponível no momento.
                </div>
            </div>
        `;

    return;
  }

  pizzasDisponiveis.forEach((pizza) => {
    const col = document.createElement("div");

    col.className = "col-md-4";

    col.innerHTML = `
            <div class="card h-100 shadow-sm">

                <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
                    class="card-img-top"
                    alt="${escaparHTML(pizza.nome)}"
                >

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title fw-bold">
                        ${escaparHTML(pizza.nome)}
                    </h5>

                    <p class="card-text text-muted small">
                        ${escaparHTML(pizza.descricao || "Pizza artesanal")}
                    </p>

                    <div class="mt-auto d-flex justify-content-between align-items-center">

                        <span class="fs-5 fw-bold text-success">
                            ${formatarPreco(pizza.preco)}
                        </span>

                        <button
                            class="btn btn-outline-dark btn-sm"
                            onclick="adicionarPizzaAoCarrinho(${pizza.id})"
                        >
                            Adicionar
                        </button>

                    </div>
                </div>
            </div>
        `;

    menuItems.appendChild(col);
  });
}

/*
  Adiciona uma pizza da API ao carrinho
*/
function adicionarPizzaAoCarrinho(id) {
  const pizza = pizzas.find((pizza) => pizza.id === id);

  if (!pizza) {
    console.error("Pizza não encontrada:", id);
    return;
  }

  addToCart(pizza.id, pizza.nome, Number(pizza.preco));
}

/*
  Adiciona item ao carrinho
*/
function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  updateCartUI();
}

/*
  Remove item do carrinho
*/
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCartUI();
}

/*
  Atualiza a interface do carrinho
*/
function updateCartUI() {
  const cartItemsList = document.getElementById("cart-items");
  const cartBadge = document.getElementById("cart-badge");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsList || !cartBadge || !cartTotal) {
    return;
  }

  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
            <li class="list-group-item text-center text-muted">
                Seu carrinho está vazio.
            </li>
        `;

    cartBadge.innerText = "0";
    cartTotal.innerText = "R$ 0,00";

    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
            <div>
                <h6 class="my-0">
                    ${escaparHTML(item.name)}
                </h6>

                <small class="text-muted">
                    Qtd: ${item.quantity} x
                    ${formatarPreco(item.price)}
                </small>
            </div>

            <button
                class="btn btn-sm btn-outline-danger"
                onclick="removeFromCart(${item.id})"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

    cartItemsList.appendChild(li);
  });

  cartBadge.innerText = totalItems;

  cartTotal.innerText = formatarPreco(total);
}

/*
  Finaliza o pedido
*/
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Pedido realizado com sucesso! Obrigado pela preferência.");

  cart = [];

  updateCartUI();

  const offcanvasEl = document.getElementById("cartOffcanvas");

  if (offcanvasEl) {
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);

    if (offcanvas) {
      offcanvas.hide();
    }
  }
}

/*
  Formata valores monetários
*/
function formatarPreco(valor) {
  return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
}

/*
  Evita inserir HTML diretamente
*/
function escaparHTML(valor) {
  const div = document.createElement("div");

  div.textContent = valor ?? "";

  return div.innerHTML;
}

/*
  Inicialização
*/
document.addEventListener("DOMContentLoaded", () => {
  carregarPizzas();
  updateCartUI();
});
