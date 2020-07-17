import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: { email: email },
        });
        if (checkUserExists) {
            throw new AppError("Email address already exists.");
        }
        const hashedPasswort = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPasswort,
        });
        await usersRepository.save(user);
        return user;
    }
}