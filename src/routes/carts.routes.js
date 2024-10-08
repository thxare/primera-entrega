import express from "express";
const cartRouter = express.Router();
import { CartManager } from "../dao/db/cart-manager-db.js";
const cartManager = new CartManager();

cartRouter.post("/", async (req, res) => {
  const newCart = await cartManager.addNewCart();
  console.log("Se ha creado un nuevo carro");
  res.status(200).json(newCart);
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
    await cartManager.addProductToCart(
      req.params.cid,
      req.params.pid,
      req.params.quantity
    );
    res.status(200).send("Se ha agregado un carro correctamente");
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    await cartManager.deleteAllProducts(req.params.cid);
    res.status(200).send("Productos eliminados");
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    await cartManager.deleteProductToCart(req.params.cid, req.params.pid);
    res.status(200).send("Producto eliminado correctamente")
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

cartRouter.put("/:cid", async (req, res) => {
  const updateCart = req.body;
  try {
    await cartManager.updateCartById(req.params.cid, updateCart);
    res.status(200).send("Carro actualizado");
  } catch (err) {
    res.status(400).send("Ha ocurrido un error");
  }
});

export { cartRouter };
