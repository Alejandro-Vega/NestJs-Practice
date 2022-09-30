import { EnumTodoStatus } from '@todo-app/shared-types';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /* @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  userId: number; */

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({
    type: 'enum',
    enum: EnumTodoStatus,
    default: EnumTodoStatus.unfinished,
    nullable: true
  })
  status: EnumTodoStatus;
}
