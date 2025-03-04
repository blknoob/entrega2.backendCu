const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    };

    socket.emit("new-product", newProduct);

    form.reset();
  });
});
