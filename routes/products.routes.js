import express from "express";
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  const productos = new ProductManager();
  res.status(200).json(productos.getProducts());
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
  const producto = new ProductManager();
  try {
    producto.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category
    );
  } catch (err) {
    res.send(400).send("Ha habido un problema");
    console.log(err);
  }
  res.status(200).send("Producto creado correctamente");
});

productRouter.get("/:id", (req, res) => {
  const productManager = new ProductManager();
  try {
    const productById = productManager.getProductById(req.body.id);
    res.status(200).json(productById);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error");
  }
});

productRouter.put("/:id", (req, res) => {
  const {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const productManager = new ProductManager();
  try {
    productManager.updateProductById(
      id,
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

productRouter.delete("/:id", (req, res) => {
  const productManager = new ProductManager();
  try {
    productManager.deleteProductById(req.params.id);
    res.status(200).send("Producto eliminado correctamente");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Ha ocurrido un error al eliminar");
  }
});

export { productRouter };
