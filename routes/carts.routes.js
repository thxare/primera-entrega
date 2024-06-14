import express from "express";
const cartRouter = express.Router();
import { CartManager } from "../controllers/cart-manager.js";
const cartManager = new CartManager();

cartRouter.post("/", (req, res) => {
  cartManager.addNewCart();
  res.status(200).send("Se ha agregado un nuevo carro");
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
  try {
    cartManager.addCart(req.params.cid, parseInt(req.params.pid));
    res.status(200).send("Se ha agregado un carro correctamente");
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

cartRouter.delete("/:cid", (req, res) => {
  cartManager.deleteCartById(req.params.cid);
  res.status(200);
});

export { cartRouter };
