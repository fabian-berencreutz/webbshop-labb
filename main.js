const cart = {};

const cartMenuBtn = document.getElementById("cart-menu-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountSpan = document.getElementById("cart-count");

if (cartMenuBtn && cartModal) {
  cartMenuBtn.addEventListener("click", () =>
    cartModal.classList.remove("hidden"),
  );
}

if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener("click", () =>
    cartModal.classList.add("hidden"),
  );
}

const productList = document.getElementById("productList");

const el = (tag, props = {}) =>
  Object.assign(document.createElement(tag), props);

const getProducts = async () => {
  try {
    const response = await fetch("./products.json");
    if (!response.ok) throw new Error("HTTP-fel: " + response.status);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Kunde inte hämta produkter:", error);
  }
};

const renderProducts = (products) => {
  if (!productList) return;
  productList.innerHTML = "";

  products.forEach((product) => {
    const article = el("article");
    const title = el("h3", { textContent: product.name });
    const image = el("img", { src: product.image, alt: product.imageAlt });
    const description = el("p", { textContent: product.description });
    const price = el("p", { textContent: `Pris: ${product.price} kr` });

    const buyBtn = el("button", { className: "buy-btn", textContent: "Köp" });
    buyBtn.addEventListener("click", () => {
      console.log(`Lägg i varukorg: ${product.name}`);
      alert(`Vara lagd i varukorg: ${product.name}`);
    });

    article.append(title, image, description, price, buyBtn);

    if (product.badge) {
      const badge = el("span", {
        className: "badge",
        textContent: product.badge,
      });
      if (product.badge.includes("Nyhet")) badge.classList.add("badge-new");
      else if (product.badge.includes("REA")) badge.classList.add("badge-sale");
      else if (product.badge.includes("Populär"))
        badge.classList.add("badge-popular");
      article.appendChild(badge);
    }

    productList.appendChild(article);
  });
};

if (productList) {
  getProducts();
}
