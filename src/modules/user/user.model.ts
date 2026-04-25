import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    role: "user" | "vendor" | "admin";
    status: "active" | "blocked" | "suspended";
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user","vendor","admin"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "blocked", "suspended"],
        default: "active"
    }
}, {
    timestamps: true,   
})

export default mongoose.model<IUser>("User", userSchema)