const flavors = [
  { id: 1, name: "Vanilla", price: 60, image: "https://via.placeholder.com/100?text=Vanilla" },
  { id: 2, name: "Chocolate", price: 70, image: "https://via.placeholder.com/100?text=Choco" },
  { id: 3, name: "Strawberry", price: 65, image: "https://via.placeholder.com/100?text=Strawberry" },
  { id: 4, name: "Mango", price: 75, image: "https://via.placeholder.com/100?text=Mango" }
];

const cart = {};
const flavorList = document.getElementById("flavor-list");
const orderItems = document.getElementById("order-items");
const totalDisplay = document.getElementById("total");

// Render flavors
flavors.forEach(flavor => {
  const div = document.createElement("div");
  div.className = "flavor";
  div.innerHTML = `
    <img src="${flavor.image}" alt="${flavor.name}"/>
    <h3>${flavor.name}</h3>
    <p>₹${flavor.price}</p>
    <button onclick="addToOrder(${flavor.id})">Add to Order</button>
  `;
  flavorList.appendChild(div);
});

function addToOrder(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const item = flavors.find(f => f.id === id);
    cart[id] = { ...item, qty: 1 };
  }
  renderOrder();
}

function renderOrder() {
  orderItems.innerHTML = "";
  let total = 0;
  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    orderItems.innerHTML += `
      <div>
        ${item.name} - ₹${item.price} x ${item.qty}
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  });
  totalDisplay.textContent = total;
}

function changeQty(id, delta) {
  if (cart[id]) {
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    renderOrder();
  }
}

function removeItem(id) {
  delete cart[id];
  renderOrder();
}
