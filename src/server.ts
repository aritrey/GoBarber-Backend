import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import routes from "./routes"
import "reflect-metadata"
import AppointmentsRepository from "./repository/AppointmentsRepository"

import "./database"
import uploadConfig from "./config/upload"
import AppError from "./errors/AppError"

const app=express()
app.use(express.json())
app.use("/files", express.static(uploadConfig.directory))//zeigt einfach file, also img an
//(e.g. http://localhost:3333/files/5703420d9fe9df084cc3-20180803_154823.jpg)
app.use(routes)

//wenn middleware für errors, dann muss es mindestens 2 parameter haben
app.use((err:Error, request:Request, response:Response,_:NextFunction)=>{
if(err instanceof AppError){
    return response.status(err.statusCode).json({
        status:"error",
        message:err.message
    })
}

console.log(err)
return response.status(500).json({
    status:"error",
    message:"internal server error"
})


})

app.listen(3333,()=>{
    console.log(    "   server start on port 3333")
})

