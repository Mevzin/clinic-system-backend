import mongoose, { Document, Schema } from 'mongoose';

interface ISchedule extends Document {
    date: Date;
    consultId: string;
    patientId: string;
    doctorId: string;
    hasConfirm: boolean;
    createdAt: Date;
}

const ScheduleSchema: Schema = new Schema(
    {
        date: { type: String, required: true, unique: true },
        consultId: { type: String, default: "" },
        patientId: { type: Schema.Types.ObjectId, required: true },
        doctorId: { type: Schema.Types.ObjectId, required: true },
        hasConfirm: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;