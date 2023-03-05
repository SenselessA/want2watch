import React, {ReactElement} from 'react';
import {Box, Typography} from "@mui/material";
import PlayerKodik from "../../components/player/PlayerKodik";
import Layout from "../../components/layout/layout";
import styles from "../../styles/animePost.module.scss"
const { KODIK_API_KEY } = process.env;

const AnimePost = ({post}) => {
	const currentPost = post.results[0]

	return (
		<Box>
			<Box className={styles.mainContainer}>
				<Box>
					<Box className={styles.poster}>
						<img src={currentPost.material_data.poster_url} alt={currentPost.title} />
					</Box>
				</Box>

				<Box className={styles.infoContainer}>
					<Box mb={1} className={styles.infoItem}>
						<Typography className={styles.title} variant={"h4"} component={"h1"}>{currentPost.title}</Typography>
						<Box mt={1} mb={1}>
							<Typography variant={"h6"} component={"h2"} className={styles.itemText + ' ' + styles.itemTestTitle}>
								{currentPost.other_title} / {currentPost.title_orig}
							</Typography>
						</Box>

					</Box>

					<Box className={styles.infoItems}>
						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle} >Тип:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{currentPost.type}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Эпизоды:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{currentPost.episodes_count}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Статус:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{currentPost.material_data.all_status}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Старт выхода:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >{currentPost.year}</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Жанр:</Typography>
							<Typography variant={"body2"} className={styles.itemText} >
								{currentPost.material_data.genres?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Студия:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.anime_studios?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Рейтинг MPAA:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.rating_mpaa}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Возрастные ограничения:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.minimal_age}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Длительность:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.duration} мин. ~ серия
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Страна:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.countries?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Сейю:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.actors?.map(item => <span key={item} className={styles.mapText}>{item}</span>)}
							</Typography>
						</Box>

						<Box className={styles.infoItem}>
							<Typography variant={"body2"} className={styles.itemTitle}>Сюжет:</Typography>
							<Typography variant={"body2"} className={styles.itemText}>
								{currentPost.material_data.anime_description}
							</Typography>
						</Box>

					</Box>
				</Box>

			</Box>

			<Box className={styles.playerContainer}>

				<Box>
					<Box display={'flex'} justifyContent={'center'}>
						<PlayerKodik imdbID={currentPost.imdb_id} width={'100%'} height={'500px'} />
					</Box>

					<Box mt={2}>
						<Typography variant={"body2"} className={styles.itemText}>
							{currentPost.material_data.description}
						</Typography>

						<Box mt={1}>
							<Typography className={styles.itemText}>
								Смотрите {currentPost.title} в хорошем качестве онлайн бесплатно и без регистрации!
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
	const id = context.params.title.match(regexp)[0]

	const data = {
		token: KODIK_API_KEY,
		id: id,
		with_material_data: "true",
		types: "anime-serial",
	}

	let post = {}
	try {
		const res = await fetch(
			`https://kodikapi.com/search?${new URLSearchParams(data)}`
		)
		post = await res.json()
	}catch (e) {
		console.log('api post error', e)
	}

	return {
		props: {
			post: post,
		},
	}
}

export default AnimePost
