import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import React from "react";
import {NextPage} from "next";
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/global.css'
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {StateContextProvider} from "../context";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <>
          <StyledEngineProvider injectFirst>
            <QueryClientProvider client={queryClient}>
              <StateContextProvider>
                {getLayout(<Component {...pageProps} />)}
              </StateContextProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>

            {/*<Script strategy="lazyOnload">*/}
            {/*  {`*/}
            {/*    !function(e,n,t,r,a){r=e.createElement(n),a=e.getElementsByTagName(n)*/}
            {/*    [0],r.async=!0,r.src=t,a.parentNode.insertBefore(r,a)}*/}
            {/*    (document,"script","//kodik-add.com/add-players.min.js");*/}
            {/*  `}*/}
            {/*</Script>*/}
          </StyledEngineProvider>
          <Analytics />
        </>
    )
}