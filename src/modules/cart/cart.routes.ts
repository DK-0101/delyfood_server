import { Router } from 'express';
import { CartController } from './cart.controller';

const cartRoutes = Router();

// Rotas do carrinho de compras
cartRoutes.post('/add', CartController.addToCart);
cartRoutes.get('/:userId', CartController.getUserCart); // Certifique-se que isso está correto
cartRoutes.put('/update', CartController.updateCartItem);
cartRoutes.delete('/remove/:itemId', CartController.removeCartItem);

export { cartRoutes };