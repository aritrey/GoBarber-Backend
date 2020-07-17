import { getRepository } from "typeorm";
import User from "../models/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new AppError("incorrect email/password combination.", 401);
        }

        // user.password is encrypted password from Db
        // password is the password the user sends
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new AppError("incorrect email/password combination.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        //1. argument:permissions the user has/name/email (!!never password)
        //2. argument: key (you could make one here: https://www.md5online.org/)
        //3. argument: configurations
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
