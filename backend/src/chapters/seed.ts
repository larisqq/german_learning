import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ChaptersService } from './chapters.service';
import { getModelToken } from '@nestjs/mongoose';
import { Subchapter } from './schemas/subchapter.schema';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const chapterService = app.get(ChaptersService);

  try {
    const chapterData = {
      title: 'The Essentials | Das Wesentliche',
      index: 1,
      slug: 'the-essentials',
      subchapters: [
        {
          slug: 'the-basics',
          title: 'The Basics | Das Wesentliche',
          questions: [
            { question: 'Hello.', answer: 'Hallo.' },
            { question: 'Hi!', answer: 'Hallo!' },
            { question: 'Good morning.', answer: 'Guten Morgen.' },
            { question: 'Good afternoon.', answer: 'Guten Tag.' },
            { question: 'Good evening.', answer: 'Guten Abend.' },
            { question: 'Goodnight.', answer: 'Gute Nacht.' },
            { question: 'See you soon.', answer: 'Bis bald.' },
            { question: 'See you tomorrow.', answer: 'Bis morgen.' },
            { question: 'See you on Saturday.', answer: 'Bis Samstag.' },
            { question: 'Bye!', answer: 'Tschüss!' },
            { question: 'Have a good day/evening!', answer: 'Schönen Tag / Abend!' },
            { question: 'Yes.', answer: 'Ja.' },
            { question: 'No.', answer: 'Nein.' },
            { question: 'I don’t know.', answer: 'Ich weiß nicht.' },
            { question: 'Please.', answer: 'Bitte.' },
            { question: 'Yes, please.', answer: 'Ja, bitte.' },
            { question: 'Thank you.', answer: 'Vielen Dank.' },
            { question: 'No, thanks.', answer: 'Nein, danke.' },
            { question: 'Excuse me.', answer: 'Entschuldigung.' },
            { question: 'Sorry?', answer: 'Wie bitte?' },
            { question: 'I’m sorry.', answer: 'Es tut mir leid.' },
            { question: 'OK!', answer: 'Einverstanden!' },
            { question: 'You’re welcome.', answer: 'Bitte.' },
            { question: 'I don’t understand.', answer: 'Ich verstehe nicht.' },
          ],
        },
      ],
    };

    const chapter = await chapterService.createChapterWithSubchapters(chapterData);
    console.log('✅ Chapter and subchapter seeded:', chapter.title);
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await app.close();
  }
}

bootstrap();

