import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';
import { ApiHeader } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 1,
  })
  @Post('login')
  async login(
    @Req() req: TenantRequest,
    @Body() body: LoginDto,
  ) {
    return this.authService.login(
      req.tenantId,
      body.email,
      body.senha,
    );
  }
}
