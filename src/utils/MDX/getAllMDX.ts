import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { IFrontMatter, IMDX } from '@/types';

export const getAllMDX = (year: string, month: string): IMDX[] => {
  const folderPath = join(process.cwd(), 'posts', year, month);
  const mdxPath = readdirSync(folderPath).filter((item) => /\.mdx?$/.test(item));

  const allMDX: IMDX[] = mdxPath.map((mdxFile) => {
    const source = readFileSync(join(folderPath, mdxFile), 'utf8');
    const { data, content, } = matter(source);
    const newData: IFrontMatter = { ...data, };

    const frontMatter: IFrontMatter = {
      id: newData.id,
      title: newData.title,
      description: newData.description,
      cover: newData.cover,
      category: newData.category,
      tags: newData.tags,
      created: (newData.created as Date).getTime() - 32400000,
      updated: (newData.updated as Date).getTime() - 32400000,
      published: newData.published,
    };

    return {
      frontMatter,
      slug: mdxFile.replace('.mdx', ''),
      fullPath: `/${newData.category}/${mdxFile.replace('.mdx', '')}`,
      content,
    };
  });

  return allMDX.filter((mdx) => mdx.frontMatter.published === true);
};
