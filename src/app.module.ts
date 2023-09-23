import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { ActorsModule } from './actors/actors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';
import { Actor } from './actors/entities/actor.entity';


@Module({
  imports: [MoviesModule, UsersModule, ActorsModule,
  //   TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'root',
  //   password: '',
  //   database: 'music',
  //   entities: [User,Movie,Actor],
  //   synchronize: true,
  //   autoLoadEntities: true
  // }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    //host: 'dpg-ck7gkr08elhc73b17p20-a.oregon-postgres.render.com',
    host: 'dpg-ck7gkr08elhc73b17p20-a',
    port: 5432,
    username: 'root',
    password: 'LElqTyClO2lyaSjR0sWK15FJl8WUEtjG',
    database: 'music',
    entities: [User,Movie,Actor],
    synchronize: true,
    autoLoadEntities: true,
    ssl: {
      rejectUnauthorized: false,
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {
  constructor(private dataSource: DataSource) {}

}
