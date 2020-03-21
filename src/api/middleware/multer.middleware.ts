import multer from "multer";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }

});