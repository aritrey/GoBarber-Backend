import multer from "multer";
import path from "path";
import crypto from "crypto";

//the folder where we will store the images (_dirname/../../tmp)
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const randomNumber = crypto.randomBytes(10).toString("hex"); //for unique name; better: user-id and timestamp
            const fileName = `${randomNumber}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
};
