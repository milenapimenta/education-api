import {
  BadRequestException,
  FileValidator,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ImageMimeTypeValidator extends FileValidator {
  constructor() {
    super({
      fileType: /(image\/(png|jpe?g|gif))$/,
    });
  }

  isValid(file: Express.Multer.File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de arquivo inválido. Permitidos: png, jpg, jpeg, gif'
      );
    }

    return true;
  }

  buildErrorMessage(): string {
    return 'Arquivo inválido. Apenas imagens PNG, JPG, JPEG ou GIF são permitidas.';
  }
}
