import express from "express";
import { v4 as uuidv4 } from "uuid";
import productsData from "../productsData.json" assert { type: "json" };
const { products } = productsData;
const cartRouter = express.Router();
const carts = [];

cartRouter.post("/", (req, res) => {
  const id = uuidv4();
  const cart = { id, products };
  carts.push(cart);
  res.send(200).json(cart);
});

cartRouter.get("/:id", (req, res) => {
  const cartSeleted = carts.find((cart) => cart.id == req.params.id);
  res.json(cartSeleted);
});

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cart = carts.find((cart) => cart.id === req.params.cid);
  if (!cart) {
    return res.status(404).send("Carrito no encontrado");
  }

  const product = cart.products.find(
    (product) => product.product === req.params.pid
  );
  if (product) {
    product.quantity += 1;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }

  res.status(200).json(cart);
});

export { cartRouter };
