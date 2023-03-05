import React from 'react';
import {Box, InputAdornment, TextField} from "@mui/material";
import Image from "next/image";
import styles from "../../styles/index.module.scss";

const SearchInput = ({searchValue, setSearchValue, size}) => {
	return (
		<TextField
			size={size ? size : 'small'}
			fullWidth={true}
			className={styles.inputSearchField}
			sx={{
				'& .MuiInputBase-colorPrimary': {
					border: "2px solid #FBD2B9",
					'&:hover': {
						borderColor: "#F48F51",
					},
					'&.Mui-focused': {
						borderColor: "#F48F51",
					}
				},
				'& .MuiOutlinedInput-notchedOutline': {
					border: "none",
				}
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="start">
						<Box className={styles.inputLogoContainer}>
							<Image src={"/images/logo.svg"} layout='fill' />
						</Box>
					</InputAdornment>
				),
				className: styles.searchField,
			}}
			value={searchValue}
			onChange={(e) => {
				setSearchValue(e.target.value)
			}}
		/>
	);
};

export default SearchInput;