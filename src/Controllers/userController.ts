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

    async updateUser(req: Request, res: Response) {
        const { name, password, photoUrl } = req.body;
        const { userId } = req.params;
        if (userId.length != 24) return res.status(400).json({ message: "Invalid user ID!" })

        try {
            const user = await User.findById({ _id: userId })
            if (!user) return res.status(404).json({ message: "User not found!" })

            if (password) {
                const salt = Number(process.env.SALT)
                const hashedPassword = await bcrypt.hash(password, salt)

                user.password = hashedPassword;
            }

            user.name = name || user.name;
            user.photoUrl = photoUrl || user.photoUrl;

            await user.save();
            return res.status(200).json({ message: "User updated successfully!" });
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

            const token = sign({
                user: user._id,
            }, String(process.env.PRIVATE_KEY_JWT), {
                expiresIn: "1d"
            });

            return res.status(200).json({
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}