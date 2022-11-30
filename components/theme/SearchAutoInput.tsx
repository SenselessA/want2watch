import React, {useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import Image from "next/image";
import styles from "../../styles/index.module.scss";

const SearchAutoInput = () => {
	const [searchValue, setSearchValue] = useState("")

	//todo дописать результат запроса

	return (
		<TextField
			fullWidth={true}
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
						<Image src={"/images/logo.svg"} width={"42px"} height={"42px"} />
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

export default SearchAutoInput;