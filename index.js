import { Server } from "socket.io";
import express from "express";
import { engine } from "express-handlebars";
import { cartRouter } from "./src/routes/carts.routes.js";
import { productRouter } from "./src/routes/products.routes.js";
import viewsRouter from "./src/routes/views.routes.js";

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
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

import { ProductManager } from "./src/controllers/product-manager.js";
const productManager = new ProductManager("./src/models/productos.json");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente conectado");

  socket.emit("productos", await productManager.getProducts());

  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProductById(id);
    io.sockets.emit("productos", await productManager.getProducts());
  });

  socket.on(
    "agregarProducto",
    async ({ title, description, code, price, status, stock, category }) => {
      await productManager.addProduct(
        title,
        description,
        code,
        price,
        status,
        stock,
        category
      );
      io.sockets.emit("productos", await productManager.getProducts());
    }
  );
});
