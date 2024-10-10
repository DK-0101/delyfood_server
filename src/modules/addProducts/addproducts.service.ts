import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface ProductData {
  image: string;
  title: string;
  description: string;
  category: string;
  price: string;
}

export class ProductService {

  static async addProduct(data: ProductData) {
    return await prisma.addProduct.create({
      data: data
    });
  }

  
  static async getProducts() {
    return await prisma.addProduct.findMany();
  }


  static async getProductById(id: number) {
    return await prisma.addProduct.findUnique({
      where: { id: id }
    });
  }


  static async updateProduct(id: number, data: Partial<ProductData>) {
    return await prisma.addProduct.update({
      where: { id: id },
      data: data
    });
  }


  static async deleteProduct(id: number) {
    return await prisma.addProduct.delete({
      where: { id: id }
    });
  }
}