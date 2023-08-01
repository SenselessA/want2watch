import {Rating} from "@mui/material";
import React from "react";
import {RatingApi} from "../../api/auth";

export const EditRating = ({movieId, ratingData}) => {
  const [rating, setRating] = React.useState<number | null>(ratingData)

  const ratingHandler = async (newRate: number) => {
    try {
      setRating(newRate)
      await RatingApi.addRating({rating, movieId: movieId})
    } catch (e) {
      setRating(rating)
      console.error(e);
    }
  }

  return (
    <div className={'flex flex-col md:flex-row'}>
      <p className={'text-xs whitespace-pre-line mr-1.5 mt-1'}>Моя оценка: {rating}</p>
      <Rating
        value={rating}
        onChange={(event, value) => {
          ratingHandler(value);
        }}
        max={10}
      />
    </div>
  )
}