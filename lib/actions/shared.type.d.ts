import { Iuser } from "@/database/user.model";

export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  }

  export interface UpdateUserParams{
    clerkId:string;
    updateData:Partial<Iuser>
    path:string
  }

  export interface DeleteUserParams{
    clerkId:string
  }