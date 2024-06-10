import express from "express";
const app = express();
const PORT = 8080;
app.use(express.json());
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";

app.use("/", cartRouter);
app.use("/", productRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
