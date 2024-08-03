import { Router } from "express";
import { ProductManager } from "../dao/db/product-manager-db.js";
import { CartManager } from "../dao/db/cart-manager-db.js";

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

viewsRouter.get("/productos", async (req, res) => {
  const { page = 1, limit = 10, sort = "asc" } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { price: sort === "asc" ? 1 : -1 },
  };
  try {
    const productos = await productManager.getProducts({}, options);
    res.render("home", { productos: productos.docs, ...productos });
  } catch (error) {
    console.error("Error al mostrar los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
viewsRouter.get("/carts/:cid", async (req, res) => {
  const cartID = req.params.cid;

  try {
    const cart = await cartManager.getCartById(cartID);

    if (!cart) {
      console.log("No existe el carrito");
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productsInCart = cart.products.map((item) => ({
      product: item.product.toObject(),
      quantity: item.quantity,
    }));

    res.render("carts", { productos: productsInCart });
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default viewsRouter;
