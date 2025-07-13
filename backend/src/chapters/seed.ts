import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ChapterService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const chapterService = app.get(ChapterService);

  const chapterData = {
  slug: 'car-vocabulary',
  title: 'Car Vocabulary',
  questions: [
    { question: 'people carrier', answer: 'der Minivan' },
    { question: 'motorhome', answer: 'das Wohnmobil' },
    { question: 'caravan', answer: 'der Wohnwagen' },
    { question: 'passenger seat', answer: 'der Beifahrersitz' },
    { question: 'driver’s seat', answer: 'der Fahrersitz' },
    { question: 'back seat', answer: 'der Rücksitz' },
    { question: 'child seat', answer: 'der Kindersitz' },
    { question: 'roof rack', answer: 'der Dachgepäckträger' },
    { question: 'car | mit dem auto', answer: 'das Auto' },
    { question: 'the basics | das wesentliche', answer: 'das Wesentliche' },
    { question: 'sunroof', answer: 'das Schiebedach' },
    { question: 'automatic', answer: 'die Automatik' },
    { question: 'electric car', answer: 'das Elektroauto' },
    { question: 'hybrid', answer: 'das Hybridauto' },
    { question: 'engine', answer: 'der Motor' },
    { question: 'battery', answer: 'die Batterie' },
    { question: 'brake', answer: 'die Bremse' },
    { question: 'accelerator', answer: 'das Gaspedal' },
    { question: 'air conditioning', answer: 'die Klimaanlage' },
    { question: 'clutch', answer: 'die Kupplung' },
    { question: 'cruise control', answer: 'der Tempomat' },
    { question: 'exhaust (pipe)', answer: 'das Auspuffrohr' },
    { question: 'fuel tank', answer: 'der Benzintank' },
    { question: 'gearbox', answer: 'das Schaltgetriebe' },
    { question: 'transmission', answer: 'das Getriebe' },
    { question: 'Breathalyser®', answer: 'der Promillemesser' },
    { question: 'to start the engine', answer: 'den Motor anlassen' },
    { question: 'to brake', answer: 'bremsen' },
    { question: 'to overtake', answer: 'überholen' },
    { question: 'to park', answer: 'parken' },
    { question: 'to reverse', answer: 'zurücksetzen' },
    { question: 'to slow down', answer: 'verlangsamen' },
    { question: 'to speed', answer: 'die Geschwindigkeit überschreiten' },
    { question: 'to stop', answer: 'anhalten' },
    { question: 'exterior', answer: 'Außenbereich' },
    { question: 'boot', answer: 'der Kofferraum' },
    { question: 'roof', answer: 'das Dach' },
    { question: 'window', answer: 'das Fenster' },
    { question: 'wheel', answer: 'das Rad' },
    { question: 'door', answer: 'die Tür' },
    { question: 'wing', answer: 'der Kotflügel' },
    { question: 'tyre', answer: 'der Autoreifen' },
    { question: 'bonnet', answer: 'die Motorhaube' },
    { question: 'windscreen', answer: 'die Windschutzscheibe' },
    { question: 'windscreen wiper', answer: 'der Scheibenwischer' },
    { question: 'wing mirror', answer: 'der Seitenspiegel' },
    { question: 'headlight', answer: 'der Scheinwerfer' },
    { question: 'bumper', answer: 'die Stoßstange' },
    { question: 'number plate', answer: 'das Nummernschild' },
    { question: 'indicator', answer: 'der Blinker' },
    { question: 'interior', answer: 'Innenraum' },
    { question: 'dashboard', answer: 'das Armaturenbrett' },
    { question: 'fuel gauge', answer: 'die Tankanzeige' },
    { question: 'gearstick', answer: 'der Schaltknüppel' },
    { question: 'glove compartment', answer: 'das Handschuhfach' },
    { question: 'handbrake', answer: 'die Handbremse' },
    { question: 'headrest', answer: 'die Kopfstütze' },
    { question: 'ignition', answer: 'die Zündung' },
    { question: 'rearview mirror', answer: 'der Rückspiegel' },
    { question: 'sat nav', answer: 'das Navi' },
    { question: 'seatbelt', answer: 'der Sicherheitsgurt' },
    { question: 'speedometer', answer: 'der Tachometer' },
    { question: 'steering wheel', answer: 'das Lenkrad' },
  ],
};


  try {
    const result = await chapterService.create(chapterData);
    console.log('Chapter seeded:', result);
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    await app.close();
  }
}

bootstrap();
