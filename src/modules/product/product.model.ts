import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    vendorId: mongoose.Types.ObjectId;
    description?: string;
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
        required: true
    },
    description: {
        type: String,
        required: false
    },
},
{    timestamps: true
});


export default mongoose.model<IProduct>("Product", productSchema);