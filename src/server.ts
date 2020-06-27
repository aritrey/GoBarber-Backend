import express, { request } from "express"
import routes from "./routes"
import "reflect-metadata"
import AppointmentsRepository from "./repository/AppointmentsRepository"

import "./database"

const app=express()
app.use(express.json())

app.use(routes)

app.listen(3333,()=>{
    console.log(    "   server start on port 3333")
})

