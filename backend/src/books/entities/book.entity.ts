import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Review } from './review.entity.js';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}