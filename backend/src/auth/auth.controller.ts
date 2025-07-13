import { Controller, Post, Body, Res, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }, @Res() res: Response) {
    try {
      await this.authService.register(body.email, body.password);
      return res.status(201).json({ message: 'User registered' });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 zi
      sameSite: 'lax',
    });
    return res.json({ message: 'Logged in successfully' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.json({ message: 'Logged out' });
  }
}
