

'use server'

import User from "@/database/user.model"
import { ConnectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.type"
import Pizza from "@/database/pizza.mode"
import { revalidatePath } from "next/cache"


export async function getUserById(params:any) {

     
    try {

        ConnectToDatabase()

   
        
    } catch (error) {
        console.log(error)
        throw error
        
    }


    
}
export async function createUser(DataUser:CreateUserParams) {

     
    try {

        ConnectToDatabase()
       
         const user = await User.create(DataUser)

        return user

    } catch (error) {
        console.log(error)
        throw error
        
    }


    
}
export async function updateUser(params:UpdateUserParams) {

     
    try {

        ConnectToDatabase()

        const {clerkId,updateData,path} = params
  
        await User.findByIdAndUpdate({clerkId},updateData,{new:true})

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
        
    }


    
}
export async function deleteUser(params:DeleteUserParams) {

     
    try {

        ConnectToDatabase()

        const {clerkId} = params

        
      const user = await User.findOneAndDelete({clerkId})
    
      if(!user){
        throw new Error('User not Found')
      }

        await Pizza.deleteMany({author:user._id})



        const deleteUser = await User.findByIdAndDelete({_id:user._id})

     return deleteUser
        
    } catch (error) {
        console.log(error)
        throw error
        
    }


    
}