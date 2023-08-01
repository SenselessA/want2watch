import React from "react";
import {useForm} from "react-hook-form";
import {AuthApi} from "../../api/auth";
import {Actions, useStateContext} from "../../context";

type RegistrationForm = {
  setRegistration: React.Dispatch<React.SetStateAction<boolean>>
  closeModal(): void
}

export const RegistrationForm: React.FC<RegistrationForm> = ({setRegistration, closeModal}) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm();

  const { dispatch} = useStateContext()

  const onSubmit = async data => {
    try {
      const res = await AuthApi.signUpUser(data)
      window.localStorage.setItem('token', res.data.token)

      dispatch({type: Actions.SET_AUTH_USER_TOKEN, payload: res.data.token})
      closeModal()
    } catch (e) {
      if (e.status === 400) {
        if (e.data.includes('email')) {
          // пользователь с таким email уже зареган
          setError('email', {
            type: e.status,
            message: e.data
          })
        }

        if (e.data.includes('имя')) {
          // такой ник уже зареган
          setError('username', {
            type: e.status,
            message: e.data
          })
        }
        return
      }

      console.error(e)

      setError('error', {
        type: e.status,
        message: 'Что-то пошло не так'
      })
    }
  }

  return (
    <>
      <form className="space-y-8" action="#" onSubmit={handleSubmit(onSubmit)}>
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
              required
              className="outline outline-offset-1 outline-1 focus:outline-black
              focus-visible:outline-[#FBD2B9] outline-black border-none
              bg-[#201c29ed] block w-full rounded-md border-0
              py-1.5 px-1.5 shadow-sm sm:leading-6 placeholder-[#201c29ed]"
            />
            {errors.email && <p className={'mt-2 absolute text-sm'}>{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6">
            Имя
          </label>
          <div className="mt-2">
            <input
              {...register("username", { required: true, minLength: {value: 3, message: 'Слишком коротко'} })}
              id="username"
              name="username"
              autoComplete="username"
              required
              className="outline outline-offset-1 outline-1 focus:outline-black
              focus-visible:outline-[#FBD2B9] outline-black border-none
              bg-[#201c29ed] block w-full rounded-md border-0
              py-1.5 px-1.5 shadow-sm sm:leading-6 placeholder-[#201c29ed]"
            />
            {errors.username && <p className={'mt-2 absolute text-sm'}>{errors.username.message}</p>}
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
              {...register("password", { required: true, minLength: {value: 5, message: "Слишком короткий пароль"} })}
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
            Регистрация
          </button>
        </div>
      </form>

      <p className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
        Уже есть аккаунт?&nbsp;
        <button
          className="font-semibold leading-6 text-[#946250] hover:text-[#FBD2B9]"
          onClick={() => setRegistration(false)}
        >
          Войти
        </button>
      </p>
    </>
  )
};