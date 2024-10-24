import { Request, Response } from 'express';
import { CartService } from './cart.service';

export class CartController {


static async addToCart(req: Request, res: Response) {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (isNaN(Number(userId)) || isNaN(Number(productId))) {
      return res.status(400).json({ error: 'userId e productId devem ser números válidos.' });
    }

    const cartItem = await CartService.addProductToCart(Number(userId), Number(productId), quantity || 1);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho.' });
  }
}


  static async getUserCart(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      console.log("Fetching cart for userId:", userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'userId deve ser um número válido.' });
      }

      const cartItems = await CartService.getUserCart(userId);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os itens do carrinho.' });
    }
  }
  

  static async updateCartItem(req: Request, res: Response) {
    try {
      const { itemId, quantity } = req.body;
      const updatedItem = await CartService.updateCartItemQuantity(itemId, quantity);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a quantidade do item.' });
    }
  }


  static async removeCartItem(req: Request, res: Response) {
    try {
        const itemId = Number(req.params.itemId); // Aqui captura corretamente o itemId da URL
        if (isNaN(itemId)) {
            return res.status(400).json({ error: 'itemId deve ser um número válido.' });
        }
        await CartService.removeCartItem(itemId);
        res.status(200).json({ message: 'Item removido do carrinho com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover o item do carrinho.' });
    }
  }
}
