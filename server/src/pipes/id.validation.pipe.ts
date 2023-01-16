import { PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
  transform(value: string, meta: ArgumentMetadata) {
    if (meta.type !== 'param') return value

    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException('Invalid format id')

    return value
  }
}
