import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChapterDocument = Chapter & Document;

@Schema()
export class Chapter {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop([
    {
      question: String,
      answer: String,
    },
  ])
  questions: { question: string; answer: string }[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
