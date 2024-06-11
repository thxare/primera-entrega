import express from "express";
import { v4 as uuidv4 } from "uuid";
import productsData from "../productsData.json" assert { type: "json" };
const { products } = productsData;

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.json(products);
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
  const id = uuidv4();
  const product = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  if (
    typeof title === "string" &&
    typeof description === "string" &&
    typeof code === "string" &&
    typeof price === "number" &&
    typeof status === "boolean" &&
    typeof stock === "number" &&
    typeof category === "string"
  ) {
    products.push(product);
    res.send("Producto creado correctamente");
  } else {
    res
      .status(400)
      .send("Todos los campos son obligatorios y deben tener el tipo adecuado");
  }
});

productRouter.get("/:id", (req, res) => {
  const productSeleted = products.find(
    (product) => product.id == req.params.id
  );
  if (productSeleted) {
    res.json(productSeleted);
  } else {
    res.status(400).send("Producto no existe");
  }
});

productRouter.put("/:id", (req, res) => {
  const productSelected = products.find(
    (product) => product.id == req.params.id
  );
  if (!productSelected) {
    return res.status(404).send("Producto no encontrado");
  }

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

  productSelected.title = title || productSelected.title;
  productSelected.description = description || productSelected.description;
  productSelected.code = code || productSelected.code;
  productSelected.price = price || productSelected.price;
  productSelected.status = status || productSelected.status;
  productSelected.stock = stock || productSelected.stock;
  productSelected.category = category || productSelected.category;
  productSelected.thumbnails = thumbnails || productSelected.thumbnails;
  res.json(productSelected);
});

productRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = products.length;
  const filteredProducts = products.filter((product) => product.id !== id);
  if (filteredProducts.length === originalLength) {
    return res.status(404).send("Producto no encontrado");
  }

  products.length = 0;
  products.push(...filteredProducts);
  res.status(200).json(products);
});

export { productRouter };
