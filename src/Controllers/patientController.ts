import { Request, Response, NextFunction } from 'express'
import Patient from '../Models/Patient';
import User from '../Models/User';

export class PatientController {

    async createPatient(req: Request, res: Response) {
        try {
            const { name, email, age, anamnesisId, active, doctorId } = req.body;
            const validPatient = await Patient.findOne({ email: email })
            if (validPatient) return res.status(401).json({ message: "The email is already being used!" })
            const newPatient = new Patient({
                name,
                email,
                age,
                anamnesisId,
                active,
                doctorId
            })
            await newPatient.save()
            return res.status(200).json({ message: "User registered successfully!" })
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}