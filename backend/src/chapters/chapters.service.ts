import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
  ) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const newChapter = new this.chapterModel(createChapterDto);
    return newChapter.save();
  }

  async findAll(): Promise<Chapter[]> {
    return this.chapterModel.find().exec();
  }

  async findOne(id: string): Promise<Chapter | null> {
    return this.chapterModel.findById(id).exec();
  }

  async findQuestionsBySlug(slug: string): Promise<{ question: string; answer: string }[]> {
    const chapter = await this.chapterModel.findOne({ slug }).exec();
    if (!chapter) {
      throw new NotFoundException(`Chapter with slug "${slug}" not found`);
    }
    return chapter.questions;
  }
}
