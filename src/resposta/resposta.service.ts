import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RespostaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createRespostaDto: CreateRespostaDto) {
    return this.prisma.resposta.create({ data: createRespostaDto });
  }

  async findAll() {
   return this.prisma.resposta.findMany({ include: { questao: true } });
  }

  private async findByIdOrFail(id: number) {
    const resposta = await this.prisma.resposta.findUnique({ where: { id } });

    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada');
    }

    return resposta;
  }

  async findOne(id: number) {
    return this.findByIdOrFail(id);
  }

  async update(id: number, updateRespostaDto: UpdateRespostaDto) {
    const resposta = await this.findByIdOrFail(id);

    if (Object.keys(updateRespostaDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    return this.prisma.resposta.update({ where: { id: resposta.id }, data: updateRespostaDto });
  }

  async remove(id: number) {
    const resposta = await this.findByIdOrFail(id);

    await this.prisma.resposta.delete({ where: { id: resposta.id } });

    return null;
  }
}
