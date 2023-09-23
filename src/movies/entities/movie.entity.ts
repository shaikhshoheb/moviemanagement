import { Actor } from 'src/actors/entities/actor.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';


@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 10 })
  rating_classification: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  release_date: Date;

  @ManyToMany(() => Actor, (actor) => actor.movies, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'movie_actors' })
  actors: Actor[];
  movieActors: any;
}
