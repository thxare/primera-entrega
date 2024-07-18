import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://thiareayleen:coderhouse@cluster0.agbjfpt.mongodb.net/ecommerse?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log("Hay error: ", error));

  