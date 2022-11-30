import styles from "../../styles/index.module.scss";
import {Box, Paper, Stack, Typography} from "@mui/material";
import Link from "next/link";
import {translitString} from "../../lib/translitString";
import Image from "next/image";
import {getSubString} from "../../lib/getSubString";
import React from "react";

//TODO сделать гридами картинку и текст и попробовать в нём отрисовать картинку обложки

export const AnimeListItem = ({
		data
	}) => {
	return (
		<Paper key={data.id} className={styles.listItemContainer}>
			<Box flex={'none'} width={"143px"} height={"200px"} marginRight={"18px"}>
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
				>
					{data.title_orig}
				</Typography>
				<Stack direction="row" flexWrap={"wrap"} alignItems={'center'} spacing={2} margin={"4px 0"}>
					<Typography variant={"body2"}>
						{data.year}
					</Typography>
					{data?.material_data.genres?.map(
						(genre)=><Typography variant={"body2"} key={genre}>{genre}</Typography>
					)}
				</Stack>
				<Typography variant={"body2"}>
					{
						data.material_data.description
						&& getSubString(data.material_data.description, 500)
					}
				</Typography>
			</Box>

		</Paper>
	)
}