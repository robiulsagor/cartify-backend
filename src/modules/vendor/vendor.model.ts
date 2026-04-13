import mongoose, {Schema, Document} from "mongoose";

export interface IVendor extends Document {
    userId: mongoose.Types.ObjectId;
    storeName: string;
    description?: string;
    status: 'pending' | 'approved' | 'rejected';
}

const vendorSchema = new Schema<IVendor>({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }

}, { timestamps: true });

export default mongoose.model<IVendor>('Vendor', vendorSchema);