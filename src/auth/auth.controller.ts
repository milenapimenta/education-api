import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Req() req: TenantRequest,
    @Body() body: LoginDto,
  ) {
    return this.authService.login(
      req.tenantId,
      body.email,
      body.password,
    );
  }
}
