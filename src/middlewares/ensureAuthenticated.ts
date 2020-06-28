

import {Request,Response,NextFunction} from "express"
import { verify } from "jsonwebtoken"
import authConfig from "../config/auth"

interface TokenPayload{
    iat:number,
    exp:number,
    sub:string
}


export default function ensureAuthenticated(request:Request,response:Response, next:NextFunction):void{

    //weil authorization durch den header die info kommt({{ base_url  }}/appointments/Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTMzNDY1NTIsImV4cCI6MTU5MzQzMjk1Miwic3ViIjoiOGZmMjUyMTMtYjk5OC00MzE4LWE0NzItMDU2MDgyNzliZjI4In0.3XKawu5SgnpVbo7AVyigJMlEEZnLxfoGe2gYxdywysE)
    const authHeader=request.headers.authorization
if(!authHeader){
    throw new Error("JWT token is missing")
}

const [_,token]=authHeader.split(" ")
try{
const decoder=verify(token,authConfig.jwt.secret)
const { sub}=decoder as TokenPayload
request.user={id:sub}

}catch(e){
    throw new Error("invalid JWT token")
}


return next()

}