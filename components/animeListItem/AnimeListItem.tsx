import styles from "../../styles/index.module.scss";
import {Box, Paper, Stack, Typography} from "@mui/material";
import Link from "next/link";
import {translitString} from "../../lib/translitString";
import Image from "next/image";
import {getSubString} from "../../lib/getSubString";
import React from "react";

export const AnimeListItem = ({
		data
	}) => {
	return (
		<Paper key={data.id} className={styles.listItemContainer}>
			<Box className={'h-[120px] w-[90px] sm:w-[143px] sm:h-[200px] mr-2.5 sm:mr-4'} flex={'none'}>
				<Link href={`/anime/${translitString(data.title)}__${data.id}`}>
					<a style={{
						width: "100%",
						height: "100%",
						position: "relative",
						display: "block",
					}}>
						<Image layout="fill" src={data?.material_data?.poster_url} alt={data.title} />
					</a>
				</Link>
			</Box>

			<Box>
				<Typography
					variant={"body1"}
					className={styles.listItemTitle}
				>
					<Link href={`/anime/${translitString(data.title)}__${data.id}`}>{data.title}</Link>
				</Typography>
				<Typography
					variant={"body2"}
					marginTop={'4px'}
				>
					{data.title_orig}
				</Typography>

				<Stack direction="row" flexWrap={"wrap"} alignItems={'center'} columnGap={2} margin={"4px 0"}>
					<Typography variant={"body2"}>
						{data.year}
					</Typography>
					{data?.material_data.genres?.map(
						(genre)=><Typography variant={"body2"} key={genre}>{genre}</Typography>
					)}
				</Stack>

				<Typography variant={"body2"} className={styles.animeShortDescription}>
					{
						data.material_data.description
						&& getSubString(data.material_data.description, 500)
					}
				</Typography>

			</Box>

		</Paper>
	)
}