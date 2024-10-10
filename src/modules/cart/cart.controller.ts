import { CartService } from './cart.service';
import { Request, Response } from 'express';


export class CartController {

    static async addProduct(req: Request, res: Response) {
        try {
            const { userId, productId, quantity } = req.body;
            const result = await CartService.addProduct(userId, productId, quantity);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar produto" });
        }
    }

    static async removeProduct(req: Request, res: Response) {
        try {
            const { userId, productId } = req.body;
            await CartService.removeProduct(userId, productId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro ao remover produto" })
        }
    }
}