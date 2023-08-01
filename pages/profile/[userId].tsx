import React, {ReactElement} from "react";
import Layout from "../../components/layout/layout";
import {FavoriteApi, ProfileApi, RatingApi} from "../../api/auth";
import {ProfileInfo, UserFavoriteMoviesOutput, UserRatedMoviesOutput} from "../../api/types";
import styles from "../../styles/index.module.scss";
import {Box, Paper, Typography} from "@mui/material";
import Link from "next/link";
import {translitString} from "../../lib/translitString";
import Image from "next/image";
import {EditRating} from "../../components/rating/EditRating";
import {useStateContext} from "../../context";
import {Tab} from "@headlessui/react";
import {NotEditRating} from "../../components/rating/NotEditRating";
import {EditFavorite} from "../../components/favorite/EditFavotite";
import classNames from "classnames";

type ProfileProps = {
  ratingList: UserRatedMoviesOutput[] | null,
  favoritesList: UserFavoriteMoviesOutput[] | null,
  profile: ProfileInfo,
}

const Profile = ({ratingList, favoritesList, profile}: ProfileProps) => {
  const {state: {authUserToken, userId, }} = useStateContext()
  return (
    <div>
      <div className={'text-center mt-3 mb-3'}>Профиль {profile.username}</div>
      <Tab.Group>
        <Tab.List className={'flex space-x-1 rounded-xl p-1'}>
          <Tab
            className={({ selected }) =>
            classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-[#ff5c57] ring-opacity-60 focus:outline-none focus:ring-2',
              selected
                ? 'shadow bg-[#312a35]'
                : 'text-[#FBD2B9] hover:bg-white/[0.07]'
            )}
          >
            Мои оценки
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-[#ff5c57] ring-opacity-60 focus:outline-none focus:ring-2',
                selected
                  ? 'shadow bg-[#312a35]'
                  : 'text-[#FBD2B9] hover:bg-white/[0.07]'
              )}
          >
            Избранное
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ul className={'flex flex-col gap-y-3'}>
              {ratingList?.map(movie => {
                return (
                  <li key={movie.movieId}>
                    <Paper key={movie.movieId} className={styles.listItemContainer}>
                      <Box className={'mr-2 md:mr-5'} flex={'none'} width={"90px"} height={"122px"} marginRight={"18px"}>
                        <Link href={`/anime/${translitString(movie.title)}__${movie.movieId}`}>
                          <a style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            display: "block",
                          }}>
                            <Image layout="fill" src={movie.posterUrl} alt={movie.title} />
                          </a>
                        </Link>
                      </Box>

                      <Box>
                        <Typography
                          variant={"body1"}
                          className={styles.listItemTitle}
                        >
                          <Link href={`/anime/${translitString(movie.title)}__${movie.movieId}`}>
                            <a>
                              {movie.title}
                              {Number(movie.year) ? <span className={'ml-2'}>({movie.year})</span> : null}
                            </a>
                          </Link>
                        </Typography>
                        <Typography
                          variant={"body2"}
                          marginTop={'4px'}
                        >
                          {movie.titleOrig}
                        </Typography>
                        {authUserToken && Number(profile.id) === userId ? (
                          <EditRating movieId={movie.movieId} ratingData={movie.rating} />
                        ) : (
                          <NotEditRating ratingData={movie.rating} />
                        )}
                      </Box>

                    </Paper>
                  </li>
                )
              })}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <ul className={'flex flex-col gap-y-3'}>
              {favoritesList?.map(movie => {
                return (
                  <li key={movie.movieId}>
                    <Paper key={movie.movieId} className={styles.listItemContainer}>
                      <Box flex={'none'} width={"90px"} height={"122px"} marginRight={"18px"}>
                        <Link href={`/anime/${translitString(movie.title)}__${movie.movieId}`}>
                          <a style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            display: "block",
                          }}>
                            <Image layout="fill" src={movie.posterUrl} alt={movie.title} />
                          </a>
                        </Link>
                      </Box>

                      <Box>
                        <Typography
                          variant={"body1"}
                          className={styles.listItemTitle}
                        >
                          <Link href={`/anime/${translitString(movie.title)}__${movie.movieId}`}>
                            <a>
                              {movie.title}
                              {Number(movie.year) ? <span className={'ml-2'}>({movie.year})</span> : null}
                            </a>
                          </Link>
                        </Typography>
                        <Typography
                          variant={"body2"}
                          marginTop={'4px'}
                        >
                          {movie.titleOrig}
                        </Typography>
                        <NotEditRating ratingData={movie.rating} />
                        {authUserToken && Number(profile.id) === userId && (
                          <EditFavorite movieId={movie.movieId} favoriteStatus={true} />
                        )}

                      </Box>

                    </Paper>
                  </li>
                )
              })}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const userId = context.params.userId

  try {
    const profileInfo = await ProfileApi.getProfileInfo(userId)

    return {
      props: {
        ratingList: profileInfo.data.movies,
        favoritesList: profileInfo.data.favorites,
        profile: profileInfo.data.user
      },
    }
  } catch (e) {
    console.log('api post error', e)
  }
}


export default Profile