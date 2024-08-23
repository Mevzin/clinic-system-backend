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
        if (doctorId.length != 24) return res.status(404).json({ message: "Invalid doctor id!" })

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

    async updatePatient(req: Request, res: Response) {
        const { patientId } = req.params;
        const { name, email, age, anamnesisId, active } = req.body;

        if (patientId.length != 24) return res.status(404).json({ message: "Invalid patient ID!" })

        try {
            const patient = await Patient.findOne({ _id: patientId })
            if (!patient) return res.status(404).json({ message: "Patient not found!" })

            patient.name = name || patient.name
            patient.email = email || patient.email
            patient.age = age || patient.age
            patient.anamnesisId = anamnesisId || patient.anamnesisId
            patient.active = active || patient.active

            await patient.save()
            return res.status(200).json({ message: "Patient updated successfully!" })
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }

    async deletePatient(req: Request, res: Response) {
        const { patientId } = req.params;
        if (patientId.length != 24) return res.status(404).json({ message: "Invalid patient ID!" })

        try {
            const patient = await Patient.findOneAndDelete({ _id: patientId })
            if (!patient) return res.status(404).json({ message: "Patient not found!" })

            return res.status(200).json({ message: "Patient deleted successfully" })
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}