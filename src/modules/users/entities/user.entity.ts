import { Exclude } from '@nestjs/class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Form } from '@src/modules/forms/entities/form.entity';

export enum UserRole {
  ARCHITECT = 'architect',
  CLIENT = 'client',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 100 })
  genre: string;

  @Column({ type: 'int' })
  age: number;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Form, (form: Form) => form.architect)
  @JoinColumn()
  request: Form[];

  @OneToMany((type) => Form, (form: Form) => form.client)
  @JoinColumn()
  solicitation: Form[];
}
