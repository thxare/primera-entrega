import ProductModel from "../models/product.model.js";

export class ProductManager {
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
    price = parseInt(price);
    stock = parseInt(stock);

    const productExist = await ProductModel.findOne({ code: code });

    if (productExist) {
      console.log("El codigo debe ser unico");
      return;
    }

    const nuevoProducto = new ProductModel({
      id: ++ProductManager.ultId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    await nuevoProducto.save();
  }

  async getProducts(filter = {}, options = {}) {
    try {
      const result = await ProductModel.paginate(filter, options);
      console.log(result)
      result.docs = result.docs.map((doc) => doc.toObject());
      return result;
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }

  async getProductById(id) {
    try {
      const searchProduct = await ProductModel.findById(id);
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

  async updateProductById(id, updateProduct) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, updateProduct);
      if (!product) {
        console.log("No se encuentra el producto para actualizar");
        return;
      } else {
        console.log("Producto acutalizado con exito");
        return product;
      }
    } catch (err) {
      console.log("Error al acutalizar", err);
      throw err;
    }
  }

  async deleteProductById(id) {
    try {
      const borrado = await ProductModel.findByIdAndDelete(id);
      if (!borrado) {
        console.log("No se encuentra el producto");
        return;
      } else {
        console.log("Producto borrado con exito");
        return borrado;
      }
    } catch (err) {
      console.log("Ha habido un error", err);
      throw err;
    }
  }
}
