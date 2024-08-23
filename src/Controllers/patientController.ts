import { Request, Response, NextFunction } from 'express'
import Patient from '../Models/Patient';
import User from '../Models/User';

export class PatientController {

    async createPatient(req: Request, res: Response) {
        const { name, email, age, anamnesisId, active, doctorId } = req.body;
        if (!name || !email || !doctorId || !age) return res.status(401).json({ message: "Unauthorized" })
        if (doctorId.length < 24 || doctorId.length > 24) return res.status(404).json({ message: "Invalid doctor id!" })

        try {
            const doctor = await User.findOne({ _id: doctorId })
            if (!doctor) return res.status(404).json({ message: "Doctor not found!" })

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

    async getPatientsByDoctorId(req: Request, res: Response) {
        const { doctorId } = req.params;
        if (doctorId.length < 24 || doctorId.length > 24) return res.status(404).json({ message: "Invalid doctor id!" })

        try {
            const doctor = await User.findOne({ _id: doctorId })
            if (!doctor) return res.status(404).json({ message: "Doctor not found!" })

            const patients = await Patient.find({ doctorId: doctorId })
            return res.status(200).json(patients)
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}