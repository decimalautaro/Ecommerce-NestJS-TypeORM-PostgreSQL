import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'int', unique: true })
  phone: string;
}
