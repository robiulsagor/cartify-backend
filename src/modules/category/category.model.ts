import mongoose, {Schema, Document} from "mongoose"

export interface ICategory extends Document {
    name: string;
    parent?: mongoose.Types.ObjectId;
    isDeleted: boolean;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    parent:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model<ICategory>("Category", categorySchema)