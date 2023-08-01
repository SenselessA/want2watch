import React from "react";

export const NotEditRating = ({ratingData}) => {
  return (
    <div className={'flex flex-col md:flex-row'}>
      <p className={'text-xs whitespace-pre-line mr-1.5 mt-1'}>Рейтинг: {!!Number(ratingData) && Math.round(ratingData) || '?'}</p>
    </div>
  )
}