import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as path from 'path';

@Injectable()
export class FileService {
  createFile(file: Express.Multer.File) {
    const fileName = uuid.v4() + '.jpg';
    const filePath = path.resolve(__dirname, '..', 'static');

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    fs.writeFileSync(path.join(filePath, fileName), file.buffer);

    return fileName;
  }
}
