/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isUUID(value)) throw new BadRequestException('Param not uuid');
    return value.toString();
  }
}
