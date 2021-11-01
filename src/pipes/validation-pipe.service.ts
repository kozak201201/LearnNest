import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const message = errors.map(
        (err) => err.property + ' - ' + Object.values<string>(err.constraints),
      );
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return obj;
  }
}
