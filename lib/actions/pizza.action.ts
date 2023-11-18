'use server'

import Pizza from "@/database/pizza.mode"
import { ConnectToDatabase } from "../mongoose"
import { CreateMenuParams, EditMenuParams, GetMenuItemByIdParams } from "./shared.type"
import {revalidatePath} from 'next/cache'


export async function createMenu(params:CreateMenuParams) {

  try {
          await ConnectToDatabase()
         

          const{title,description,price,image,author,path} = params


          await Pizza.create({
          title,
          description,
          price,
          image,
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
           
            const{menuItemId,title,description,price,image,path} = params
           
          const menuItemUpdate =  await Pizza.findById(menuItemId)
          
          if(!menuItemUpdate ){
            throw new Error('menuItemUpdate  not Found')
           }
          menuItemUpdate.title = title
          menuItemUpdate.description = description
          menuItemUpdate.price = price
          menuItemUpdate.image= image  
          
          
  await menuItemUpdate.save()

            revalidatePath(path)
    } catch (error) {
      console.log(error)
      throw error
    }
      }

  

