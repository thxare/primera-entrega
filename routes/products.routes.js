import express from "express";
const productRouter = express.Router();
import { ProductManager } from "../controllers/product-manager.js";
const productManager = new ProductManager();

productRouter.get("/", (req, res) => {
  res.status(200).json(productManager.getProducts());
});

productRouter.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  } = req.body;

  try {
    productManager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    res.status(200).send("Producto creado correctamente");
  } catch (err) {
    res.status(400).send("Ha habido un problema");
    console.log(err);
  }
});

productRouter.get("/:pid", (req, res) => {
  try {
    const pid = req.params.pid;
    const productById = productManager.getProductById(pid);
    res.status(200).json(productById);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error");
  }
});

productRouter.put("/:pid", (req, res) => {
  const productId = req.params.pid;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  try {
    productManager.updateProductById(
      productId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    res.status(200).json("Producto actualizado");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha habido un error");
  }
});

productRouter.delete("/:pid", (req, res) => {
  try {
    productManager.deleteProductById(req.params.pid);
    res.status(200).send("Producto eliminado correctamente");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error al eliminar");
  }
});

export { productRouter };
