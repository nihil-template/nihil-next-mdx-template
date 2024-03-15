import { Post } from '@prisma/client';

export interface ICreatePost {
  title: string;
  description: string
  content: string;
}

export type IPatchPost = Partial<Post>;
