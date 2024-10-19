import express, { Application, Request, Response } from 'express';
import cors from 'cors';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', productsRoute);
app.use('/api/orders', OrderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

//global route
app.all('*', (req: Request, res: Response) => {
  const id = req.params;
  res.send(`Sorry man ${id[0]} route is not available`);
});

export default app;