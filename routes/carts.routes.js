import express from "express";
const cartRouter = express.Router();
import { CartManager } from "../controllers/cart-manager.js";
const cartManager = new CartManager();

cartRouter.post("/", (req, res) => {
  cartManager.addCart(req.params.id, req.params.quantity);
  res.send(200).send("Se ha agregado un nuevo carro");
});

cartRouter.get("/:cid", (req, res) => {
  try {
    const cartById = cartManager.getCartById(cid);
    res.status(200).json(cartById);
  } catch (err) {
    res.status(400).send("Error al ver el carro");
  }
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
