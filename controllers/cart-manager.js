import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CartManager {
  static ultId = 0;
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
    const maxId = this.carts.reduce(
      (max, cart) => (cart.id > max ? cart.id : max),
      0
    );
    CartManager.ultId = maxId;
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
  addNewCart(productos = {}) {
    const nuevoCarro = {
      id: ++CartManager.ultId,
      productos,
    };
  }

  addCart(idCart, idProduct, quantity) {
    const cart = this.carts.find((cart) => cart.id == idCart);
    const nuevoCarro = {
      idProduct,
      quantity,
    };
    cart.push(nuevoCarro);
    this.saveCarts();
  }
  getCarts() {
    return this.carts;
  }
  getCartById(id) {
    const cart = this.carts.find((cart = cart.id === parseInt(id)));
  }
}
