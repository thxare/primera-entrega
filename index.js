import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
