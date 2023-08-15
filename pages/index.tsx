import Layout from "../components/layout/layout";
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import React, {ReactElement, useState} from "react";
const { KODIK_API_KEY } = process.env;
import useInView from "react-cool-inview";
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

  const { observe } = useInView({
    threshold: 0, // Default is 0
    onEnter: async ({ unobserve, observe }) => {
      unobserve();

      const data = {
        token: KODIK_API_KEY,
        limit: "25",
        with_material_data: "true",
        types: "anime-serial",
      }

      let list: any = {};
      let nextPage = new URLSearchParams(currentListInfo.next_page).get('page');

      if (!nextPage) {
        nextPage = currentListInfo.next_page;
      }

      try {
          const res = await fetch('api/list_get_next_page',
              {
                  method: "POST",
                  body: JSON.stringify({
                      next_page: nextPage,
                  })}
          )

        list = await res.json()
        if (list.results) {
          setList(prevList => ([...prevList, ...list.results]))
          setCurrentListInfo(list)
        }
        observe()


      } catch (e) {
        console.log('api error', e)
      }
    },
  });

  const onSearchChange = value => {
    setSearchValue(value)
    clearTimeout(filterTimeout)
    if (value.length <= 2) {
      if (isSearchingProcess) {
        setSearchingProcess(false)
      }
      return setSearchedData(new Map())
    }

    setSearchingProcess(true)

    const newTimeOut = setTimeout(async () => {
      const dataReq = {
        title: value,
        with_material_data: "true",
        types: "anime-serial",
      }

      const searchingResponse = await fetch('api/search',
        {
          method: "POST",
          body: JSON.stringify({
            url: `search?`,
            data: dataReq
          })
        }
      )

      try {
        const response = await searchingResponse.json()
        if (response.results) {
          const map = new Map();

          response.results.forEach(item => {
            map.set(item.title, item)
          })
          setSearchingProcess(false)
          setSearchedData(map);
        }
      } catch (e) {
        console.log('e', e);
      }
    }, 500);

    // @ts-ignore
    setFilterTimeout(newTimeOut)
  }

    return (
        <Box height={'100%'}>
          <section>
            <Box className={styles.mainContainer}>
              <Box>
                <h1 className={'flex items-center lg:gap-x-4 gap-x-2'}>
                  <span className={'xl:text-4xl lg:text-3xl md:text-2xl text-xl text-[#ffece0]'}>Want2watch</span>
                  —
                  <span className={'lg:text-2xl md:text-xl sm:text-xl text-md'}>смотреть аниме онлайн бесплатно</span>
                </h1>
              </Box>

              <Typography variant={"body1"} className={styles.separator} component={"p"} align={'center'}>

              </Typography>

              <Typography variant={"h1"} className={styles.mainDescription} align={'center'}>

              </Typography>
            </Box>

            <Box component={"section"}>
                <Typography
                  variant={"body2"}
                  className={'mt-1 lg:mt-4'}
                >
                  Все любят смотреть аниме онлайн дома в уютной обстановке, но часто требуется приложить немалые усилия, для того, чтобы найти качественный перевод и озвучку.  У нас есть отличная новость для поклонников аниме сериалов! Наш проект Want2watch посвящен онлайн-просмотру аниме. Вам не придется искать каждую серию аниме без смс и регистрации - все лучшие аниме бесплатно в хорошем качестве уже есть на нашем портале!
                  Мы сами очень любим этот жанр и поэтому постарались сделать наш сайт как можно более удобным и захватывающим. Приятного просмотра!
                </Typography>
            </Box>
          </section>

            <Box className={styles.searchInputContainer}>
                <SearchInput
                  searchValue={searchValue}
                  setSearchValue={onSearchChange}
                  size={'small'}
                />

              {isSearchingProcess ?
                (<Box className={styles.searchContainer} alignItems={'center'}>
                  <CircularProgress className={styles.loader}  />
                </Box>)
                  :
                searchValue.length > 2 && <SearchComponent searchedData={searchedData} />}
            </Box>

          <section>
            {searchValue.length <= 2 &&
            <Box component={"section"} className={'mt-4 sm:mt-6'}>
              <Typography
                variant={"h5"}
                align={"center"}
                component={"h2"}
                className={styles.subTitle}
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
          </section>


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
