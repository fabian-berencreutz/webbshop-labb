const cart = {};

const cartMenuBtn = document.getElementById('cart-menu-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');

if (cartMenuBtn && cartModal) {
  cartMenuBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
  });
}

if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
}

function updateCartUI() {
  if (!cartItemsContainer || !cartCountSpan) return;

  cartItemsContainer.innerHTML = '';
  let totalCount = 0;

  for (const [name, qty] of Object.entries(cart)) {
    totalCount += qty;
    const li = document.createElement('li');
    li.textContent = `${name}: ${qty} st`;
    cartItemsContainer.appendChild(li);
  }

  cartCountSpan.textContent = totalCount;
}

const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.name;
    const article = button.closest('article');
    const quantityInput = article ? article.querySelector('.quantity-input') : null;
    const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

    cart[productName] = (cart[productName] || 0) + quantity;
    updateCartUI();

    alert(`Vara lagd i varukorg: ${productName} (${quantity} st)`);
  });
});
