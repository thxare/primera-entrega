import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default viewsRouter;
