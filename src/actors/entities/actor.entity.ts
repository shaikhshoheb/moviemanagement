import { Movie } from 'src/movies/entities/movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  born: Date;

  @Column({ type: 'date', nullable: true })
  died: Date | null;
  
  @ManyToMany(() => Movie, (movie) => movie.actors)
 
  @JoinTable({ name: 'movie_actors' })
  movies: Movie[];
  movieActors: any;
}