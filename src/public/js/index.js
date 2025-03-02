const socket = io();

// Capturar conexión exitosa
socket.on("connect", () => {
  console.log("🔗 Conectado al servidor de WebSocket");
});

function renderProducts(products) {
  console.log("📦 Productos recibidos:", products);
  const list = document.getElementById("productList");
  list.innerHTML = ""; // Limpiar el contenedor antes de actualizarlo

  products.forEach((product) => {
    console.log("📦 Dibujando producto:", product);
    list.innerHTML += `
      <div class="card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="card-content">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p><strong>Precio:</strong> $${product.price}</p>
          <p><strong>Stock:</strong> ${product.stock}</p>
          <button onclick="deleteProduct(${product.id})">🗑 Eliminar</button>
        </div>
      </div>
    `;
  });
}

// Capturar productos actualizados desde WebSocket
socket.on("products", (products) => {
  console.log("📦 Productos recibidos vía WebSocket:", products);
  renderProducts(products);
});

// Enviar nuevo producto al servidor
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    price: Number(document.getElementById("price").value), // Convertir a número
    stock: Number(document.getElementById("stock").value), // Convertir a número
    category: document.getElementById("category").value,
    thumbnail: document.getElementById("thumbnail").value,
  };

  console.log("🚀 Enviando producto:", product);
  socket.emit("new-product", product);

  // Limpiar formulario después de enviar
  e.target.reset();
});

// Enviar solicitud para eliminar un producto
function deleteProduct(id) {
  console.log(`🗑 Eliminando producto con ID: ${id}`);
  socket.emit("delete-product", id);
}

// Manejo de errores
socket.on("error", (msg) => {
  alert(msg.error);
});
