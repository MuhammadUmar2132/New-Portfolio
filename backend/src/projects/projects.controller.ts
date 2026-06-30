import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() { return this.projectsService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.projectsService.findOne(id); }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateProjectDto) { return this.projectsService.create(dto); }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) { return this.projectsService.update(id, dto); }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.projectsService.remove(id); }
}
