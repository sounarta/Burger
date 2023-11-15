import mongoose from "mongoose";


let isConnected:boolean = false



export async function ConnectToDatabase() {

  mongoose.set('strictQuery',true)



  if(!process.env.MONGODB_URL) return console.log('MONGODB URL is Missing')

  if(isConnected) return console.log('MongoDB already Connected')


  try {
        
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'Burger'
        })

        isConnected = true

        console.log('MongoDb Connected')


  } catch (error) {
    console.error(error)
  throw error
    
  }

    
}