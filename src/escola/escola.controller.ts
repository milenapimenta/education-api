import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('escola')
export class EscolaController {
  constructor(private readonly escolaService: EscolaService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createEscolaDto: CreateEscolaDto) {
    return this.escolaService.create(createEscolaDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll(@Query() query : PaginationQueryDto) {
    return this.escolaService.findAll(query.page, query.limit);
  }

  @Roles('ADMIN')
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
