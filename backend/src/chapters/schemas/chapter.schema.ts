import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChapterDocument = Chapter & Document;

@Schema()
export class Chapter {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subchapter' }] })
  subchapters: Types.ObjectId[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
