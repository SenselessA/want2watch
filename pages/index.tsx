import Layout from "../components/layout/layout";
import {Box, CircularProgress, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import React, {ReactElement, useCallback, useEffect, useState} from "react";
import Image from 'next/image';
import Link from 'next/link';
const { KODIK_API_KEY } = process.env;
import {getSubString} from "../lib/getSubString";
import useInView from "react-cool-inview";
import {translitString} from "../lib/translitString";
import {debounce} from "../lib/debounce";
import {AnimeListItem} from "../components/animeListItem/AnimeListItem";
import SearchInput from "../components/theme/SearchInput";

import styles from "../styles/index.module.scss"
import SearchComponent from "../components/indexPage/SearchComponent";

function HomePage({ initList }) {
    const [list, setList] = useState(initList.results)
    const [currentListInfo, setCurrentListInfo] = useState(initList)
    const [searchValue, setSearchValue] = useState("")
    const [searchedData, setSearchedData] = useState(new Map())
    const [isSearchingProcess, setSearchingProcess] = useState(false)
    const [filterTimeout, setFilterTimeout] = useState()

  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0, // Default is 0
    onEnter: async ({ unobserve, observe }) => {
      unobserve();

      const data = {
        token: KODIK_API_KEY,
        limit: "25",
        with_material_data: "true",
        types: "anime-serial",
      }

      let list: any = {}

      try {
        const res = await fetch(currentListInfo.next_page)

        list = await res.json()
        if (list.results) {
          setList(prevList => ([...prevList, ...list.results]))
          setCurrentListInfo(list)
        }
        observe()


      }catch (e) {
        console.log('api error', e)
      }
    },
  });

  const onSearchChange = value => {
    setSearchValue(value)
    clearTimeout(filterTimeout)
    if (value.length <= 2) return setSearchedData(new Map())

    setSearchingProcess(true)

    const newTimeOut = setTimeout(async () => {
      const dataReq = {
        token: process.env.NEXT_PUBLIC_KODIK_API_KEY,
        title: value,
        with_material_data: "true",
        types: "anime-serial",
      }

      const testres = await fetch('api/test',
        {
          method: "POST",
          body: JSON.stringify({
            url: `https://kodikapi.com/search?${new URLSearchParams(dataReq)}`
          })
        }
      )
      const response = await testres.json()
      setSearchingProcess(false)

      if (response.results) {
        const map = new Map();

        response.results.forEach(item => {
          map.set(item.title, item)
        })

        return setSearchedData(map);
      }
    }, 500);

    // @ts-ignore
    setFilterTimeout(newTimeOut)
  }

    return (
        <Box height={'100%'}>
          <Box display={'flex'} alignItems={'center'} mt={5}>
            <Image src={"/images/logo.svg"} width={94} height={94} className={styles.logo} />
            <Box marginLeft={"16px"}>
              <Typography variant={"h2"} className={styles.mainTitle} component={"p"} align={'center'}>
                Want2Watch
              </Typography>
            </Box>
            <Box mr={1}>
              <Typography variant={"body1"} className={styles.separator} component={"p"} align={'center'}>
                —
              </Typography>
            </Box>
            <Box>
              <Typography variant={"h1"} className={styles.mainDescription} align={'center'}>
                портал для просмотра аниме онлайн бесплатно
              </Typography>
            </Box>
          </Box>


            <Box mt={5} component={"section"}>
                <Typography
                  variant={"body2"}
                  marginTop={"20px"}
                >
                  Все любят смотреть аниме онлайн дома в уютной обстановке, но часто требуется приложить немалые усилия, для того, чтобы найти качественный перевод и озвучку.  У нас есть отличная новость для поклонников аниме сериалов! Наш проект Want2Wath посвящен онлайн-просмотру аниме. Вам не придется искать каждую серию аниме без смс и регистрации - все лучшие аниме бесплатно в хорошем качестве уже есть на нашем портале!
                  Мы сами очень любим этот жанр и поэтому постарались сделать наш сайт как можно более удобным и захватывающим. Приятного просмотра!
                </Typography>
            </Box>

            <Box mt={6} display={"flex"} justifyContent={"center"} position={"relative"}>
                <SearchInput
                  searchValue={searchValue}
                  setSearchValue={onSearchChange}
                />

              {isSearchingProcess ?
                (<Box className={styles.searchContainer} alignItems={'center'}>
                  <CircularProgress className={styles.loader}  />
                </Box>)
                  :
                searchValue.length > 2 && <SearchComponent searchedData={searchedData} />}
            </Box>


          {searchValue.length <= 2 &&
          <Box component={"section"} mt={5}>
            <Typography
              variant={"h5"}
              align={"center"}
              component={"h2"}
            >
              Твои любимые Аниме
            </Typography>


            <Box marginTop={"32px"} display={"flex"} flexDirection={"column"} rowGap={"24px"}>

              {
                list?.map((listItem) => {
                  if (listItem?.material_data?.poster_url && listItem.material_data.description) {
                    return (
                      <AnimeListItem key={listItem.id} data={listItem} />
                    )
                  } else {
                    return null
                  }

                  return (
                    <Paper key={listItem.id} className={styles.listItemContainer}>
                      <Box width={145} minHeight={192} position={"relative"}>
                        постера нет
                      </Box>
                      <Box>{listItem.title}</Box>
                      <Box>{listItem.year}</Box>

                    </Paper>
                  )
                })
              }

              <Box ref={observe} margin={"24px 0"} display={'flex'} justifyContent={'center'}>
                <CircularProgress className={styles.loader}  />
              </Box>

            </Box>
          </Box>
          }


        </Box>
    )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout home>
          {page}
      </Layout>
    )
}

export async function getStaticProps() {
    const data = {
        token: KODIK_API_KEY,
        limit: "25",
        with_material_data: "true",
        types: "anime-serial",
    }

    let initList = {}

    try {
        const res = await fetch(
            `https://kodikapi.com/list?${new URLSearchParams(data)}`
        )

      initList = await res.json()
    }catch (e) {
        console.log('api error', e)
    }

    return {
        props: {
          initList: initList,
        },
        revalidate: 3600,
    }
}

export default HomePage
