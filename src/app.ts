import express from "express";
import cors from 'cors';
import session from 'express-session';
import userRoutes from './modules/user/user.routes';
import { cartRoutes } from "./modules/cart/cart.routes";
import bodyParser from 'body-parser';
import path from 'path';
import { productRoutes } from './modules/addProducts/addproducts.routes';


const app = express();

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));


const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', productRoutes);



export { app };
