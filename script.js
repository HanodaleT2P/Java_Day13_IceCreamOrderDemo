const book = [
  { id: 1, name: "Arkitek Pelukis Jalanan", price: 35, image: "arkitekjalanan.jpg" },
  { id: 2, name: "Alexander Adalah Zulkarnain", price: 150, image: "alexanderzulkarnain.jpg" },
  { id: 3, name: "Kids Book", price: 30, image: "kidsbook.jpg" },
  { id: 4, name: "Tamadun Mesir Purba", price: 80, image: "tamadunmesir.jpg" }
];

const cart = {};
const bookList = document.getElementById("book-list");
const orderItems = document.getElementById("order-items");
const totalDisplay = document.getElementById("total");

// Render books
book.forEach(book => {
  const div = document.createElement("div");
  div.className = "book";
  div.innerHTML = `
    <img src="${book.image}" alt="${book.name}"/>
    <h3>${book.name}</h3>
    <p>RM${book.price}</p>
    <button onclick="addToOrder(${book.id})">Add to Cart</button>
  `;
  bookList.appendChild(div);
});

function addToOrder(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const item = book.find(f => f.id === id);
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
        ${item.name} - RM${item.price} x ${item.qty}
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
