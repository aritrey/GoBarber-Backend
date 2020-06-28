import {Router} from "express";

import CreateUserService from "../service/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import uploadConfig from "../config/upload"
import multer from "multer"
import UpdateUserAvatarService from "../service/UpdateUserAvatarService";


 const usersRouter=Router();
const upload=multer(uploadConfig)

usersRouter.post("/", async  (req,res) => {
    try{
        const {name,email,password}=req.body
        const createUser=new CreateUserService()
        const user=await createUser.execute({name,email,password})
       delete user.password
    return res.json(user)
}catch(e){
    return res.status(400).json({"error":e.message})
}})


usersRouter.patch("/avatar",ensureAuthenticated, upload.single("avatar"),async  (req,res) => {
console.log(req.file)
try{
const updateUserAvatar= new UpdateUserAvatarService()


const user= await updateUserAvatar.execute({user_id:req.user.id,avatarFilename:req.file.filename})
    return res.json(user)
}catch(e){
    return res.status(400).json({"error":e.message})
}
})

 export default usersRouter