import { Router } from "express";

import { parseISO } from "date-fns";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (req, res) => {
    const appointmentRepo = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepo.find();
    return res.json(appointments);
});

appointmentsRouter.post("/", async (req, res) => {
    const { provider_id, date: datea } = req.body;
    const parsedaDate = parseISO(datea);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
        date: parsedaDate,
        provider_id,
    });
    return res.json(appointment);
});

export default appointmentsRouter;
