import express from "express";
const productRouter = express.Router();
import { ProductManager } from "../controllers/product-manager.js";
const productManager = new ProductManager("./src/models/productos.json");

productRouter.get("/", async (req, res) => {
  res.status(200).json(await productManager.getProducts());
});

productRouter.post("/", async (req, res) => {
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
    await productManager.addProduct(
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

productRouter.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    console.log(pid);
    const productById = await productManager.getProductById(pid);
    res.status(200).json(productById);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error");
  }
});

productRouter.put("/:pid", async (req, res) => {
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
    await productManager.updateProductById(
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

productRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.pid);
    res.status(200).send("Producto eliminado correctamente");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error al eliminar");
  }
});

export { productRouter };
