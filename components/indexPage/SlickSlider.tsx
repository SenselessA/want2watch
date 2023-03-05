import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import {translitString} from "../../lib/translitString";
import Image from "next/image";
import {Box} from "@mui/material";

const SlickSlider = ({sliderListData}) => {
/*	console.log('sliderListData', sliderListData);*/

	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "60px",
		slidesToShow: 3,
		speed: 500
	};

	return (
		<div>
			<Slider {...settings}>
				{sliderListData.map((data) => {
				/*	console.log('data', data)*/
					return (
						<Box key={data.id} flex={'none'} width={"143px"} height={"200px"} position={"relative"} marginRight={"18px"}>
							<Link href={`/anime/${translitString(data.title)}__${data.id}`}>
								<a style={{
									width: "100%",
									height: "100%",
								}}>
									<Image layout="fill" src={data?.material_data?.poster_url} alt={data.title} />
								</a>
							</Link>
						</Box>
					)
				})}
			</Slider>
		</div>
	);
};

export default SlickSlider;