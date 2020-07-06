import { getRepository } from "typeorm";
import User from "../models/User";
import path from "path"
import uploadConfig from "../config/upload";
import fs from "fs"//node file system
import AppError from "../errors/AppError";

interface Request{
    user_id:string,
    avatarFilename:string
}


export default class UpdateUserAvatarService{
    public async execute({user_id,avatarFilename}:Request):Promise<User>{
            const userRepository=getRepository(User)
            const user=await userRepository.findOne(user_id)
            if(!user){
                throw new AppError("only authenticated user can change Avatar.",401)
            }
            if(user.avatar){
                const userAvatarFilePath=path.join(uploadConfig.directory, user.avatar)
                const userAvatarFileExists=await fs.promises.stat(userAvatarFilePath) //status of an arcivo 
                if(userAvatarFileExists){
                    await fs.promises.unlink(userAvatarFilePath)//löscht den alten file
                }
            
              
            }
            user.avatar=avatarFilename;
            await userRepository.save(user)
            delete user.password
            return user
    }
}