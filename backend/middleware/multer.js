import multer from "multer";
import path from "path";
import fs from "fs";

let storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        const uploadPath = path.join(process.cwd(), "public");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath)
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage})
export default upload;