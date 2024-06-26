import { promises as fs } from "fs";

export class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async loadProducts() {
    try {
      const resp = await fs.readFile(this.path, "utf-8");
      const arrProducts = JSON.parse(resp);
      return arrProducts;
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }

  async saveProducts(arrProducts) {
    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(arrProducts, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Error al guardar:", err);
      throw err;
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = []
  ) {
    const arrProducts = await this.loadProducts();
    price  = parseInt(price);
    stock = parseInt(stock);
    if (arrProducts.length > 0) {
      ProductManager.ultId = arrProducts.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        0
      );
    }

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
    if (arrProducts.some((item) => item.code === code)) {
      console.log("El código debe ser único");
      return;
    }

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
    arrProducts.push(nuevoProducto);
    await this.saveProducts(arrProducts);
  }

  async getProducts() {
    try {
      const arrProducts = await this.loadProducts();
      return arrProducts;
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }

  async getProductById(id) {
    try {
      const arrProducts = await this.loadProducts();
      const searchProduct = arrProducts.find(
        (product) => product.id === parseInt(id)
      );
      if (!searchProduct) {
        throw new Error("Producto no encontrado");
      } else {
        console.log("Producto Encontrado");
        return searchProduct;
      }
    } catch (err) {
      console.log("Ha ocurrido un error", err);
      throw err;
    }
  }

  async updateProductById(
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
    const arrProducts = await this.loadProducts();

    const product = arrProducts.find((product) => product.id === parseInt(id));
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
    await this.saveProducts();
  }

  async deleteProductById(id) {
    try {
      console.log("El id: " + id);
      const arrProducts = await this.loadProducts();
      const index = arrProducts.findIndex(
        (product) => product.id === parseInt(id)
      );
      if (index === -1) {
        throw new Error("Producto no encontrado");
      }
      arrProducts.splice(index, 1);
      await this.saveProducts();
    } catch (err) {
      console.log("Ha habido un error");
      throw err;
    }
  }
}
