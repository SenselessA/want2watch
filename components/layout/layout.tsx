import Head from 'next/head'
import Link from 'next/link'
import React from "react";
import {Box, Container} from "@mui/material";

import styles from './layout.module.css'
import {Header} from "../header/Header";

export const siteName = 'Want2watch'
export const siteTitle = 'Смотреть Аниме онлайн бесплатно в хорошем качестве'
export const siteDescription = 'Смотреть фильмы аниме сериалы онлайн бесплатно. Большая база лучших аниме фильмов сериалов с русской озвучкой в хорошем качестве.'
export const siteKeywords = "аниме смотреть онлайн бесплатно в хорошем качестве лучшее"

export default function Layout(
    {
        children,
        home
    }: {
        children: React.ReactNode
        home?: boolean
    }) {



    return (
        <Box minHeight={'100vh'}>
            <Head>
                <meta charSet="UTF-8"/>
                <title>{siteTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>


                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#F48F51" />
                <meta name="theme-color" content="#F48F51" />
                <meta property="og:url" content="https://www.want2watch.ru" />
                <link href="https://www.want2watch.ru/" rel="canonical" />
                <meta name="title" content={siteTitle}/>
                <meta property="og:title" content={siteTitle}/>
                <meta property="og:description" content={siteDescription}/>
                <meta name="description"
                      content={siteDescription}/>
                <meta name="keywords" content={siteKeywords}/>
                <meta property="og:site_name" content={siteName}/>

                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>

            <Header />

            <Container maxWidth={"lg"} className={'px-2 sm:px-6'}>
                <main>{children}</main>
            </Container>

            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← На главную</a>
                    </Link>
                </div>
            )}
            <footer></footer>
        </Box>
    )
}