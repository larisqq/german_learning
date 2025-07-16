import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}
  
@Post()
async create(@Body() createChapterDto: CreateChapterDto) {
  const { title, index, slug, subchapters } = createChapterDto as any;
  return this.chaptersService.createChapterWithSubchapters({ title, index, slug, subchapters });
}


  @Get()
  async findAll() {
    return this.chaptersService.findAll();
  }

  @Get(':slug/questions')
  async getQuestionsBySlug(@Param('slug') slug: string) {
    console.log('Slug primit:', slug);
    const chapter = await this.chaptersService.findQuestionsBySlug(slug);
    console.log('Capitol găsit:', chapter);
    return chapter;
  }
}
