import React from "react";

import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import MainPageContainer from "../components/Common/MainPageContainer";
import Provider from "../components/Providers";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouterChange = (url: string) => {
      window.gtag(
        "config",
        process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string,
        {
          page_path: url,
        }
      );
    };

    router.events.on("routeChangeComplete", handleRouterChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="robots" content="all" />
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
