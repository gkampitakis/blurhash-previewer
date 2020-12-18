import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BiCopy } from 'react-icons/bi';
import { isBlurhashValid } from '../blurhash';
import { toast } from 'react-toastify';

interface BlurhashInputProps {
  blurhash: string;
  setBlurhash: Dispatch<SetStateAction<string>>;
}

export default function BlurhashInput ({ blurhash, setBlurhash }: BlurhashInputProps) {
  const [validHash, setValidHash] = useState(true);
  const [inputHash, setInputHash] = useState(blurhash);
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    setInputHash(blurhash);
  }, [blurhash]);

  function blurhashInput (e: ChangeEvent<HTMLInputElement>) {
    const hashValue = e.target.value;
    setInputHash(hashValue);

    const isValid = isBlurhashValid(hashValue).result;
    setValidHash(_ => isValid);

    if (isValid) setBlurhash(hashValue);
  }

  function copy2Clipboard () {
    if (isToastShown) return;

    setIsToastShown(true);

    navigator.clipboard.writeText(inputHash)
      .then(() => copied(setIsToastShown))
      .catch(() => erred('Copy failed', setIsToastShown));
  }

  return (
    <div className="blurhash-input">
      <input
        value={inputHash}
        type="text"
        className={`${validHash ? 'valid' : 'invalid'}`}
        onChange={blurhashInput}
      />
      <BiCopy onClick={copy2Clipboard} />
    </div>
  )
}

function copied (cb: Dispatch<SetStateAction<boolean>>) {
  return toast('Copied to clipboard', {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => cb(false)
  });
}

function erred (msg: string, cb: Dispatch<SetStateAction<boolean>>) {
  return toast(`😵 ${msg}`, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => cb(false)
  });
} 