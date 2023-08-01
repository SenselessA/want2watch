import React from "react";
import {useForm} from "react-hook-form";
import {AuthApi} from "../../api/auth";
import {Actions, useStateContext} from "../../context";
import {parseJwt} from "../../lib/jwtParser";

type LoginForm = {
  setRegistration: React.Dispatch<React.SetStateAction<boolean>>
  closeModal(): void
}

export const LoginForm: React.FC<LoginForm> = ({setRegistration, closeModal}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { dispatch} = useStateContext()

  const onSubmit = async data => {
    try {
      const res = await AuthApi.loginUser(data)
      window.localStorage.setItem('token', res.data.token)
      dispatch({type: Actions.SET_AUTH_USER_TOKEN, payload: res.data.token})
      closeModal()
    } catch (e) {
      if (e.status === 404) {
        // пользователь с таким email не найден
        setError('email', {
          type: e.status,
          message: e.data
        })
        return
      }

      if (e.status === 401) {
        // неверный пароль
        setError('password', {
          type: e.status,
          message: e.data
        })
        return
      }

      console.error(e)

      setError('error', {
        type: e.status,
        message: 'Что-то пошло не так'
      })
    }


    // TODO
    // запрос на логин
    // обработка и вывод ошибки в форме
    // установка токена в локал сторадж

    // ctrl c + ctrl v в регистрацию

    // Страница сериала - установка, апдейт рейтинга, добавление / удаление в избранное

    // Страница профиля со списками сериалов Избранное - перейти, удалить
    // Список рейтинга - перейти, поменять рейтинг, убрать оценку

    // функция рефреш токена? не, просто токен экспаринг 100 лет
    };

  return (
    <>
      <form className="space-y-8" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email", { required: true })}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="outline outline-offset-1 outline-1 focus:outline-black
              focus-visible:outline-[#FBD2B9] outline-black border-none
              bg-[#201c29ed] block w-full rounded-md border-0
              py-1.5 px-1.5 shadow-sm sm:leading-6 placeholder-[#201c29ed]"
              required
            />
            {errors.email && <p className={'mt-2 absolute text-sm'}>{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6">
              Пароль
            </label>
            {/*<div className="text-sm">
              <a href="#" className="font-semibold">
                Забыли пароль?
              </a>
            </div>*/}
          </div>
          <div className="mt-2">
            <input
              {...register("password", { required: true })}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="
              outline outline-offset-1 outline-1 focus:outline-black
              focus-visible:outline-[#FBD2B9] outline-black border-none
              bg-[#201c29ed] block w-full rounded-md border-0
              py-1.5 px-1.5 shadow-sm sm:leading-6"
            />
            {errors.password && <p className={'mt-2 absolute text-sm'}>{errors.password.message}</p>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="
            flex w-full justify-center rounded-md
            bg-[#946250b3] hover:bg-[#946250]
            px-3 py-1.5 text-sm font-semibold
            leading-6 text-[#FBD2B9] shadow-sm
            mt-10"
          >
            Вход
          </button>
        </div>
      </form>

      <p className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
        Нет аккаунта?&nbsp;
        <button
          className="font-semibold leading-6 text-[#946250] hover:text-[#FBD2B9]"
          onClick={() => setRegistration(true)}
        >
          Зарегистрироваться
        </button>
      </p>
  </>)
}
