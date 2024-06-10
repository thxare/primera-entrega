import express from "express";
const cartRouter = express.Router();

cartRouter.get("/api/carts", (req, res) => {
  res.send("Carro");
});

export { cartRouter };
