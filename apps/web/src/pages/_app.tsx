import Head from 'next/head';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weavcraft | Welcome</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
