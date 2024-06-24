const socket = io();

socket.on("productos", (data) => {
  renderProductos(data);
});

const renderProductos = (data) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  data.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `<p>${product.id}</p>
    <p>${product.title}</p>
    <p>${product.price}</p>
    `;
    contenedorProductos.appendChild(card);
  });
};
