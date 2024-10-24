import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CartService {

  static async addProductToCart(userId: number, productId: number, quantity: number) {
    console.log(`Adding product ${productId} for user ${userId} with quantity ${quantity}`);
    const existingItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });
  
    if (existingItem) {
      console.log(`Updating existing item with ID ${existingItem.id}, new quantity: ${existingItem.quantity + quantity}`);
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }
  
    console.log(`Creating new cart item for user ${userId}`);
    return await prisma.cartItem.create({
      data: { userId, productId, quantity },
    });
  }
  
  
 
  static async getUserCart(userId: number) {
    console.log("Fetching cart for userId:", userId);
    return await prisma.cartItem.findMany({
      where: {
        userId: userId
      },
      include: {
        product: true,
      },
    });
  }

  static async updateCartItemQuantity(itemId: number, quantity: number) {
    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }


  static async removeCartItem(itemId: number) {
    console.log("Removing cart item with ID:", itemId);
    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }  
}
