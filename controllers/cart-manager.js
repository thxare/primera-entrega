import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CartManager {
  static lastId = 0;
  constructor() {
    this.filePath = path.join(__dirname, "../carrito.json");
    this.loadCarts();
  }
  loadCarts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      this.carts = JSON.parse(data);
    } catch (err) {
      console.error("Error reading file from disk:", err);
      this.carts = [];
    }
  }
  updateUid() {
    if (this.carts.length > 0) {
      CartManager.lastId = this.carts.reduce((max, cart) =>
        cart.id > max ? cart.id : max
      );
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.carts, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  }
  addNewCart(productos = []) {
    const nuevoCarro = {
      id: ++CartManager.lastId,
      productos,
    };
    this.carts.push(nuevoCarro);
    this.saveCarts();
  }

  addCart(idCart, idProduct) {
    const cart = this.carts.find((cart) => cart.id == idCart);

    const product = cart.productos.find(
      (product) => product.idProduct == idProduct
    );
    if (product) {
      product.quantity = product.quantity + 1;
    } else {
      const newProduct = {
        idProduct,
        quantity: 1,
      };
      cart.productos.push(newProduct);
    }

    this.saveCarts();
  }
  getCarts() {
    return this.carts;
  }
  getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === parseInt(id));
    return cart;
  }
  deleteCartById(id) {
    const index = this.carts.findIndex((cart) => cart.id === parseInt(id));
    if (index === -1) {
      throw new Error("Carro no encontrado");
    }
    this.carts.splice(index, 1);
    this.saveCarts();
  }
}
