import { readdirSync } from 'fs';
import { join } from 'path';

export const getYear = (): string[] => readdirSync(join(process.cwd(), 'posts'))
  .filter((item) => !item.includes('.md'))
  .filter((item) => item !== '0000');
