import { model, models, Document, Schema } from "mongoose";

export interface ICategory extends Document {
   name:string;
   author:Schema.Types.ObjectId
}

const CategorySchema = new Schema({

    name:{type:String,required:true},
    author:{type:Schema.Types.ObjectId,ref:'User'}


});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
