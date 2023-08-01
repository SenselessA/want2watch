import React, {useState} from 'react';
import styles from "../layout/layout.module.css";
import {Box, Typography} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AuthenticationForm from "../authentication";
import {Actions, useStateContext} from "../../context";
import {AuthApi} from "../../api/auth";

type Header = {
}

export const Header: React.FC<Header> = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false)
  const openModal = () => setOpenModal(true)

  const {state, dispatch} = useStateContext();
  const userToken = state.authUserToken;
  const userId = state.userId;

  const onLogoutHandler = () => {
    dispatch({type: Actions.LOGOUT, payload: null})
    AuthApi.logoutUser();
  };

  return (
    <>
      <header className={styles.header}>
        <Box className={'ml-[4%] md:ml-[8%]'} display={'flex'} alignItems={'center'} justifyContent={'start'} marginLeft={"8%"}>
          <Link href="/">
            <a>
              <Box display={'flex'} alignItems={'center'}>
                <Box className={styles.logo}>
                  <Image src={'/images/logo.svg'} layout='fill' />
                </Box>

                <Box className={'ml-1.5 md:ml-3'}>
                  <Typography className={styles.headerTitle} variant={"body2"}>Want2Watch</Typography>
                </Box>
              </Box>
            </a>
          </Link>
        </Box>

        <div className={'mr-[4%] md:mr-[8%]'}>
          {!userToken && (<button onClick={() => openModal()}>Войти</button>)}
          {userToken && (
            <>
            <Link href={`/profile/${userId}`}>
              <a className={'mr-3'}>
                Профиль
              </a>
            </Link>
            <button onClick={onLogoutHandler}>Выход</button>
            </>
          )}
        </div>
      </header>
      <AuthenticationForm open={isOpenModal} closeModal={closeModal} />
    </>
  );
};
