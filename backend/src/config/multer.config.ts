import { diskStorage } from 'multer';
import { extname, join } from 'path';

const storage = diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = join(__dirname, '../../public/uploads'); // Adjust the path as necessary
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  },
});

export const multerOptions = {
  storage: storage,
};
