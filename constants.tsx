
import { Category, Exercise } from './types';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'KONDITION', icon: '🏃‍♂️', color: 'bg-red-600' },
  { id: 'c2', name: 'FINTAR', icon: '🤾', color: 'bg-blue-600' },
  { id: 'c3', name: 'SNABBHET', icon: '⚡', color: 'bg-amber-500' },
  { id: 'c4', name: 'KAST', icon: '🎯', color: 'bg-sky-500' },
];

export const EXERCISES: Exercise[] = [
  // TEMA 1: KONDITION
  {
    id: 'e1',
    categoryId: 'c1',
    title: 'Höga grodhopp',
    description: '3x1 minut, 3 gånger under en vecka. Fokus på att hoppa explosivt (snabbt).'
  },
  {
    id: 'e2',
    categoryId: 'c1',
    title: 'Lenkkin (ca. 3km)',
    description: '5 st 25 minuters löprundor. Håll ett jämnt tempo.'
  },
  {
    id: 'e3',
    categoryId: 'c1',
    title: 'Pushups',
    description: '3x1 minut, 3 gånger under en vecka. Se till att nedre ryggen inte svackar.'
  },
  {
    id: 'e4',
    categoryId: 'c1',
    title: 'Plankan',
    description: '5x 90 sekunder. Håll kroppen rak som en linje.'
  },
  // TEMA 2: FINTAR
  {
    id: 'e5',
    categoryId: 'c2',
    title: 'Fint och förbi till höger',
    description: 'Lågt första steg, sedan tydlig tempoväxling förbi försvararen.',
    videoUrl: 'https://youtu.be/hBZFyDOZw8I'
  },
  {
    id: 'e6',
    categoryId: 'c2',
    title: 'Fint till vänster (överarm)',
    description: 'Fokusera på det sista långa steget framåt förbi försvararen.',
    videoUrl: 'https://youtu.be/Hq1Fx8iIba8'
  },
  {
    id: 'e7',
    categoryId: 'c2',
    title: 'Snurrfint',
    description: 'Träningstid 15min. Börja lugnt och öka tempot i snurren.',
    videoUrl: 'https://youtu.be/aiSao8TgWL8'
  },
  // TEMA 3: SNABBHET
  {
    id: 'e8',
    categoryId: 'c3',
    title: 'Lyktstolps-acceleration',
    description: 'Gå på promenad. Vid varje lyktstolpe, accelerera till maxfart. Gör detta 15-20 gånger. Luta dig framåt!'
  },
  {
    id: 'e9',
    categoryId: 'c3',
    title: 'Explosiva jämfotahopp',
    description: '4 gånger 15 meter. Knävinkel på 90 grader eller mindre vid start.'
  },
  // TEMA 4: KAST
  {
    id: 'e10',
    categoryId: 'c4',
    title: '200 hårda kast',
    description: 'Använd pingis- eller tennisboll. Håll armbågen högt ovanför axeln och använd kroppsrotation.'
  },
  {
    id: 'e11',
    categoryId: 'c4',
    title: 'Kastutmaning (Koner)',
    description: '7 flaskor på rad med 0.5m mellanrum. Kasta från 7 meter och försök välta alla.'
  },
  {
    id: 'e12',
    categoryId: 'c4',
    title: 'Fotbollskast mot vägg',
    description: '40 st per gång med två händer. Aktivera ryggmusklerna precis som vid handbollskast.'
  }
];
