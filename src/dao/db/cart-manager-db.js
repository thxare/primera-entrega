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

  async deleteCartById(cartId) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );

      if (!updatedCart) {
        throw new Error("Carrito no encontrado");
      }

      return updatedCart;
    } catch (err) {
      console.log("No se ha podido elimar lso products");
      throw err;
    }
  }

  async updateCartById(id, updateCart) {
    try {
      const cart = await CartModel.findByIdAndUpdate(id, updateCart);
      if (!cart) {
        console.log("No se encuentra el carrito para actualizar");
        return;
      } else {
        console.log("carrito acutalizado con exito");
        return cart;
      }
    } catch (err) {
      console.log("Ha habido un error al actualizar", err);
      throw err;
    }
  }

  async deleteProductToCart(idCart, idProduct) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        idCart,
        {
          $pull: {
            products: {
              product: idProduct,
            },
          },
        },
        { new: true }
      );
      if (!updatedCart) {
        throw new Error("Carrito no encontrado");
      }

      return updatedCart;
    } catch (err) {
      console.log(
        "Ha habido un error al eliminar el producto del carrito",
        err
      );
      throw err;
    }
  }
}
