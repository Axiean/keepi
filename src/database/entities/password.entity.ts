import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  passName: string;

  @Column({ type: 'text' })
  encryptedPassword: string;

  @CreateDateColumn()
  created_at: Date;
}
