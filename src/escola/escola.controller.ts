import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

@Controller('escola')
export class EscolaController {
  constructor(private readonly escolaService: EscolaService) {}

  @Post()
  create(@Body() createEscolaDto: CreateEscolaDto) {
    return this.escolaService.create(createEscolaDto);
  }

  @Get()
  findAll(@Query() query : PaginationQueryDto) {
    return this.escolaService.findAll(query.page, query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escolaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscolaDto: UpdateEscolaDto) {
    return this.escolaService.update(+id, updateEscolaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escolaService.remove(+id);
  }
}
