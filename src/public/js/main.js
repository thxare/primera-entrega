const socket = io();

socket.on("productos", (data) => {
  renderProductos(data);
});

const renderProductos = (data) => {
  const contenedorProductos = document.getElementById("productList");
  data.forEach((product) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = product.id;
    tr.appendChild(tdId);

    const tdTitle = document.createElement("td");
    tdTitle.textContent = product.title;
    tr.appendChild(tdTitle);

    const tdDescription = document.createElement("td");
    tdDescription.textContent = product.description;
    tr.appendChild(tdDescription);

    const tdCode = document.createElement("td");
    tdCode.textContent = product.code;
    tr.appendChild(tdCode);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = product.price;
    tr.appendChild(tdPrice);

    const tdStock = document.createElement("td");
    tdStock.textContent = product.stock;
    tr.appendChild(tdStock);

    const tdCategory = document.createElement("td");
    tdCategory.textContent = product.category;
    tr.appendChild(tdCategory);

    contenedorProductos.appendChild(tr);
  });

  const addProductButton = document.getElementById("addProduct");
  addProductButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked!");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  var modal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    backdrop: "static",
    keyboard: false,
  });

  document
    .getElementById("launchModalButton")
    .addEventListener("click", function () {
      modal.show();
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form.needs-validation");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const state = document.getElementById("cbx-12").checked;

    const productData = {
      title,
      description,
      code,
      price,
      stock,
      category,
      state,
    };
    console.log(productData);

    fetch("/api/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
