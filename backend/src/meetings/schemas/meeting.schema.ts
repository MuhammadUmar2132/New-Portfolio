import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema({ timestamps: true })
export class Meeting {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) email: string;
  @Prop() phone?: string;
  @Prop({ required: true }) date: string;
  @Prop({ required: true }) time: string;
  @Prop({ default: '' }) message: string;
  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }) status: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
