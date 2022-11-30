import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import React from "react";
import {NextPage} from "next";
import { StyledEngineProvider } from '@mui/material/styles';
/*import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";*/
import '../styles/global.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <>
          <StyledEngineProvider injectFirst>
            {getLayout(<Component {...pageProps} />)}
            <Script strategy="lazyOnload">
              {`
                !function(e,n,t,r,a){r=e.createElement(n),a=e.getElementsByTagName(n)
                [0],r.async=!0,r.src=t,a.parentNode.insertBefore(r,a)}
                (document,"script","//kodik-add.com/add-players.min.js");
              `}
            </Script>
          </StyledEngineProvider>
        </>
    )
}