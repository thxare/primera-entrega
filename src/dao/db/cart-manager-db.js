import CartModel from "../models/cart.model.js";

export class CartManager {
  async addNewCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (err) {
      console.log("Error al crear el carrito", err);
      throw err;
    }
  }

  async addProductToCart(idCart, idProduct, quantity = 1) {
    try {
      const cart = await this.getCartById(idCart);
      const productExist = cart.products.find(
        (item) => item.product.toString() === idProduct
      );
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({ product: idProduct, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (err) {
      console.log("Ha habido un error al guardar el producto", err);
      throw err;
    }
  }

  async getCarts() {
    try {
      const carts = await CartModel.findCarts();
      return carts;
    } catch (err) {
      console.log("Ha habido un error ", err);
      throw err;
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      return cart;
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }

  async deleteCartById(id) {
    try {
      const deleted = await CartModel.findByIdAndDelete(id);
      if (!deleted) {
        console.log("El carrito no se ha encontrado");
        return;
      } else {
        console.log("Producto eliminido con exito");
        return deleted;
      }
    } catch (err) {}
  }
}
