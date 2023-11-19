'use server'

import Pizza from "@/database/pizza.mode"
import { ConnectToDatabase } from "../mongoose"
import { CreateMenuParams, EditMenuParams, GetMenuItemByIdParams, RemoveMenuItemParams } from "./shared.type"
import {revalidatePath} from 'next/cache'


export async function createMenu(params:CreateMenuParams) {

  try {
          await ConnectToDatabase()
         

          const{title,description,price,image,author,addsize,extraIngredients,path} = params


          await Pizza.create({
          title,
          description,
          price,
          image,
          addsize,
          extraIngredients,
          author
          
 
          })


          revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
    }

export async function getMenuItems(params:any) {

    try {
            await ConnectToDatabase()
           
          const menuItems =  await Pizza.find({})
  
        return {menuItems}
    } catch (error) {
      console.log(error)
      throw error
    }
      
  }
  export async function  getMenuItemById(params:GetMenuItemByIdParams) {

    try {
            await ConnectToDatabase()
            const {menuItemId} = params
           
          const menuItem =  await Pizza.findById(menuItemId)

          return menuItem
  
      
    } catch (error) {
      console.log(error)
      throw error
    }
      
  }
  export async function editMenu(params:EditMenuParams) {

    try {
            await ConnectToDatabase()
           
            const{menuItemId,title,description,price,image,addsize,extraIngredients,path} = params
           
          const menuItemUpdate =  await Pizza.findById(menuItemId)
          
          if(!menuItemUpdate ){
            throw new Error('menuItemUpdate  not Found')
           }
          menuItemUpdate.title = title
          menuItemUpdate.description = description
          menuItemUpdate.price = price
          menuItemUpdate.image= image  
             // Update addsize array
    menuItemUpdate.addsize = addsize.map((size) => ({
      name: size.name,
      price: size.price,
    }));

    // Update extraIngredients array
    menuItemUpdate.extraIngredients = extraIngredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    }));
          
  await menuItemUpdate.save()

            revalidatePath(path)
    } catch (error) {
      console.log(error)
      throw error
    }
      }

      export async function    removeMenuItem(params:RemoveMenuItemParams) {

        try {
                await ConnectToDatabase()
                const {menuId,path} = params
               
              await Pizza.deleteOne({_id:menuId})
      
          revalidatePath(path)
        } catch (error) {
          console.log(error)
          throw error
        }
          
      }

     