import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';

import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { Subchapter, SubchapterSchema } from './schemas/subchapter.schema'; 
import { Question, QuestionSchema } from './schemas/question.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Subchapter.name, schema: SubchapterSchema }, 
      { name: Question.name, schema: QuestionSchema }, 
    ]),
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService],
  exports: [ChaptersService], // ✅ dacă alt modul (ex. PracticeModule) are nevoie de el
})
export class ChaptersModule {}
