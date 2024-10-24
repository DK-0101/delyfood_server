import { Request, Response } from 'express';
import { ProductService } from './addproducts.service';

export class ProductController {
  static async addProduct(req: Request, res: Response) {
    try {
      const { title, description, category, price } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : '';


      const product = await ProductService.addProduct({
        image,
        title,
        description,
        category,
        price,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar o produto.' });
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.getProductById(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o produto.' });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.updateProduct(Number(req.params.id), req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      await ProductService.deleteProduct(Number(req.params.id));
      res.status(200).json({ message: 'Produto removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover o produto.' });
    }
  }
}
