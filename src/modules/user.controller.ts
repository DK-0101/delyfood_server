import { Request, Response } from "express"
import { UserService } from "./user.service"
import { User } from "@prisma/client"

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const userdata = req.body as Omit<User, 'id'>

            const user = await UserService.createUser(userdata)

            return res.json(user).status(201)
        } catch (error) {
            
        }
    }
}