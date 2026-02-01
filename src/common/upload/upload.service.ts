import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return `/public/images/${file.filename}`;
  }
}