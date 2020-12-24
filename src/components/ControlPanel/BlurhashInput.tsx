import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import TextInput from '../General/TextInput';
import { BiCopy } from 'react-icons/bi';
import { notification, isBlurhashValid } from '../../utils';

interface BlurhashInputProps {
  blurhash: string;
  loading: boolean;
  setBlurhash: Dispatch<SetStateAction<string>>;
}

export default function BlurhashInput ({ blurhash, setBlurhash, loading }: BlurhashInputProps) {
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
    <>
      <label htmlFor="blurhash-input">Blurhash</label>
      <article className="blurhash-input">
        <TextInput
          id="blurhash-input"
          loading={loading}
          value={inputHash}
          className={`${validHash ? 'valid' : 'invalid'}`}
          onChange={blurhashInput}
        />
        <BiCopy onClick={copy2Clipboard} />
      </article>
    </>
  )
}
