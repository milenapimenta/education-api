import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(RolesGuard)
@ApiBearerAuth()
@Controller('escola')
export class EscolaController {
  constructor(private readonly escolaService: EscolaService) {}

  @Post()
  @Roles('ADMIN')
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

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscolaDto: UpdateEscolaDto) {
    return this.escolaService.update(+id, updateEscolaDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escolaService.remove(+id);
  }
}
