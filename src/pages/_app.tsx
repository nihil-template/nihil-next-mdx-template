import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';

const App = ({ Component, pageProps, }: AppProps) => (
  <>
    <Provider store={store}>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  </>
);

export default App;
