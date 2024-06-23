import express from "express";
import { engine } from "express-handlebars";
import { cartRouter } from "./src/routes/carts.routes.js";
import { productRouter } from "./src/routes/products.routes.js";
import router from "./src/routes/views.routes.js";

const app = express();
const PORT = 8081;

//Midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

import { ProductManager } from "./src/controllers/product-manager.js";
const productManager = new ProductManager("./models/producto.json");
