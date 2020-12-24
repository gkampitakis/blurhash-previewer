import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef
} from 'react';
import { notification, encodeImageToBlurhash } from './utils';

const AppContext = createContext<DispatchActions & AppState & {
  blurhash: string;
  loading: boolean;
  url: string;
  punch: number;
  setUrl: Dispatch<SetStateAction<string>>;
  setBlurhash: Dispatch<SetStateAction<string>>
}>({} as any);

type Action =
  | { type: 'CHANGE_WIDTH', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_HEIGHT', payload: { value: string; metric: 'px' | '%' } }
  | { type: 'CHANGE_COMPONENT', payload: { value: number; type: 'X' | 'Y' } }
  | { type: 'CHANGE_RESOLUTION', payload: { value: number; type: 'X' | 'Y' } };

interface DispatchActions {
  changePunch: (value: string) => void;
  changeWidth: (width: string, metric: 'px' | '%') => void;
  changeHeight: (height: string, metric: 'px' | '%') => void;
  changeComponent: (value: number, type: 'X' | 'Y') => void;
  changeResolution: (value: string, type: 'X' | 'Y') => void;
}

interface AppState {
  width: { value: string, metric: 'px' | '%' };
  height: { value: string, metric: 'px' | '%' };
  resolutionY: number;
  resolutionX: number;
  componentX: number;
  componentY: number
}

export const AppProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [blurhash, setBlurhash] = useState('LPKBm@t6.TR*$yROxaoeI@aeVrV@');
  const [loading, setLoading] = useState(false);
  const [punch, setPunch] = useState(1);
  const firstRender = useRef(true);
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1608070734841-1047b8c36726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxODUwMjV8MHwxfGFsbHw4fHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080');
  const [appState, dispatch] = useReducer(appReducer, {
    width: { value: '50', metric: '%' },
    height: { value: '100', metric: '%' },
    resolutionY: 32,
    resolutionX: 32,
    componentX: 4,
    componentY: 4
  });

  function changeWidth (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_WIDTH', payload: { value: value, metric: metric } });
  }

  function changeHeight (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_HEIGHT', payload: { value, metric: metric } });
  }

  function changeResolution (input: string, type: 'X' | 'Y') {
    let value = parseInt(input);
    if (Number.isNaN(value)) value = 0;

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

  function changePunch (input: string) {
    let value = parseInt(input);
    if (Number.isNaN(value)) value = 0

    setPunch(value);
  }

  useEffect(() => {
    async function encodeWrapper () {
      setLoading(true);
      encodeImageToBlurhash(url, appState.componentX, appState.componentY)
        .then(hash => setBlurhash(hash))
        .catch((error) => {
          console.error(error);
          notification('😵 Something went wrong', () => { })
        })
        .finally(() => setLoading(false));
    }

    if (!firstRender.current) {
      encodeWrapper();
    } else {
      firstRender.current = false;
    }
  }, [url, appState.componentX, appState.componentY]);

  return (
    <AppContext.Provider value={{
      ...appState,
      url,
      punch,
      loading,
      blurhash,
      setUrl,
      setBlurhash,
      changeWidth,
      changeHeight,
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
    default:
      throw Error('Reached to unknown state in reducer');
  }
}

export const useGlobalContext = () => useContext(AppContext);
