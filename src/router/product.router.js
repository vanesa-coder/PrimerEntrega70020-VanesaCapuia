import { Router } from "express";
import productManage from "../managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/product.dao.js";


const router = Router();

// router.get("/products", async(req, res) => {
//     const products = await productManage.getProducts();

//     res.send(products);
// });

router.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit; // <-- /products ? limite = x
    const allProducts = await productDao.getAll();
    console.log(limit)
    if (!limit) {

      res.send(allProducts);

    } else {
      res.send(allProducts.slice(0, limit));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});




router.get("/products/:pid", async(req, res) => {
    try{
    const { pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
   
});

router.put("/products/:pid", async(req, res)=>{
    const { pid } = req.params;
    const body = req.body;
    const product = await productDao.update(pid, body);

    res.send(product);
});


router.post("/products", checkProductData, async (req, res) => {
    try {
      const body = req.body;
      
      const product = await productDao.create(body);
  
      res.status(201).json({ status: "ok", product }); //status 201 significa que se ha creado todo bien
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
  });


router.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productDao.deleteOne(pid);
   
    if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" });
    
    await productManage.deleteProduct(pid);

    res.status(200).json({ status: "ok", msg: `Producto con el ID ${pid} eliminado con éxito` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});


export default router;