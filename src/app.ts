import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.routes";

const app = express();

//parsers
app.use(express.json());

app.use('/api', ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;
