import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { notification } from './utils/notifications';
import { encodeImageToBlurhash } from './utils/blurhash';

const AppContext = createContext<DispatchActions & AppState & {
  blurhash: string;
  loading: boolean;
  url: string;
  punch: number;
  setUrl: Dispatch<SetStateAction<string>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
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
  changeResolution: (value: number, type: 'X' | 'Y') => void;
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
  const [edit, setEdit] = useState(false);
  const [punch, setPunch] = useState(0);
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1608070734841-1047b8c36726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxODUwMjV8MHwxfGFsbHw4fHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080');
  const [appState, dispatch] = useReducer(appReducer, {
    width: { value: '50', metric: '%' },
    height: { value: '100', metric: '%' },
    resolutionY: 100,
    resolutionX: 100,
    componentX: 4,
    componentY: 4
  });

  function changeWidth (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_WIDTH', payload: { value: value, metric: metric } });
  }

  function changeHeight (value: string, metric: 'px' | '%') {
    dispatch({ type: 'CHANGE_HEIGHT', payload: { value, metric: metric } });
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
        .catch(() => notification('😵 Something went wrong', () => { }))
        .finally(() => {
          setLoading(false);
          setEdit(false);
        });
    }

    if (edit) encodeWrapper();
  }, [url, appState.componentX, appState.componentY, edit]);

  return (
    <AppContext.Provider value={{
      ...appState,
      url,
      punch,
      loading,
      blurhash,
      setUrl,
      setEdit,
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
