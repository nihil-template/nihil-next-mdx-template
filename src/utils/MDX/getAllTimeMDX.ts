import { IMDX } from '@/types';
import { getAllMDX } from './getAllMDX';
import { getYear } from './getYear';

const years = getYear();
const months = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12',
];

export const getAllTimeMDX = () => {
  let mdxs: IMDX[] = [];

  for (const year in years) {
    if (Object.prototype.hasOwnProperty.call(years, year)) {
      for (const month in months) {
        if (Object.prototype.hasOwnProperty.call(months, month)) {
          mdxs = mdxs.concat(getAllMDX(years[year], months[month]));
        }
      }
    }
  }

  mdxs = mdxs.sort((a, b) => {
    const beforeDate = a.frontMatter.created as number;
    const afterDate = b.frontMatter.created as number;

    return afterDate - beforeDate;
  });

  return mdxs;
};
