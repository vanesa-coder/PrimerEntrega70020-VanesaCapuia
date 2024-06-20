import express from "express";
import productRouter from "./ruter/product.router.js";
import cartRouter from "./ruter/cart.router.js";
// import { title } from "process";
// import { pid } from "process";

const PORT = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

app.use("/api", productRouter );
app.use("/api", cartRouter);



  

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
