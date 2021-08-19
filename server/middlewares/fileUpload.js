import multer from 'multer';

const FileUploadMiddleware = (app) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });

    return multer({ storage: storage });
}

export default FileUploadMiddleware;