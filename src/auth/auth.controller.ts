import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiHeader } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiHeader({
    name: 'x-tenant-slug',
    description: 'ID do tenant (escola/empresa) que está fazendo a requisição',
    required: false,
    example: 1,
  })
  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Headers('x-tenant-slug') tenantSlug?: string) {
    return this.authService.login(body.email, body.senha, tenantSlug);
  }
}
