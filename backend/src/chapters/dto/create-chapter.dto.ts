// src/chapters/dto/create-chapter.dto.ts
export class CreateChapterDto {
  title: string;
  slug: string;
  phrases?: { german: string; translation: string }[]; // ← opțional
  questions?: { question: string; answer: string }[];  // ← opțional
}
