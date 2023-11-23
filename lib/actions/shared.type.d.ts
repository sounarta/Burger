import { IUser } from "@/database/user.model";



export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  }

  export interface UpdateUserParams{
    clerkId:string;
   updateData: Partial<IUser>;
    path:string;
  }

  export interface DeleteUserParams{
    clerkId:string
  }

  export interface GetUserByIdParams{
    userId:string
  }

  export interface CreateCategoryParams{
    name:string;
    author:string;
    path:string
  }

  export interface EditCategoryParams {
    categoryId:string;
    name:string;
    path:string
  }

  export interface CreateMenuParams{
    title:string;
    description:string;
    price:number;
    path:string;
    author:string;
    image:string | null
    addsize: { name: string; price: number }[];
    extraIngredients: { name: string; price: number }[];
    category:string
  }

  export interface GetMenuItemByIdParams {
    menuItemId:string
  }

  export interface EditMenuParams{
    menuItemId:string;
    title:string;
    description:string;
    price:number;
    path:string;
    image?:string | null
    addsize: { name: string; price: number }[];
     extraIngredients: { name: string; price: number }[];
  category:string
    
  }

  export interface RemoveCategoryParams{
    id:string;
    path:string
  }


  export interface RemoveMenuItemParams{
    menuId:string | null;
    path:string
  }
 