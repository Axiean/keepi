import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  passName: string;

  @Column({ type: 'text' })
  encryptedPassword: string;
}
