import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';


@Controller('actors')
@ApiTags('Actors') // Specify a Swagger tag for this controller
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @ApiOperation({ summary: 'Create an actor' })
  @ApiResponse({ status: 201, description: 'The actor has been successfully created.' })
  @ApiBody({ type: CreateActorDto }) // Specify the request body DTO
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all actors' })
  @ApiResponse({ status: 200, description: 'List of actors', type: CreateActorDto, isArray: true })
  findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an actor by ID' })
  @ApiParam({ name: 'id', description: 'Actor ID' })
  @ApiResponse({ status: 200, description: 'The actor has been found.', type: CreateActorDto })
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an actor by ID' })
  @ApiParam({ name: 'id', description: 'Actor ID' })
  @ApiResponse({ status: 200, description: 'The actor has been successfully updated.' })
  @ApiBody({ type: UpdateActorDto })
  update(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(id, updateActorDto);
  }

}
