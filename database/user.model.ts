import { model, models, Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  roles:string[],
  phone?: string;
  streetaddress?: string;
  postalcode?: string;
  city?: string;
  country?: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String },
  roles: {type:[String],default:['user']},
  phone: { type: String },
  streetaddress: { type: String },
  postalcode: { type: String },
  city: { type: String },
  country: { type: String },
})

const User = models.User || model("User", UserSchema);
export default User
