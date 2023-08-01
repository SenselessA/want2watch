import React, {Dispatch, FC, Fragment, SetStateAction, useRef, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {LoginForm} from "./LoginForm";
import {RegistrationForm} from "./RegistrationForm";
import { XMarkIcon } from '@heroicons/react/24/solid'


type AuthenticationForm = {
  open: boolean;
  closeModal(): void
}

const AuthenticationForm: FC<AuthenticationForm> = ({open, closeModal}) => {
  const cancelButtonRef = useRef(null)
  const [isRegistration, setRegistration] = useState(false)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" mt-auto mb-auto bg-[#201c29ed] relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all my-8 w-full max-w-lg">
                <div className="relative">
                  <button onClick={() => closeModal()} className={'absolute right-3 top-3'}>
                    <XMarkIcon className={'h-5 w-5 text-[#FBD2B9] hover:text-[#946250]'} />
                  </button>
                  <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <img
                        className="mx-auto h-10 w-auto"
                        src="/images/logo.svg"
                        alt="Want2Watch"
                      />
                      <h2 className="text-[#FBD2B9] mt-4 sm:mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                        {isRegistration ? "Зарегистрироваться" : "Войти в аккаунт"}
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      {isRegistration ? (<RegistrationForm setRegistration={setRegistration} closeModal={closeModal} />)
                        : (<LoginForm setRegistration={setRegistration} closeModal={closeModal} />)}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default AuthenticationForm;