import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common'
import { HttpCode } from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'

import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.fileService.saveFiles([file], folder)
  }
}
