import { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import MainPageContainer from "../components/Common/MainPageContainer";
import Provider from "../components/Providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Navbar />
        <MainPageContainer>
          <Component {...pageProps} />
        </MainPageContainer>
      </Provider>
    </>
  );
}
