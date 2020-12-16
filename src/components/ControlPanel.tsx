import React, { ReactElement, useRef, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useGlobalContext } from '../context';
import { isBlurhashValid } from '../blurhash';

export default function ControlPanel (): ReactElement {
  const { width, height, blurhash, setBlurhash, punch, resolutionX, resolutionY, changeImage, changeHeight, changeWidth } = useGlobalContext();
  const uploadInput = useRef<HTMLInputElement>(null);
  const [validHash, setValidHash] = useState(true);
  const [inputHash, setInputHash] = useState(blurhash);

  function uploadImage (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      changeImage(reader.result as string);
      // (async () => {
      //   console.log(await encodeImageToBlurhash(reader.result as string));
      // })();

    }
    reader.readAsDataURL(file)
  }

  function triggerInput () {
    uploadInput.current?.click();
  }

  function blurhashInput (e: React.ChangeEvent<HTMLInputElement>) {
    const hashValue = e.target.value;
    setInputHash(hashValue);

    const isValid = isBlurhashValid(hashValue).result;
    setValidHash(_ => isValid);

    if (isValid) setBlurhash(hashValue);
  }

  function copy2Clipboard () {
    navigator.clipboard.writeText(inputHash)
      .then(console.log)
      .catch(console.error);
  }

  return (
    <section className="control_panel">
      <h2>Control Panel</h2>
      <div className="center">
        <div className="cp_container">
          <label htmlFor="width">Width</label>
          <input
            id="width"
            type="range"
            min="0"
            max="100"
            onChange={(e) => changeWidth(e.target.value, '%')}
            value={width.value}
          />
          <label htmlFor="height">Height</label>
          <input
            id="height"
            type="range"
            min="0"
            max="100"
            value={height.value}
            onChange={(e) => changeHeight(e.target.value, '%')}
          />
        </div>
        <div className="cp_container">
          <div className="blurhash-wrapper">
            <input
              value={inputHash}
              type="text"
              className={`${validHash ? 'valid' : 'invalid'}`}
              onChange={blurhashInput}
            />
            <BiCopy onClick={copy2Clipboard} />
          </div>
        </div>
        <div className="cp_container">
          <input
            ref={uploadInput}
            className="upload"
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />
          <button className="upload-btn" onClick={triggerInput}>Upload</button>
        </div>
        {/* <label htmlFor="resolutionX">ResolutionX</label>
      <input value={resolutionX} id="resolutionX" type="text" />
      <label htmlFor="resolutionY">ResolutionY</label>
      <input value={resolutionY} id="resolutionY" type="text" />
      <label htmlFor="punch">Punch</label>
      <input value={punch} id="punch" type="text" /> */}
      </div>
    </section>
  );
}
