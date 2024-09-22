import { promises } from "dns";
import prisma from "../config/db";
import { User } from "@prisma/client";

export class UserService {
    static async createUser(data: Omit<User, 'id'>): Promise<User> {

        const user = await prisma.user.create({
            data : {
              name: data.name,
              email: data.email,
              password: data.password
            }
        })

        return user
    }
}
