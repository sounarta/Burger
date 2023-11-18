import { model, models, Document, Schema } from 'mongoose';

const extraSchemaprice = new Schema({
    name: String,
    price: Number,
});

export interface IPizza extends Document {
    title: string;
    description: string;
    author: Schema.Types.ObjectId;
    price: number;
    image: string;
    addsize: {
        name: string;
        price: number;
    }[];
    extraIngredients: {
        name: string;
        price: number;
    }[];
    createdAt: Date;
}


const PizzaSchema = new Schema({

    title: {type: String,required: true},
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
    addsize: {
        type: [extraSchemaprice],
    },
    extraIngredients: {
        type: [extraSchemaprice],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Pizza = models.Pizza || model('Pizza', PizzaSchema);

export default Pizza
