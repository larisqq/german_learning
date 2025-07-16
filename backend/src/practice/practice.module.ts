// backend/src/practice/practice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';

import { Chapter, ChapterSchema } from '../chapters/schemas/chapter.schema';
import { Subchapter, SubchapterSchema } from '../chapters/schemas/subchapter.schema';
import { Question, QuestionSchema } from '../chapters/schemas/question.schema';

import { ChaptersModule } from '../chapters/chapter.module'; // 👈 important pentru ChapterModel

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Subchapter.name, schema: SubchapterSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
    ChaptersModule, // 👈 doar dacă PracticeService are nevoie de ChapterModel exportat din el
  ],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
