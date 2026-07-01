import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ _id: false })
export class Stat {
  @Prop({ required: true }) value: string;
  @Prop({ required: true }) label: string;
}

export const StatSchema = SchemaFactory.createForClass(Stat);

@Schema({ timestamps: true })
export class Profile {
  @Prop() avatarUrl?: string;
  @Prop({ type: [StatSchema], default: undefined }) stats?: Stat[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
