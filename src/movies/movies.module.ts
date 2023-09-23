import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Actor } from 'src/actors/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie,Actor])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
