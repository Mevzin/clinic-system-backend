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
        date: { type: String, required: true },
        consultId: { type: Schema.Types.ObjectId, default: null },
        patientId: { type: Schema.Types.ObjectId, required: true, ref: 'Patient' },
        doctorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        hasConfirm: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;