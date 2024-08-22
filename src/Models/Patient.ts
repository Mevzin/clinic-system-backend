import mongoose, { Document, Schema } from 'mongoose';

interface IPatient extends Document {
    name: string;
    email: string;
    age: string;
    anamnesisId: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PatientSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        anamnesisId: { type: String, default: "" },
        active: { type: Boolean, default: true },
        doctorId: { type: Schema.Types.ObjectId, required: true }
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model<IPatient>('Patient', PatientSchema);

export default Patient;