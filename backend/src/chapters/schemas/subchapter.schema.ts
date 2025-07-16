import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Subchapter extends Document {
  @Prop({ required: true })
  slug: string; // ex: "das-wesentliche"
  @Prop({ required: true })
  title: string; // ex: "Das Wesentliche"

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[];
}

export const SubchapterSchema = SchemaFactory.createForClass(Subchapter);
