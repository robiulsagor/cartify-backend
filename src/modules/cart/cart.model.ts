import mongoose, { Schema, Document } from "mongoose"

interface ICartItem {
    productId: mongoose.Types.ObjectId,
    vendorId: mongoose.Types.ObjectId,
    quantity: number,
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId,
    items: ICartItem[]
}

const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            vendorId: {
                type: Schema.Types.ObjectId,
                ref: "Vendor",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ]
},
    {
        timestamps: true
    })


export default mongoose.model<ICart>("Cart", cartSchema)