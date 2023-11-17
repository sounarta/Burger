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