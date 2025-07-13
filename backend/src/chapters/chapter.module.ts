// src/chapters/chapter.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterService } from './chapters.service';
import { ChapterController } from './chapter.controller';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
    ]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService], // <-- pentru seed.ts
})
export class ChapterModule {}
