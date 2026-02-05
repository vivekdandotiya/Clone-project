const productsDiv = document.getElementById("products");
const cartCount = document.getElementById("cart-count");

// Get cart from localStorage or create empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure all old items have qty (important fix)
cart = cart.map(item => ({
  ...item,
  qty: item.qty || 1
}));

updateCartCount();

// Fetch products from API
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => displayProducts(data))
  .catch(err => console.error(err));

function displayProducts(products) {
  productsDiv.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>₹ ${product.price}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector("button")
        .addEventListener("click", () => addToCart(product));

    productsDiv.appendChild(card);
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.innerText = totalQty;
}