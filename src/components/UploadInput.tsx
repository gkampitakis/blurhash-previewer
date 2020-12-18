import React, { useRef, Dispatch, SetStateAction } from 'react';

interface UploadInputProps {
  componentX: number;
  componentY: number;
  changeComponent: (value: number, type: 'X' | 'Y') => void;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUrl: Dispatch<SetStateAction<string>>;
}

export default function UploadInput ({
  changeComponent,
  componentX,
  componentY,
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
    <article>
      <input
        id="componentX"
        type="text"
        value={componentX}
        onChange={(e) => changeComponent(parseInt(e.target.value), 'X')}
      />
      <input
        id="componentY"
        type="text"
        value={componentY}
        onChange={(e) => changeComponent(parseInt(e.target.value), 'Y')}
      />
      <input
        ref={uploadInput}
        className="upload"
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
      <button className="upload-btn" onClick={triggerInput}>Upload</button>
    </article>
  );
}
