
import { toast } from 'react-toastify';

export function notification (msg: string, cb: Function) {
  const _toast = JSON.parse(localStorage.getItem('dark-theme') as string) === 'dark-theme' ? toast.dark : toast;
  
  return _toast(msg, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => cb()
  });
}
