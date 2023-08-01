import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";
import {FavoriteApi} from "../../api/auth";

const SButton = styled(Button)({
  backgroundColor: '#7b1fa2',
  textTransform: 'none',
  color: '#FBD2B9',
  '&:hover': {
    backgroundColor: '#2f2747',
    borderColor: '#2f2747',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#2f2747',
    borderColor: '#2f2747',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgb(36 32 47)',
  },
})

export const EditFavorite = ({favoriteStatus, movieId} : {favoriteStatus: boolean, movieId: string}) => {
  const [isFavorite, setFavorite] = useState(favoriteStatus)

  const favoriteHandler = async () => {
    if (isFavorite) {
      try {
        setFavorite(false)
        await FavoriteApi.removeFavoriteMovie(movieId)
      } catch (e) {
        setFavorite(true)
        console.error(e)
      }
    } else {
      try {
        setFavorite(true)
        await FavoriteApi.addFavoriteMovie(movieId)
      } catch (e) {
        setFavorite(false)
        console.error(e)
      }
    }
  }

  return (<SButton
    variant={'contained'}
    size={'small'}
    color="secondary"
    className={'mt-2'}
    onClick={() => {
      favoriteHandler()
    }}
  >
    {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
  </SButton>)
}