import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChapterService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  async create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Get()
  async findAll() {
    return this.chapterService.findAll();
  }

 @Get(':slug/questions')
async getQuestionsBySlug(@Param('slug') slug: string) {
  console.log('Slug primit:', slug);
  const chapter = await this.chapterService.findQuestionsBySlug(slug);
  console.log('Capitol găsit:', chapter);
  return chapter;
}

}
