import express from "express";
const cartRouter = express.Router();
import { CartManager } from "../controllers/cart-manager.js";
const cartManager = new CartManager("./src/models/carrito.json");

cartRouter.post("/", async (req, res) => {
  await cartManager.addNewCart();
  res.status(200).send("Se ha agregado un nuevo carro");
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartById = await cartManager.getCartById(req.params.cid);
    res.status(200).json(cartById);
  } catch (err) {
    res.status(400).send("Error al ver el carro");
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    await cartManager.addCart(req.params.cid, parseInt(req.params.pid));
    res.status(200).send("Se ha agregado un carro correctamente");
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  await cartManager.deleteCartById(req.params.cid);
  res.status(200);
});

export { cartRouter };
