import { getRepository} from "typeorm";
import User from "../models/User";
import { compare } from "bcryptjs";
import { sign,verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

interface Request{
    email:string,
    password:string
}

interface Response{
    user:User,
    token:string
}

export default class AuthenticateUserService{
    public async execute({email, password}:Request):Promise<Response>{
        const userRepository =getRepository(User)

        const user=await userRepository.findOne({where:{email}})
        if(!user){
            throw new AppError("incorrect email/password combination.",401)
        }

// user.password -encrypted password from Db
// password - the password the user send
        const  passwordMatched = await compare(password, user.password)
        if(!passwordMatched){
            throw new AppError("incorrect email/password combination.",401)
        }


        const {secret,expiresIn}=authConfig.jwt
        //1. argument:permission von user oder name (eher nicht email und ganz sicher nicht password)
        //2. argument: Schlüssel (hier könnte man gut schlössel machen: https://www.md5online.org/)
         //3. argument: configurationen
        const token=sign({},secret,{
            subject: user.id, //id von user
            expiresIn:expiresIn, //man bleibt 1 Tag eingelogt
        })

        return {
            user,
            token
        }
    }
}