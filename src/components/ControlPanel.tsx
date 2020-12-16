import React, { ReactElement, useRef } from 'react';
import { useGlobalContext } from '../context';
import { encodeImageToBlurhash } from '../blurhash';

export default function ControlPanel (): ReactElement {
  const { width, height, blurhash, punch, resolutionX, resolutionY, changeImage, changeHeight, changeWidth } = useGlobalContext();
  const uploadInput = useRef<HTMLInputElement>(null);
  //TODO: add here validation and parsing
  //TODO: it could be a slider
  //TODO: add validation on blurhash input and add copy button
  //TODO: add tooltip for descriptions as well

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
              value={blurhash}
              type="text"
              className="valid"
            />
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

//BUG: with image width
//BUG: with unusable ui on image calculation