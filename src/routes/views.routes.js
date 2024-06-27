import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

viewsRouter.get("/productos", async (req, res) => {
  res.render("home");
});

export default viewsRouter;
