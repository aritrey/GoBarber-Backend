import Appointment from "../models/Appointment";

import {isEqual  }from "date-fns"
import {EntityRepository, Repository} from "typeorm"


@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment>{


 //für all und find appointment gibt es schon eine fertige methode con typerm

public async findByDate(date:Date):Promise<Appointment|null>{
    const findAppointment=await this.findOne({where:{date:date}})
    return findAppointment||null
}

}