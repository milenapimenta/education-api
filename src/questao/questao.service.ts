import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestaoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createQuestaoDto: CreateQuestaoDto) {
    return this.prisma.questao.create({ data: createQuestaoDto });
  }

  async findAll() {
    return this.prisma.questao.findMany({ include: { avaliacao: true } });
  }

  private async findByIdOrFail(id: number) {
    const questao = await this.prisma.questao.findFirst({ where: { id } });

    if (!questao) {
      throw new NotFoundException('Questão não encontrada');
    }

    return questao;
  }

  async findOne(id: number) {
    return this.findByIdOrFail(id);
  }

  async update(id: number, updateQuestaoDto: UpdateQuestaoDto) {
    const questao = await this.findByIdOrFail(id);

    if (Object.keys(updateQuestaoDto).length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar');
    }

    return this.prisma.questao.update({ where: { id: questao.id }, data: updateQuestaoDto });
  }

  async remove(id: number) {
    const questao = await this.findByIdOrFail(id);

    await this.prisma.questao.delete({ where: { id: questao.id } });

    return null;
  }
}
