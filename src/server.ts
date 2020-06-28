import express, { request } from "express"
import routes from "./routes"
import "reflect-metadata"
import AppointmentsRepository from "./repository/AppointmentsRepository"

import "./database"
import uploadConfig from "./config/upload"

const app=express()
app.use(express.json())
app.use("/files", express.static(uploadConfig.directory))//zeigt einfach file, also img an
//(e.g. http://localhost:3333/files/5703420d9fe9df084cc3-20180803_154823.jpg)
app.use(routes)

app.listen(3333,()=>{
    console.log(    "   server start on port 3333")
})

