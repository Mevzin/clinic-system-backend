import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    photoUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        photoUrl: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;