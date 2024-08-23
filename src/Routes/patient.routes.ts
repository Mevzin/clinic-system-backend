import { authMiddleware } from '../middleware/authMiddleware';
import { PatientController } from '../Controllers/patientController';
import { Router } from 'express'

const patientRoutes = Router();

const patientController = new PatientController()

patientRoutes.post('/createPatient', authMiddleware, patientController.createPatient)
patientRoutes.get('/getPatientsByDoctorId/:doctorId', authMiddleware, patientController.getPatientsByDoctorId)
patientRoutes.patch('/updatePatient/:patientId', authMiddleware, patientController.updatePatient)
patientRoutes.delete('/deletePatient/:patientId', authMiddleware, patientController.deletePatient)

export { patientRoutes }