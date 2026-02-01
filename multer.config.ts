import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
            const uniqueName = `${Date.now()}${extname(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
};
