import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import React from "react";
import {NextPage} from "next";
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/global.css'
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
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
              {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
          </StyledEngineProvider>
          <Analytics />
        </>
    )
}