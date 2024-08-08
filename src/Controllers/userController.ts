import { Request, Response } from 'express'
import User from '../Models/User';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const validUser = await User.findOne({ email: email })
            if (validUser) return res.status(401).json({ message: "The email is already being used!" })
            const salt = Number(process.env.SALT)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            return res.status(201).json({ message: "User registered successfully!" });
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(404).json({ message: "Invalidated credentials!" })

            const user = await User.findOne({ email: email })
            if (!user) return res.status(404).json({ message: "Invalid email or password!" })

            const match = await bcrypt.compare(password, user.password)
            if (!match) return res.status(404).json({ message: "Invalid password!" })

            const token = sign({}, String(process.env.PRIVATE_KEY_JWT), {
                subject: user.id,
                expiresIn: "1d"
            });

            const tokenReturn = {
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            };

            return res.status(200).json({ message: tokenReturn })
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}