import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  image: string;
}
