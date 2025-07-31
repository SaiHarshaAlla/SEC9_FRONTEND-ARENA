let cart = JSON.parse(localStorage.getItem("cart")) || {};

function updateQuantity(productId, change) {
  const qtySpan = document.getElementById(`qty-${productId}`);
  let current = parseInt(qtySpan.textContent);
  current = Math.max(0, current + change);
  qtySpan.textContent = current;
}

function addToCart(productId) {
  const qty = parseInt(document.getElementById(`qty-${productId}`).textContent);
  if (qty > 0) {
    cart[productId] = (cart[productId] || 0) + qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
  }
}

function buyNow(productId) {
  addToCart(productId);
  window.location = "checkout.html";
}

function updateCartCount() {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = totalItems;
}

function displayCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  for (const id in cart) {
    const qty = cart[id];
    const item = document.createElement("p");
    item.textContent = `Product ${id} - Quantity: ${qty}`;
    container.appendChild(item);
  }
}

updateCartCount();
displayCartItems();
