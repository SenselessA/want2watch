import Head from 'next/head'
import Link from 'next/link'
import React, {useState} from "react";
import {Box, Container, Typography} from "@mui/material";
import Image from "next/image"
import SearchInput from "../theme/SearchInput";
import SearchAutoInput from '../theme/SearchAutoInput';

import styles from './layout.module.css'
import {Header} from "../header/Header";
import {Modal} from "../modal/Modal";

export const siteName = 'Want2Watch'
export const siteTitle = 'Смотреть Фильмы Аниме Сериалы онлайн бесплатно в хорошем качестве'
export const siteDescription = 'Смотреть фильмы аниме сериалы онлайн бесплатно. Большая база лучших аниме фильмов сериалов с русской озвучкой в хорошем качестве.'
export const siteKeywords = "фильмы аниме сериалы смотреть онлайн бесплатно в хорошем качестве лучшее"

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
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#F48F51" />
                <meta name="theme-color" content="#F48F51" />

                <meta charSet="UTF-8"/>
                <meta name="description"
                      content={siteDescription}/>
                <meta name="keywords" content={siteKeywords}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                {/*<meta property="og:url" content="https://Want2Watch.org/"/>*/}
                {/*<link href="https://Want2Watch.org/" rel="canonical"/>*/}
                <meta name="title" content={siteTitle}/>
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta property="og:title" content={siteTitle}/>
                <meta property="og:description"
                      content={siteDescription}/>
                <meta property="og:site_name" content={siteName}/>
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                {/*по идее и так норм будет работать, но если что раскоменчу*/}
                {/*<link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />*/}
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