import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BiCopy } from 'react-icons/bi';
import { isBlurhashValid } from '../utils/blurhash';
import { notification } from '../utils/notifications';

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
      .then(() => notification('Copied to clipboard', () => setIsToastShown(false)))
      .catch((e) => notification(`😵 ${e.message}`, () => setIsToastShown(false)));
  }

  return (
    <article className="blurhash-input">
      <input
        value={inputHash}
        type="text"
        className={`${validHash ? 'valid' : 'invalid'}`}
        onChange={blurhashInput}
      />
      <BiCopy onClick={copy2Clipboard} />
    </article>
  )
}
