import { model,models,Document,Schema } from "mongoose";


export interface Iuser extends Document{

    title:string;
    description:string;
    author:Schema.Types.ObjectId;
    price:number;
    image:string;
    createdAt:Date

}

const PizzaSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming there is a User model
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const Pizza= models.Pizza|| model('Pizza',PizzaSchema)

export default Pizza