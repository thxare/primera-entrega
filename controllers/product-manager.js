import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ProductManager {
  static ultId = 0;
  constructor() {
    this.filePath = path.join(__dirname, "../productos.json");
    this.loadProducts();
  }
  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      this.products = JSON.parse(data);
    } catch (err) {
      console.error("Error reading file from disk:", err);
      this.products = [];
    }
  }
  updateUid() {
    const maxId = this.products.reduce(
      (max, product) => (product.id > max ? product.id : max),
      0
    );
    ProductManager.ultId = maxId;
  }

  saveProducts() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.products, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  }

  addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails
  ) {
    const nuevoProducto = {
      id: ++ProductManager.ultId,
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
      title === undefined ||
      description === undefined ||
      code === undefined ||
      price === undefined ||
      stock === undefined ||
      category === undefined ||
      status === undefined
    ) {
      throw Error("Todos los campos son obligatios");
    }

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof code !== "string" ||
      typeof price !== "number" ||
      typeof status !== "boolean" ||
      typeof stock !== "number" ||
      typeof category !== "string"
    ) {
      throw Error("Producto no cumple con el tipo de dato requerido");
    }
    this.products.push(nuevoProducto);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProductById(
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    const product = this.products.find((product) => product.id === parseInt(id));
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.status = status ?? product.status;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    product.thumbnails = thumbnails ?? product.thumbnails;
    this.saveProducts();
  }

  deleteProductById(id) {
    const index = this.products.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products.splice(index, 1);
    this.saveProducts();
  }
}
