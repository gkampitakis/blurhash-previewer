import React, { createContext, ReactElement, useContext, useReducer } from 'react';

const AppContext = createContext<DispatchActions & AppState>({} as any);

type Action =
  | { type: 'CHANGE_WIDTH', payload: { value: string } }
  | { type: 'CHANGE_HEIGHT', payload: { value: string } }
  | { type: 'CHANGE_IMAGE', payload: { value: string } };

interface DispatchActions {
  changeWidth: (value: string) => void;
  changeHeight: (value: string) => void;
  changeImage: (value: string) => void;
}

interface AppState {
  blurhash: string;
  sourceUrl: string;
  width: string;
  height: string;
  resolutionY: number;
  resolutionX: number;
  punch: number;
}

export const AppProvider = ({ children }: { children: ReactElement | ReactElement[] }): ReactElement => {
  const [appState, dispatch] = useReducer(appReducer, {
    width: '50', //TODO: add validation here up to 100 and up to zero
    height: '100',
    resolutionY: 100,
    resolutionX: 100,
    punch: 1,
    blurhash: 'LHC$r{E2D*M{~VM{aeRk^*RjNHxa',
    sourceUrl: 'https://images.unsplash.com/photo-1606851179426-eff6bb16ef41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxODUwMjV8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080'
  });


  function changeWidth (value: string) {
    dispatch({ type: 'CHANGE_WIDTH', payload: { value } });
  }

  function changeHeight (value: string) {
    dispatch({ type: 'CHANGE_HEIGHT', payload: { value } });
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
  switch (action.type) { //NOTE: those values here can be merged and have dynamic field
    case 'CHANGE_HEIGHT':
      return {
        ...state,
        height: action.payload.value
      }
    case 'CHANGE_WIDTH':
      return {
        ...state,
        width: action.payload.value
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
