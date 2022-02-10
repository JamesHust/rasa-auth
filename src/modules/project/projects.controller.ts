import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('author') author: string,
  ) {
    const generateId = await this.projectsService.create(
      name,
      description,
      author,
    );
    return { id: generateId };
  }

  @Get()
  async findAll(): Promise<Project[]> {
      return await this.projectsService.findAll()
  }

}
