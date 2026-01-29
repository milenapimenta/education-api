import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestaoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createQuestaoDto: CreateQuestaoDto) {
    const questao = await this.prisma.questao.create({
      data: createQuestaoDto
    });

    return {
      message: 'Questão criada com sucesso',
      data: questao,
    }
  }

  async findAll() {
    const questoes = await this.prisma.questao.findMany({
      include: {
        avaliacao: true,
      },
    });

    return {
      message: 'Questões encontradas com sucesso',
      data: questoes,
    };
  }

  async findOne(id: number) {
    const questao = await this.prisma.questao.findFirst({
      where: {
        id
      },
    });

    if (!questao) {
      throw new NotFoundException('Questão não encontrada');
    }

    return {
      message: 'Questão encontrada com sucesso',
      data: questao,
    };
  }

  async update(id: number, updateQuestaoDto: UpdateQuestaoDto) {
    const questao = await this.prisma.questao.findFirst({
      where: {
        id
      },
    });

    if (!questao) {
      throw new NotFoundException('Questão não encontrada');
    }

    if (Object.keys(updateQuestaoDto).length === 0) {
      throw new NotFoundException('Nenhum campo para atualizar');
    }

    const updatedQuestao = await this.prisma.questao.update({
      where: { id: questao.id },
      data: updateQuestaoDto,
    });

    return {
      message: 'Questão atualizada com sucesso',
      data: updatedQuestao,
    };
  }

  async remove(id: number) {
    await this.prisma.questao.delete({
      where: {
        id
      },
    });

    return {
      message: 'Questão removida com sucesso',
    };
  }
}
