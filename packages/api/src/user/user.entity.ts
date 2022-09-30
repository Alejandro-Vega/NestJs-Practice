import { EnumRoles } from '@todo-app/shared-types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ type: 'enum', enum: EnumRoles, default: EnumRoles.user })
  role: EnumRoles;
}
