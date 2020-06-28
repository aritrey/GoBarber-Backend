import {Router} from "express";

import { parseISO  } from "date-fns";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";



//soll eig nur andere repositorys (services rufen und antwort von inen zurück geben)
//->der chef, er lässt andere für sich arbeiten und gibt selbst die resultate ab

 const appointmentsRouter=Router();

appointmentsRouter.use(ensureAuthenticated)

 appointmentsRouter.get("/", async (req,res) => {
     console.log(req.user)
     const appointmentRepo= getCustomRepository(AppointmentsRepository)
    const appointments= await appointmentRepo.find()
    return res.json(appointments)
 })


 //hier: localhost:3333/appointments/
appointmentsRouter.post("/", async  (req,res) => {
    try{
    const {provider_id,date:datea}=req.body;
    const parsedaDate=parseISO(datea)
    const createAppointment=new CreateAppointmentService()
const appointment=await createAppointment.execute({date:parsedaDate,provider_id})
        return res.json(appointment)
}catch(e){
    console.log(e)
    return res.status(400).json({"error":e.message})
}})

 export default appointmentsRouter