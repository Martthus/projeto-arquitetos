import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@src/modules/users/entities/user.entity';

export enum FormStatus {
  REQUESTED = 'requested',
  ACCEPT = 'accept',
  REFUSED = 'refused',
}

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ type: 'boolean', default: false })
  archived: boolean;

  @Column({ type: 'enum', enum: FormStatus, default: FormStatus.REQUESTED })
  status: FormStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (client: User) => client.solicitation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  client: User;

  @ManyToOne((type) => User, (architect: User) => architect.request, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  architect: User;
}
