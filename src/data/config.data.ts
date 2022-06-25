import { IConfig } from '@/types';

export const siteData: IConfig = {
  siteTitle: '사이트 이름',
  siteDescription: '',
  siteKeywords: '',
  siteType: 'website',
  siteUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '',
  siteImage: '',
  siteVersion: 'v0.0.0',
};
