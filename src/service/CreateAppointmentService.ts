import  Appointment from "../models/Appointment"
import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import {getCustomRepository} from "typeorm"


interface RequestDTO{
    provider_id:string
    date:Date

}

class CreateAppointmentService{
 

   public async execute({date,provider_id}:RequestDTO):Promise<Appointment>{
    const appointmentsRepository=getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date);//das gehört mit zu regra de negocio (was die app macht und nicht wie sie die daten braucht)
    const findSameDateAppointment= await appointmentsRepository.findByDate(appointmentDate)
    if( findSameDateAppointment){
        throw Error("This Appointment is already booked.")
    }
    const appointment=appointmentsRepository.create({provider_id,date:appointmentDate})
    await appointmentsRepository.save(appointment)    
    return appointment
   }
}

export default CreateAppointmentService