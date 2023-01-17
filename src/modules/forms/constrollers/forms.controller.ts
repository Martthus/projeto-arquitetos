import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { classToClass } from '@nestjs/class-transformer';

import { FormsService } from '../services/forms.service';
import { CreateFormDto } from '../dto/createForm.dto';
import { UpdateFormDto } from '../dto/updateForm.dto';
import { FindOneParamsDto } from '../dto/findOneParams.dto';
import { JwtAuthGuard } from '../../auth/guards/jwtAuth.guard';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateFormDto, @Req() req: any) {
    const form = await this.formsService.create(data, { id: req.user.userId });

    return classToClass(form);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const form = await this.formsService.findAll({ id: req.user.userId });

    return classToClass(form);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/archiveds')
  async findArchiveds(@Req() req: any) {
    const form = await this.formsService.findArchiveds({ id: req.user.userId });

    return classToClass(form);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param() params: any) {
    const form = this.formsService.findOneById(params);

    return classToClass(form);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() params: FindOneParamsDto,
    @Body() data: UpdateFormDto,
    @Req() req: any,
  ) {
    const form = await this.formsService.update(params, data, {
      id: req.user.userId,
    });

    return classToClass(form);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param() params: FindOneParamsDto) {
    return this.formsService.remove(params);
  }
}
