
import { toast } from 'react-toastify';

export function notification (msg: string, cb: Function) {
  return toast(msg, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => cb()
  });
}
