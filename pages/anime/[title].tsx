import React, {ReactElement, useEffect, useMemo} from 'react';
import {Box, Rating, Typography} from "@mui/material";
import Layout from "../../components/layout/layout";
import styles from "../../styles/animePost.module.scss"
import IframePlayerKodik from "../../components/player/IframePlayerKodik";
import {StarIcon, BookmarkIcon, BookmarkSquareIcon} from "@heroicons/react/24/solid";
import {getExternalRating, getExternalVotes} from "../../components/rating/utils";
import cn from "classnames";
import {useStateContext} from "../../context";
import {FavoriteApi, MoviesApi, RatingApi} from "../../api/auth";
import {MovieByIdOutput} from "../../api/types";
const { KODIK_API_KEY } = process.env;

const AnimePost = ({post}: {post: MovieByIdOutput}) => {
	const [rating, setRating] = React.useState<number | null>();
	const [isFavorite, setFavorite] = React.useState<boolean>(false);
	const {state: {authUserToken}} = useStateContext()

	useEffect(() => {
		if (authUserToken) {
			RatingApi.getRatingByUser(post.id).then(res => setRating(res.data.rating))
			FavoriteApi.isFavoriteMovieByUser(post.id).then(res => setFavorite(res.data.isFavorite))
		}
	}, [authUserToken])

	const ratingHandler = async (rating: number) => {
		try {
			await RatingApi.addRating({rating, movieId: post.id})
			setRating(rating)
		} catch (e) {
			console.error(e);
		}
	}

	const externalRating = useMemo(() => {
		return getExternalRating(post.kinopoiskRating, post.imdbRating)
	}, [post])

	const externalVotes = useMemo (() => {
		return getExternalVotes(post.kinopoiskVotes, post.imdbVotes)
	}, [post])

	return (
		<Box>
			<Box className={styles.mainContainer}>
				<Box>
					<Box className={styles.poster}>
						<img src={post.posterUrl} alt={post.title} />
					</Box>
				</Box>

				<Box className={styles.infoContainer + ' relative'}>
					{authUserToken && <div
						className={'flex items-center absolute top-4 right-4 cursor-pointer'}
						onClick={async () => {
							if (!isFavorite) {
								try {
									await FavoriteApi.addFavoriteMovie(post.id)
									setFavorite(true)
								} catch (e) {
									console.error(e)
								}
							} else {
								try {
									await FavoriteApi.removeFavoriteMovie(post.id)
									setFavorite(false)
								} catch (e) {
									console.error(e)
								}
							}
						}}
					>
						{!isFavorite && <BookmarkIcon className={'h-7 w-7 fill-amber-300'} />}
						{isFavorite && <BookmarkSquareIcon className={'h-7 w-7 fill-amber-300'} />}
					</div>}

					<div className={'mb-3'}>
						<div className={'flex items-center'}>
							<div className={'flex items-center mr-4'}>
								<StarIcon className={'h-9 w-9 mr-2'} />

								<div className={'flex flex-col'}>
									{externalRating ? (
										<>
											<p className={'text-xl'}>{externalRating}</p>
											<p className={'text-xs'}>{externalVotes}</p>
										</>

									) : (
										<div className={'text-xs whitespace-pre-line'}>
											Мало <br />
											оценок
										</div>
									)}
								</div>
							</div>

							{authUserToken && <div className={styles.editRatingContainer + ' flex items-center'}>
								<StarIcon className={cn('h-9 w-9 mr-2 ' + styles.baseRating, {
									[styles.haveRating]: !!rating
								})} />
								{rating ? (
									<p className={'text-xs whitespace-pre-line text-center'}>{rating} <br /> Моя оценка</p>
								) : (
									<p className={'text-xs whitespace-pre-line'}>
										Оцените <br />
										аниме
									</p>
								)}
								<Rating
									className={cn(styles.editRating, styles.baseRating, {
										[styles.haveRating]: !!rating
									})}
									value={rating}
									onChange={(event, value) => {
										ratingHandler(value);
									}}
									max={10}
								/>
							</div>}

						</div>


					</div>

					<Box mb={1} className={styles.infoItem}>
						<Typography className={styles.title} variant={"h4"} component={"h1"}>{post.title}</Typography>
						<Box mt={1} mb={1}>
							<Typography variant={"h6"} component={"h2"} className={styles.itemText + ' ' + styles.itemTestTitle}>
								{post.otherTitle} / {post.titleOrig}
							</Typography>
						</Box>

					</Box>

					<Box className={styles.infoItems}>
						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle} >Тип:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{post.type}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Эпизоды:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{post.episodesCount}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Статус:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{post.allStatus}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Старт выхода:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{post.year}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Жанр:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >
								{post.genres?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}
							</Typography>
						</Box>

						{/*<Box className={styles.infoItem}>*/}
						{/*	<Typography variant={"body2"} className={styles.itemTitle}>Студия:</Typography>*/}
						{/*	<Typography variant={"body2"} className={styles.itemText}>*/}
						{/*		{post.material_data.anime_studios?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}*/}
						{/*	</Typography>*/}
						{/*</Box>*/}

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Возрастные ограничения:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{post.minimalAge}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Длительность:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{post.duration} мин. ~ серия
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Страна:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{post.countries?.map(item => <span key={item} className={styles.mapText}>{item}</span>) || "-"}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Сейю:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{post.actors?.map(item => <span key={item} className={styles.mapText}>{item}</span>) || "-"}
							</Typography>
						</Box>

					</Box>
				</Box>

			</Box>

			<Box className={styles.playerContainer}>

				<Box>
					<Box className={'relative pb-[56.25%] overflow-hidden'} display={'flex'} justifyContent={'center'}>
						<IframePlayerKodik link={post.link} />
					</Box>

					<Box mt={2}>
						<Typography variant={"body2"} className={styles.itemText}>
							{post.description}
						</Typography>

						<Box mt={1}>
							<Typography className={styles.itemText}>
								Смотрите {post.title} в хорошем качестве онлайн бесплатно и без регистрации!
							</Typography>
						</Box>

					</Box>
				</Box>

			</Box>
		</Box>
	)
}
AnimePost.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const regexp = /serial-\d+$/i;
	const id = context.params.title.match(regexp)[0];

	try {
		const response = await MoviesApi.getMovieById(id)

		if (response.status != 200) {
			throw new Error('not found');
		}

		return {
			props: {
				post: response.data,
			},
		}
	} catch (e) {
		// console.log('api post error', e)

		const data = {
			token: KODIK_API_KEY,
			id: id,
			with_material_data: "true",
			types: "anime-serial",
		}

		try {
			const res = await fetch(
				`https://kodikapi.com/search?${new URLSearchParams(data)}`
			)
			const post = await res.json()

			const currentPost = post.results[0];

			const returnDataFromKodik: MovieByIdOutput = {
				id,
				description: currentPost.material_data.description,
				minimalAge: currentPost.material_data.minimal_age || null,
				episodesCount: currentPost.episodes_count,
				otherTitle: currentPost.other_title,
				titleOrig: currentPost.title_orig,
				imdbVotes: currentPost.material_data.imdb_votes || null,
				kinopoiskVotes: currentPost.material_data.kinopoisk_votes || null,
				imdbRating: currentPost.material_data.imdb_rating || null,
				kinopoiskRating: currentPost.material_data.kinopoisk_rating || null,
				actors: currentPost.material_data.actors  || null,
				allStatus: currentPost.material_data.all_status,
				title: currentPost.title,
				countries: currentPost.material_data.countries || null,
				duration: currentPost.material_data.duration,
				link: currentPost.link,
				genres: currentPost.material_data.genres || null,
				type: currentPost.type,
				year: currentPost.year,
				posterUrl: currentPost.material_data.poster_url,
			}

			return {
				props: {
					post: returnDataFromKodik,
				},
			}
		} catch (e) {
			 console.log('api post error', e)
			return {
				props: {
					post: {},
				},
			}
		}
	}
}

export default AnimePost
