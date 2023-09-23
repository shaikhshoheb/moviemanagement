import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  create(createActorDto: CreateActorDto) {
    return this.actorRepository.save(this.actorRepository.create(createActorDto));
  }

  async findAll(): Promise<any[]> {
    const actors = await this.actorRepository.find({ relations: ['movies'] });
    const result = actors.map((actor) => ({
      person_id: actor.person_id,
      name: actor.name,
      born: actor.born,
      died: actor.died,
      roles: actor.movies.map((movie) => ({
        id: movie.id,
        title: movie.title
      })),
    }));

    return result;
  
  }

  async findOne(id: number): Promise<any | undefined> {

    const actors = await this.actorRepository.find({
      where: { person_id: id },
      relations: ['movies'],
    });
    const actor =actors[0];
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    const result = {
      person_id: actor.person_id,
      name: actor.name,
      born: actor.born,
      died: actor.died,
      roles: actor.movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
      })),
    };

    return result;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    const existingActor = await this.actorRepository.findOneBy({person_id:id})

    if (!existingActor) {
      throw new NotFoundException('Actor not found');
    }
    if (updateActorDto.name !== undefined) {
      existingActor.name = updateActorDto.name;
    }

    if (updateActorDto.born !== undefined) {
      existingActor.born = updateActorDto.born;
    }

    if (updateActorDto.died !== undefined) {
      existingActor.died = updateActorDto.died;
    }
    return this.actorRepository.save(existingActor);
  }  
}
