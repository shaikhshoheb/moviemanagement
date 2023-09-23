import { Actor } from 'src/actors/entities/actor.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('movie_actors')
export class MovieActor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.movieActors)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Actor, (actor) => actor.movieActors)
  @JoinColumn({ name: 'actor_id' })
  actor: Actor;
}
