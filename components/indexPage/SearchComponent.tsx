import React from 'react';
import {Box, Typography} from "@mui/material";
import styles from "../../styles/index.module.scss";
import {AnimeListItem} from "../animeListItem/AnimeListItem";

const SearchComponent = ({searchedData}) => {
	if (searchedData.size > 0) {
		return (
			<Box className={styles.searchContainer}>
				<Typography
					variant={"body1"}
					className={styles.listItemTitle}
					align={'center'}
				>
					Вот что мы нашли:
				</Typography>
				{Array.from(searchedData.values()).map((data: any) => {
					return  (
						<AnimeListItem key={data.id} data={data} />
					)
				})}
			</Box>
		)
	}

	return (
		<Box className={styles.searchContainer}>
			<Typography
				variant={"body1"}
				className={styles.listItemTitle}
				align={'center'}
			>
				Ничего не найдено :(
			</Typography>
		</Box>
	)
};

export default SearchComponent;