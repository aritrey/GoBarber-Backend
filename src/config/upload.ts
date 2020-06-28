import multer from "multer"
import path from "path"
import crypto from "crypto"

const tmpFolder=path.resolve(__dirname, "..","..","tmp")

export default {
    directory:tmpFolder,
    storage: multer.diskStorage({
    destination:tmpFolder,//immer wenn jetzt dingew mit multer upgeloaded werden kommen sie in den tmp ordner
    filename(request,file,callback){
        const randomNumber=crypto.randomBytes(10).toString("hex")//macht er um einen einzigartigen namen zu gewährleisten, aber wir könnten auch einfach id user nehmen
        const fileName=`${randomNumber}-${file.originalname}`//wäre viel klüger userId zu nehmen ode rnoch besser id+timestamp
        return callback(null, fileName)
    
    },
}),
}