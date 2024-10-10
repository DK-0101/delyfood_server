import { Router } from 'express';
import { CartController } from './cart.controller';

const router = Router();


router.post('/add', CartController.addProduct);
router.delete('/remove', CartController.removeProduct);

export default router;
