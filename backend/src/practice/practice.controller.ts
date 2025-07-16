// backend/src/practice/practice.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PracticeService } from './practice.service';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Get(':subSlug')
  async getQuestions(
    @Param('subSlug') subSlug: string,
    @Query('limit') limit: string,
  ) {
    const numericLimit = limit ? parseInt(limit) : null;
    return this.practiceService.getQuestionsBySubSlug(subSlug, numericLimit);
  }

  @Get('chapter/:chapterSlug') // ✅ FIXED
  async getQuestionsByChapter(
    @Param('chapterSlug') chapterSlug: string,
    @Query('limit') limit: string,
  ) {
    const parsedLimit = limit ? parseInt(limit) : null;
    return this.practiceService.getQuestionsByChapterSlug(chapterSlug, parsedLimit);
  }
}
