import React, { createContext, ReactElement, useContext, useReducer } from 'react';

const AppContext = createContext<DispatchActions & AppState>({} as any);

type Action =
  | { type: 'CHANGE_WIDTH', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_HEIGHT', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_IMAGE', payload: { value: string } };

interface DispatchActions {
  changeWidth: (value: string, metric: 'px' | '%') => void;
  changeHeight: (value: string, metric: 'px' | '%') => void;
  changeImage: (value: string) => void;
}

interface AppState {
  blurhash: string;
  sourceUrl: string;
  width: { value: string, metric: 'px' | '%' };
  height: { value: string, metric: 'px' | '%' };
  resolutionY: number;
  resolutionX: number;
  punch: number;
}

export const AppProvider = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const [appState, dispatch] = useReducer(appReducer, {
    width: { value: '50', metric: '%' }, //TODO: here hardcode the width of the default image
    height: { value: '100', metric: '%' },
    resolutionY: 100,
    resolutionX: 100,
    punch: 1,
    blurhash: 'LHC$r{E2D*M{~VM{aeRk^*RjNHxa',
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

  return (
    <AppContext.Provider value={{
      ...appState,
      changeWidth,
      changeHeight,
      changeImage
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
      }
    case 'CHANGE_WIDTH':
      return {
        ...state,
        width: action.payload
      }
    case 'CHANGE_IMAGE':
      return {
        ...state,
        sourceUrl: action.payload.value
      }
    default:
      throw Error('Reached to unknown state in reducer');
  }
}

export const useGlobalContext = () => useContext(AppContext);

// NOTE: do we need useCallback in the functions