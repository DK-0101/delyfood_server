import { Request, Response } from 'express';
import { UserService } from './user.service';




export class UserController {
    
    static async register(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário' });
            console.log()
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await UserService.validateUser(email, password);
        
        if (user) {
            const { password, ...userWithoutPassword } = user
            res.status(200).json({ message: 'Login bem sucedido', user: userWithoutPassword });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
            console.log(user)
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao fazer logout' });
                }
                res.clearCookie('connect.sid'); // Limpa o cookie da sessão
                return res.status(200).json({ message: 'Logout bem sucedido' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer logout' });
            console.error(error);
        }
    }
    
}