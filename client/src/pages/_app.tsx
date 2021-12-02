import { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import MainPageContainer from "../components/Common/MainPageContainer";
import DrawerContainer from "../contexts/Drawer/views/Container";
import Provider from "../components/Providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <html lang="en" />
      </Head>
      <Provider>
        <Navbar />
        <MainPageContainer>
          <Component {...pageProps} />
          <DrawerContainer />
        </MainPageContainer>
      </Provider>
    </>
  );
}
