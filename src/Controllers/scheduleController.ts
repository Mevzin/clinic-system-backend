import { Request, Response } from 'express'
import User from '../Models/User'
import Schedule from '../Models/Schedules'

export class ScheduleController {
    async create(req: Request, res: Response) {
        const { patientId, doctorId, date } = req.body

        try {
            const doctor = await User.findOne({ _id: doctorId })
            if (!doctor) return res.status(404).json({ message: "Doctor not found!" })

            const patient = await User.findOne({ _id: patientId })
            if (!patient) return res.status(404).json({ message: "Patient not found!" })

            const newSchedule = new Schedule({ patientId, doctorId, date })
            await newSchedule.save()

            return res.status(201).json({ message: "Schedule registered successfully!" });
        } catch (error: any) {
            console.error(error.message);
            return res.status(500).json({ message: "Internal server error!" })
        }
    }
}