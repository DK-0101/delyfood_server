import bcrypt from 'bcryptjs';
import prisma from '../../config/db';
import { User } from '@prisma/client';


export class UserService {

    static async createUser(data: Omit<User, 'id'>): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        return user;
    }

    static async validateUser(email: string, password: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }

        return null;
    }
}
