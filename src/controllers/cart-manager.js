import { promises as fs } from "fs";
export class CartManager {
  static lastId = 0;
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async loadCarts() {
    try {
      const resp = await fs.readFile(this.path, "utf-8");
      const arrCarts = JSON.parse(resp);
      return arrCarts;
    } catch (err) {
      console.error("Error reading file from disk:", err);
      throw err;
    }
  }
  async updateUid() {
    const arrCarts = await this.loadCarts();
    if (arrCarts.length > 0) {
      CartManager.lastId = arrCarts.reduce((max, cart) =>
        cart.id > max ? cart.id : max
      );
    }
  }

  async saveCarts(arrCarts) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(arrCarts, null, 2), "utf8");
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  }

  async addNewCart(productos = []) {
    const arrCarts = await this.loadCarts();
    const nuevoCarro = {
      id: ++CartManager.lastId,
      productos,
    };
    arrCarts.push(nuevoCarro);
    await this.saveCarts();
  }

  async addCart(idCart, idProduct) {
    const arrCarts = await this.loadCarts();
    const cart = arrCarts.find((cart) => cart.id == idCart);

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

    await this.saveCarts();
  }

  async getCarts() {
    try {
      const arrCarts = await this.loadCarts();
      return arrCarts;
    } catch (err) {
      console.log("Ha habido un error ", err);
      throw err;
    }
  }

  async getCartById(id) {
    try {
      const arrCarts = await this.loadCarts();
      const cart = arrCarts.find((cart) => cart.id === parseInt(id));
      return cart;
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }

  async deleteCartById(id) {
    const arrCarts = await this.loadCarts();
    const index = arrCarts.findIndex((cart) => cart.id === parseInt(id));
    if (index === -1) {
      throw new Error("Carro no encontrado");
    }
    arrCarts.splice(index, 1);
    await this.saveCarts();
  }
}
