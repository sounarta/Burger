'use server'

import Category from "@/database/category.model"
import { ConnectToDatabase } from "../mongoose"
import { CreateCategoryParams, EditCategoryParams, RemoveCategoryParams } from "./shared.type"
import { revalidatePath } from "next/cache";


export async function createCategory(params:CreateCategoryParams) {

    try {
            await ConnectToDatabase()

              const {name,author,path} = params 


              await Category.create({
                name,
                author

              })

        revalidatePath(path)

    } catch (error) {
        console.log(error)
        throw error
        
    }
    
}


export async function getCategories(params:any) {

    try {
            ConnectToDatabase()

         const categories = await Category.find({})

       return {categories}

    } catch (error) {
        console.log(error)
        throw error
        
    }
    
}

export async function editCategory(params:EditCategoryParams) {

    try {
          await   ConnectToDatabase()
                  const {categoryId,name,path} = params

          const category =  await Category.findById(categoryId)
          if (!category) {
            // Handle the case where the category is not found
            throw new Error("Category not found");
          }
          category.name = name

          await category.save()

revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
        
    }
    
}



export async function removeCategory(params:RemoveCategoryParams) {

    try {
          await   ConnectToDatabase()
                  const {id,path} = params

         await Category.deleteOne({_id:id})

revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
        
    }
    
}

