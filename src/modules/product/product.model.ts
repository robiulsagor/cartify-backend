import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    vendorId: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    description?: string;
    isDeleted: boolean;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
        index: true
    },
    description: {
        type: String,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });


export default mongoose.model<IProduct>("Product", productSchema);