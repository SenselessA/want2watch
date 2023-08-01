import React, {useEffect} from 'react';
import { IUser } from '../api/types';
import {parseJwt} from "../lib/jwtParser";

type State = {
  authUserToken: string | null;
  userId: number | null;
  userName: string | null;
};

type Action = {
  type: string;
  payload: string | null;
};

type Dispatch = (action: Action) => void;

export enum Actions {
  SET_AUTH_USER_TOKEN = 'SET_AUTH_USER_TOKEN',
  LOGOUT = 'LOGOUT'
}

const initialState: State = {
  authUserToken: null,
  userId: null,
  userName: null,
};

type StateContextProviderProps = { children: React.ReactNode };

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.SET_AUTH_USER_TOKEN: {
      return {
        ...state,
        authUserToken: action.payload,
        userId: parseJwt(action.payload).id,
        userName: parseJwt(action.payload).name
      };
    }
    case Actions.LOGOUT: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch({type: Actions.SET_AUTH_USER_TOKEN, payload: window.localStorage.getItem('token')})
    }
  }, [])
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>
      {children}
      </StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
