import React, { useRef, Dispatch, SetStateAction } from 'react';
import { TextInput, LoadingIcon } from '../General';

interface UploadInputProps {
  componentX: number;
  componentY: number;
  loading: boolean;
  changeComponent: (value: number, type: 'X' | 'Y') => void;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string>>;
}

export default function UploadInput ({
  changeComponent,
  componentX,
  componentY,
  loading,
  setEdit,
  setUrl }: UploadInputProps) {
  const uploadInput = useRef<HTMLInputElement>(null);

  function uploadImage (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setUrl(reader.result as string);
      setEdit(true);
    }
    reader.readAsDataURL(file)
  }

  function triggerInput () {
    uploadInput.current?.click();
  }

  return (
    <article className="upload-input">
      <div className="components">
        <label htmlFor="componentX">Components</label>
        <TextInput
          id="componentX"
          loading={loading}
          value={componentX}
          onChange={(e: any) => changeComponent(parseInt(e.target.value), 'X')}
        />
        <p>x</p>
        <TextInput
          id="componentY"
          loading={loading}
          value={componentY}
          onChange={(e: any) => changeComponent(parseInt(e.target.value), 'Y')}
        />
      </div>
      <input
        ref={uploadInput}
        className="upload"
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
      <button
        className="upload-btn"
        onClick={triggerInput}
        disabled={loading}
      >
        {loading ? <LoadingIcon /> : 'Upload'}
      </button>
    </article>
  );
}
