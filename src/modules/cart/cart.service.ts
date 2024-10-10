import bcrypt from 'bcryptjs';
import prisma from '../../config/db';
import { User } from '@prisma/client';


export class CartService {

    static async addProduct(userId: number, productId: number, quantity: number) {
        return await prisma.newItems.upsert({
            where: { userId_productId: { userId, productId } },
            update: { quantity: { increment: quantity } },
            create: { userId, productId, quantity },
        });
    }

    static async removeProduct(userId: number, productId: number) {
        await prisma.newItems.delete({
            where: { userId_productId: { userId, productId } },
        });
    }
}