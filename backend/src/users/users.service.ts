// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async create(registerDto: RegisterDto): Promise<number> {
    const count = await this.userRepository.count();
    if (count === 0) {
      const user = this.userRepository.create(registerDto);
      this.userRepository.save(user);
      console.log('User seeding completed.');
    }
    console.log('User already seeded.');
    return count;
  }
}
