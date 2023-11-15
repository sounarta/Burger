import { model,models,Document,Schema } from "mongoose";


export interface IUser extends Document{

clerkId :string ;
    name:string;
    username:string;
    email:string;
    password?:string;
    picture:string;
    bio?:string;
    location?:string;
    portfolioWebsite?:string;
    reputation?:number;
    pizzas:Schema.Types.ObjectId[];
    joinedAt:Date;

}

const UserSchema = new Schema({

    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true,unique:true },
    email: { type: String, required: true,unique:true },
    password: { type: String }, // Password is optional
    bio: { type: String },
    picture: { type: String, required: true },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputation: { type: Number,default:0 },
    pizzas:[{type:Schema.Types.ObjectId,ref:'Pizza'}],
    joinedAt: { type: Date, default: Date.now },
})


const User = models.User || model('User',UserSchema)

export default User