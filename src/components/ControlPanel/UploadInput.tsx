import React, { useRef, Dispatch, SetStateAction } from 'react';
import { TextInput, LoadingIcon } from '../General';

interface UploadInputProps {
  loading: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string>>;
}

export default function UploadInput ({
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
      {/* NOTE: components should move outside of uploadInput */}
      
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
