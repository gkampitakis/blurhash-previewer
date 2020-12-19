import React, { useState, ChangeEvent, useRef, Dispatch, SetStateAction, FormEvent } from 'react';
import { isValidURL } from '../utils/validate';
import { FaUpload } from 'react-icons/fa';

type Timeout = ReturnType<typeof setTimeout>;
interface ExternalUrlInputProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string>>;
};

export default function ExternalUrlInput ({ setEdit, setUrl }: ExternalUrlInputProps) {
  const [externalURL, setExternalUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const bouncer = useRef<Timeout | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;

    if (bouncer.current) {
      clearTimeout(bouncer.current);
    }

    if (url === '') {
      bouncer.current = undefined;
      setExternalUrl('');
      setIsValid(true);
      return;
    }

    bouncer.current = setTimeout(() => {
      setExternalUrl(url);
      setIsValid(() => isValidURL(url));

      bouncer.current = undefined;
    }, 750);
  }

  function changeImage (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!externalURL || !isValid) return;

    setEdit(true);
    setUrl(externalURL);
    setExternalUrl('');
    inputRef.current!.value = '';
  }

  return (
    <form onSubmit={changeImage}>
      <label htmlFor="external-url">External URL</label>
      {externalURL && isValid && <button><FaUpload type="submit" /></button>}
      <input
        id="external-url"
        type="text"
        ref={inputRef}
        placeholder={'https://bit.ly/2K8rTHr'}
        onChange={handleChange}
      />
      <div className="helper-text">
        <small className={`${!isValid && 'error'}`}>Invalid URL provided</small>
      </div>
    </form>
  );
}
