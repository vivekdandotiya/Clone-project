const cartItemsDiv = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let itemsCount = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    itemsCount += item.qty;

    const div = document.createElement("div");
    div.className = "cart-card";

    div.innerHTML = `
      <img src="${item.image}">
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>₹ ${item.price}</p>

        <div class="qty-controls">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalItems.innerText = itemsCount;
  totalPrice.innerText = total.toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(index) {
  cart[index].qty++;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}