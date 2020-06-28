import {Router} from "express";
import AuthenticateUserService from "../service/AuthenticateUserService"


 const sessionRouter=Router();


 //hier: localhost:3333/appointments/
 sessionRouter.post("/", async  (req,res) => {
    try{
        const {email, password}=req.body
        const authenticateUser=new AuthenticateUserService()
        const {user,token}=await authenticateUser.execute({email, password})
delete user.password
        return res.json({user,token})
    }catch(e){

    return res.status(400).json({"error":e.message})
}})

 export default sessionRouter