import React from 'react';
import { css } from '@emotion/react';
import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import AppLayout from '@/layouts/AppLayout';
import { useSiteMeta } from '@/hooks';
import { getMDX } from '@/utils/MDX';
import { ISlug } from '@/types';

interface IndexPageProps {
  post: ISlug;
}

const IndexPage = ({ post, }: IndexPageProps) => {
  const { source, } = post;

  const IndexPageStyle = css``;

  const meta = useSiteMeta({
    title: '홈',
    url: '/',
  });

  return (
    <>
      <AppLayout meta={meta}>
        <div id='index-page' css={IndexPageStyle}>
          <MDXRemote {...source} />
        </div>
      </AppLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const testPost = await getMDX('test');

  return {
    props: {
      post: testPost,
    },
  };
};

export default IndexPage;
