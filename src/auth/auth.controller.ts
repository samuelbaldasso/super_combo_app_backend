import { Controller, Post, Body, HttpCode, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('google')
  @HttpCode(200)
  @ApiOperation({ summary: 'Google login' })
  google(@Body() body: { id_token: string }) {
    return this.authService.googleLogin(body.id_token);
  }

  @Post('apple')
  @HttpCode(200)
  @ApiOperation({ summary: 'Apple login' })
  apple(@Body() body: { id_token: string }) {
    return this.authService.googleLogin(body.id_token); // Reuse mock
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout' })
  logout() {
    return { message: 'Logged out successfully' };
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Forgot password' })
  forgotPassword(@Body() body: { email: string }) {
    return { message: 'Password reset email sent' };
  }
}
