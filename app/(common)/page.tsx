import React from 'react';
import { setMeta } from '@/src/common';
import { HomePage } from '@/src/components';

export const metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function IndexPage() {
  return (
    <>
      <HomePage />
    </>
  );
}
