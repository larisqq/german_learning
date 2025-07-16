import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Subchapter } from './schemas/subchapter.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateSubchapterDto } from './dto/create-subchapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    @InjectModel(Subchapter.name) private subchapterModel: Model<Subchapter>,
    @InjectModel(Question.name) private questionModel: Model<Question & QuestionDocument>,
  ) {}

  // Creează un capitol cu subcapitole și întrebări aferente
  async createChapterWithSubchapters(data: {
    title: string;
    index: number;
    slug: string;
    subchapters: CreateSubchapterDto[];
  }) {
    const subchapterIds: Types.ObjectId[] = [];

    for (const sub of data.subchapters) {
      // Creează întrebările pentru subcapitol
      const createdQuestions = await this.questionModel.insertMany(sub.questions);

      // Creează subcapitolul cu referințe la întrebări
      const subchapter = await this.subchapterModel.create({
        slug: sub.slug,
        title: sub.title,
        questions: createdQuestions.map(q => q._id),
      }) as Subchapter & { _id: Types.ObjectId };

      subchapterIds.push(subchapter._id);
    }

    // Creează capitolul și atașează subcapitolele create
    const chapter = await this.chapterModel.create({
      title: data.title,
      index: data.index,
      slug: data.slug,
      subchapters: subchapterIds,
    });

    return chapter;
  }

  // Returnează toate capitolele populate cu subcapitole și întrebări
  async findAll() {
    return this.chapterModel.find()
      .populate({
        path: 'subchapters',
        populate: {
          path: 'questions',
        },
      })
      .exec();
  }

  // Adaugă un subcapitol la un capitol existent după slug
  async addSubchapterToChapter(chapterSlug: string, subchapterId: Types.ObjectId) {
    const chapter = await this.chapterModel.findOne({ slug: chapterSlug });
    if (!chapter) {
      throw new Error(`Chapter with slug "${chapterSlug}" not found`);
    }
    chapter.subchapters.push(subchapterId);
    return chapter.save();
  }

  // Găsește întrebările unui subcapitol după slug
  async findQuestionsBySlug(subSlug: string) {
    const subchapter = await this.subchapterModel.findOne({ slug: subSlug })
      .populate('questions')
      .exec();

    if (!subchapter) {
      throw new Error(`Subchapter with slug "${subSlug}" not found`);
    }

    return subchapter.questions;
  }
}
