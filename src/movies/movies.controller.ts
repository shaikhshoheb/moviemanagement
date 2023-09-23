import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movies') 
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a movie' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'List of movies', type: CreateMovieDto, isArray: true }) 
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'The movie has been found.', type: CreateMovieDto }) 
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'The movie has been successfully updated.' })
  @ApiBody({ type: UpdateMovieDto }) 
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }
}
