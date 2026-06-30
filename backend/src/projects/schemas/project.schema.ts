import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop() longDescription?: string;
  @Prop({ type: [String], default: [] }) techStack: string[];
  @Prop() githubUrl?: string;
  @Prop() liveUrl?: string;
  @Prop() imageUrl?: string;
  @Prop({ enum: ['fullstack', 'mobile', 'frontend', 'backend', 'other'], default: 'fullstack' }) category: string;
  @Prop({ default: false }) featured: boolean;
  @Prop({ default: 0 }) order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
