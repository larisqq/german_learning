// backend/src/practice/practice.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from '../chapters/schemas/chapter.schema';
import { Subchapter } from '../chapters/schemas/subchapter.schema';
import { Question } from '../chapters/schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class PracticeService {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<Chapter>,

    @InjectModel(Subchapter.name)
    private readonly subchapterModel: Model<Subchapter>,

    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async getQuestionsBySubSlug(subSlug: string, limit: number | null) {
    const subchapter = await this.subchapterModel
      .findOne({ slug: subSlug })
      .populate('questions')
      .exec();

    if (!subchapter) {
      throw new Error(`Subchapter with slug "${subSlug}" not found`);
    }

    let questions = subchapter.questions as unknown as Question[];

    if (limit && limit > 0) {
      questions = questions.slice(0, limit);
    }

    return questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    }));
  }

  async getQuestionsByChapterSlug(chapterSlug: string, limit: number | null) {
    const chapter = await this.chapterModel
      .findOne({ slug: chapterSlug })
      .populate({
        path: 'subchapters',
        populate: { path: 'questions' },
      })
      .exec();

    if (!chapter) {
      throw new Error(`Chapter with slug "${chapterSlug}" not found`);
    }

    type PopulatedSubchapter = Subchapter & { questions: Question[] };
    const populatedSubchapters = chapter.subchapters as unknown as PopulatedSubchapter[];

    let allQuestions = populatedSubchapters.flatMap(sub => sub.questions);

    if (limit && limit > 0) {
      allQuestions = allQuestions.slice(0, limit);
    }

    return allQuestions.map(q => ({
      question: q.question,
      answer: q.answer,
    }));
  }
}
