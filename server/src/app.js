import express from 'express';
import productRoutes from './routes/productRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js'
import cors from 'cors'

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', productRoutes)
app.use('/api/analytics', analyticsRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;