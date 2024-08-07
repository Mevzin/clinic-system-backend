import { Request, Response } from 'express'
import User from '../Models/User';
import { hash } from 'bcrypt';
import { AppError } from '../Errors/AppError';

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const validUser = await User.findOne({ email: email })
            if (validUser) return res.status(401).json({ message: "O email já esta sendo utilizado!" })
            const salt = Number(process.env.SALT)
            const hashedPassword = await hash(password, salt)
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            return res.status(201).json({ message: "Usuario cadastrado com sucesso!" });
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }

    async login(req: Request, res: Response) {

        res.status(200).json({ message: 'register on' })
    }
}