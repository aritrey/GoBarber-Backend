import User from "../models/User";
import { getRepository } from "typeorm";
import {hash} from "bcryptjs"

interface Request{
    name:string,
    email:string,
    password:string,
}

export default class CreateUserService{
   public async execute({name,email,password}:Request):Promise<User>{
       const usersRepository=getRepository(User)//get repository gibt schon die grundlegenden funktionen für db, wie get,create,update an
       const checkUserExists =await usersRepository.findOne({
           where:{email:email}
       })
       if(checkUserExists){throw new Error("Email address already exists.")}
       const hashedPasswort=await hash(password,8)
        const user =usersRepository.create({name,email,password:hashedPasswort})
       await usersRepository.save(user)
       return user
    }
}