let products = [];

let cart = [];

function addToCart(product) {
  const existingProduct = cart.find((item) => item.product.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }

  console.log("Varukorg:", cart);
  updateCartUI();
}

const cartMenuBtn = document.getElementById("cart-menu-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountSpan = document.getElementById("cart-count");

if (cartMenuBtn && cartModal) {
  cartMenuBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });
}

if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });
}

function updateCartUI() {
  if (!cartItemsContainer || !cartCountSpan) return;

  cartItemsContainer.innerHTML = "";

  let totalCount = 0;

  cart.forEach((item) => {
    totalCount += item.quantity;
    const itemTotal = item.product.price * item.quantity;

    const li = createElement(
      "li",
      `${item.product.name} x ${item.quantity} (${itemTotal} kr)`,
    );
    cartItemsContainer.appendChild(li);
  });

  cartCountSpan.textContent = totalCount;
}

const productList = document.getElementById("productList");

function createElement(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.className = className;
  return el;
}

const getProducts = async () => {
  try {
    const response = await fetch("./products.json");
    if (!response.ok) {
      throw new Error("HTTP-fel: " + response.status);
    }
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Kunde inte hämta produkter:", error);
  }
};

const renderProducts = (productsToRender) => {
  if (!productList) return;
  productList.innerHTML = "";

  productsToRender.forEach((product) => {
    const article = createElement("article", null, "product");
    const title = createElement("h3", product.name);
    const description = createElement("p", product.description);
    const price = createElement("p", `Pris: ${product.price} kr`);
    const image = createElement("img");
    image.src = product.image;
    image.alt = product.imageAlt;

    const buyBtn = createElement("button", "Köp", "buy-btn");
    buyBtn.addEventListener("click", () => {
      addToCart(product);
    });

    article.append(title, image, description, price, buyBtn);

    if (product.badge) {
      let badgeClass = "badge";
      if (product.badge.includes("Nyhet")) badgeClass += " badge-new";
      else if (product.badge.includes("REA")) badgeClass += " badge-sale";
      else if (product.badge.includes("Populär"))
        badgeClass += " badge-popular";

      const badge = createElement("span", product.badge, badgeClass);
      article.appendChild(badge);
    }

    productList.appendChild(article);
  });
};

if (productList) {
  getProducts();
}
