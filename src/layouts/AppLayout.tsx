import React from 'react';
import { Global } from '@emotion/react';
import { SiteMeta } from '@/components';
import { ISiteMetaProps } from '@/types';
import {
  FooterBlock, HeaderBlock, MainBlock, NavBlock
} from '@/components/Layout';
import { GlobalStyles } from '@/styles';

const AppLayout = ({ children, meta, }: ISiteMetaProps) => {
  return (
    <>
      <Global styles={GlobalStyles} />
      <SiteMeta meta={meta} />
      <HeaderBlock />
      <NavBlock />

      <MainBlock>
        {children}
      </MainBlock>

      <FooterBlock />
    </>
  );
};

export default AppLayout;
