//backend/src/chapters/dto/create-subchapter.dto.ts
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

export class CreateSubchapterDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
