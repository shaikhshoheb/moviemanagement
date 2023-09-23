import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Actor } from 'src/actors/entities/actor.entity';

@Injectable()
export class MoviesService {
  
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    if (!movie.actors) {
      movie.actors = [];
    }
    return this.movieRepository.save(movie);
  }
 
  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return  this.movieRepository.findOneBy({id:id})
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({
      id:id
    })

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    if (updateMovieDto.title !== undefined) {
      movie.title = updateMovieDto.title;
    }

    if (updateMovieDto.rating_classification !== undefined) {
      movie.rating_classification = updateMovieDto.rating_classification;
    }

    if (updateMovieDto.description !== undefined) {
      movie.description = updateMovieDto.description;
    }

    if (updateMovieDto.release_date !== undefined) {
      movie.release_date = updateMovieDto.release_date;
    }

    if (updateMovieDto.actors !== undefined) {
      const actorEntities = updateMovieDto.actors.map((CreateActorDto) => {
        const actor = this.actorRepository.create(CreateActorDto);
        return actor;
      });
      movie.actors = await this.actorRepository.save(actorEntities);
    }
    return this.movieRepository.save(movie);
  }
   
}
