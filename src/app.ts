import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.routes";
import { orderRoutes } from "./modules/orders/order.routes";

const app = express();

//parsers
app.use(express.json());

app.use('/api/products', ProductRoutes);
app.use('/api', orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next.............................!");
});

export default app;
