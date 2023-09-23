import { Actor } from 'src/actors/entities/actor.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';


@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 255 ,nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 10 ,nullable: true })
  rating_classification: string;

  @Column({ type: 'text',nullable: true  })
  description: string;

  @Column({ type: 'date' ,nullable: true })
  release_date: Date;

  @ManyToMany(() => Actor, (actor) => actor.movies, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'movie_actors' })
  actors: Actor[];
  movieActors: any;
}
