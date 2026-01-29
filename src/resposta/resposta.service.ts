import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RespostaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createRespostaDto: CreateRespostaDto) {
    const resposta = await this.prisma.resposta.create({
      data: createRespostaDto,
    });

    return {
      message: 'Resposta criada com sucesso',
      data: resposta,
    }
  }

  async findAll() {
   const respostas = await this.prisma.resposta.findMany({
    include: {
      questao: true
    }
   });
   
   return {
    message: 'Respostas encontradas com sucesso',
    data: respostas,
   }
  }

  async findOne(id: number) {
    const resposta = await this.prisma.resposta.findUnique({
      where: {
        id
      },
    });

    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada');
    }

    return {
      message: 'Resposta encontrada com sucesso',
      data: resposta,
    };
  }

  async update(id: number, updateRespostaDto: UpdateRespostaDto) {
    const resposta = await this.prisma.resposta.findUnique({
      where: {
        id
      },
    });

    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada');
    }

    if (Object.keys(updateRespostaDto).length === 0) {
      throw new NotFoundException('Nenhum campo para atualizar');
    }

    const updatedResposta = await this.prisma.resposta.update({
      where: { id: resposta.id },
      data: updateRespostaDto,
    });

    return {
      message: 'Resposta atualizada com sucesso',
      data: updatedResposta,
    };
  }

  async remove(id: number) {
    await this.prisma.resposta.delete({
      where: { id },
    });

    return {
      message: 'Resposta removida com sucesso',
    };
  }
}
