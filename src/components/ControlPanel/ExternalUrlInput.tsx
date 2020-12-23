import React, { useState, ChangeEvent, useRef, Dispatch, SetStateAction, FormEvent, createRef } from 'react';
import TextInput from '../General/TextInput';
import { isValidURL } from '../../utils/validate';
import { FaUpload } from 'react-icons/fa';

type Timeout = ReturnType<typeof setTimeout>;
interface ExternalUrlInputProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string>>;
  loading: boolean;
};

export default function ExternalUrlInput ({ setEdit, setUrl, loading }: ExternalUrlInputProps) {
  const [externalURL, setExternalUrl] = useState('');
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const bouncer = useRef<Timeout | undefined>(undefined);

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    setExternalUrl(url);

    if (bouncer.current) {
      clearTimeout(bouncer.current);
    }

    if (url === '') {
      bouncer.current = undefined;
      setIsValid(true);
      return;
    }

    bouncer.current = setTimeout(() => {
      setIsValid(() => {
        const valid = isValidURL(url)
        setShow(valid);
        return valid;
      });

      bouncer.current = undefined;
    }, 750);
  }

  function changeImage (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!externalURL || !isValid) return;

    setEdit(true);
    setUrl(externalURL);
    setExternalUrl('');
  }

  return (
    <form onSubmit={changeImage}>
      <label htmlFor="external-url">External URL</label>
      {externalURL && isValid && show && <button><FaUpload type="submit" /></button>}
      <TextInput
        id="external-url"
        loading={loading}
        value={externalURL}
        placeholder={'https://bit.ly/2K8rTHr'}
        onChange={handleChange}
      />
      <div className="helper-text">
        <small className={`${!isValid && 'error'}`}>Invalid URL provided</small>
      </div>
    </form>
  );
}
