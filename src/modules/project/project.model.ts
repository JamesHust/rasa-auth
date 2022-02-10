import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    author: String,
});

export interface Project extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    author: string;
}