import React, { createContext, ReactElement, useContext, useEffect, useReducer, useState } from 'react';
import { encodeImageToBlurhash } from './blurhash';

const AppContext = createContext<DispatchActions & AppState & {
  blurhash: string;
  setBlurhash: React.Dispatch<React.SetStateAction<string>>
}>({} as any);

type Action =
  | { type: 'CHANGE_IMAGE', payload: { value: string } }
  | { type: 'CHANGE_PUNCH', payload: { value: number } }
  | { type: 'CHANGE_WIDTH', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_HEIGHT', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_COMPONENT', payload: { value: number; type: 'X' | 'Y' } }
  | { type: 'CHANGE_RESOLUTION', payload: { value: number; type: 'X' | 'Y' } };

interface DispatchActions {
  changeImage: (url: string) => void;
  changePunch: (value: number) => void;
  changeWidth: (width: string, metric: 'px' | '%') => void;
  changeHeight: (height: string, metric: 'px' | '%') => void;
  changeComponent: (value: number, type: 'X' | 'Y') => void;
  changeResolution: (value: number, type: 'X' | 'Y') => void;
}

interface AppState {
  sourceUrl: string;
  width: { value: string, metric: 'px' | '%' };
  height: { value: string, metric: 'px' | '%' };
  resolutionY: number;
  resolutionX: number;
  componentX: number;
  componentY: number;
  punch: number;
}

export const AppProvider = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const [blurhash, setBlurhash] = useState('LHC$r{E2D*M{~VM{aeRk^*RjNHxa');
  const [appState, dispatch] = useReducer(appReducer, {
    width: { value: '50', metric: '%' }, //TODO: here hardcode the width of the default image
    height: { value: '100', metric: '%' },
    resolutionY: 100,
    resolutionX: 100,
    componentX: 4,
    componentY: 4,
    punch: 1,
    sourceUrl: 'https://images.unsplash.com/photo-1606851179426-eff6bb16ef41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxODUwMjV8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080'
  });

  function changeWidth (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_WIDTH', payload: { value: value, metric: metric } });
  }

  function changeHeight (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_HEIGHT', payload: { value, metric: metric } });
  }

  function changeImage (value: string) {
    dispatch({ type: 'CHANGE_IMAGE', payload: { value } });
  }

  function changeResolution (value: number, type: 'X' | 'Y') {
    dispatch({
      type: 'CHANGE_RESOLUTION',
      payload: {
        value,
        type
      }
    });
  }

  function changeComponent (value: number, type: 'X' | 'Y') {
    dispatch({
      type: 'CHANGE_COMPONENT',
      payload: {
        value,
        type
      }
    });
  }

  function changePunch (value: number) {
    dispatch({ type: 'CHANGE_PUNCH', payload: { value } });
  }

  return (
    <AppContext.Provider value={{
      ...appState,
      blurhash,
      setBlurhash,
      changeWidth,
      changeHeight,
      changeImage,
      changePunch,
      changeResolution,
      changeComponent
    }}>
      { children}
    </AppContext.Provider>
  );
};

function appReducer (state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'CHANGE_HEIGHT':
      return {
        ...state,
        height: action.payload
      };
    case 'CHANGE_WIDTH':
      return {
        ...state,
        width: action.payload
      };
    case 'CHANGE_IMAGE':
      return {
        ...state,
        sourceUrl: action.payload.value
      };
    case 'CHANGE_RESOLUTION':
      return {
        ...state,
        [`resolution${action.payload.type}`]: action.payload.value
      };
    case 'CHANGE_COMPONENT':
      return {
        ...state,
        [`component${action.payload.type}`]: action.payload.value
      };
    case 'CHANGE_PUNCH':
      return {
        ...state,
        punch: action.payload.value
      };
    default:
      throw Error('Reached to unknown state in reducer');
  }
}

export const useGlobalContext = () => useContext(AppContext);

// NOTE: do we need useCallback in the functions