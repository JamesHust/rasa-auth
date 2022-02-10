import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  /**
   * Create a new project
   * @param name 
   * @param description 
   * @param author 
   * @returns id of new project
   */
  async create(name: string, description: string, author: string): Promise<Project> {
    const createProject = new this.projectModel({ name, description, author });
    return await createProject.save();
  }

  /**
   * Get all project
   * @returns all project
   */
  async findAll(): Promise<Project[]> {
      return await this.projectModel.find().exec();
  }

}
