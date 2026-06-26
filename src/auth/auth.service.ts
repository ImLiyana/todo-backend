import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // =========================
  // REGISTER
  // =========================
  async register(email: string, password: string) {
    if (!email || !password) {
      throw new UnauthorizedException('Email and password required');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      message: 'User registered successfully',
    };
  }

  // =========================
  // LOGIN
  // =========================
  async login(email: string, password: string) {
  console.log('Login email:', email);

  if (!email || !password) {
    throw new UnauthorizedException('Email and password required');
  }

  const user = await this.userRepository.findOne({
    where: { email },
  });

  // 👇 ADD THIS
  console.log('User found:', user);

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 👇 ADD THESE
  console.log('Entered password:', password);
  console.log('Stored hash:', user.password);

  const isValid = await bcrypt.compare(password, user.password);

  // 👇 ADD THIS
  console.log('Password valid:', isValid);

  if (!isValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    sub: user.id,
    email: user.email,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}