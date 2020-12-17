import React, { ReactElement, useRef, useState, Dispatch } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useGlobalContext } from '../context';
import { isBlurhashValid } from '../blurhash';
import { toast } from 'react-toastify';

const copied = (cb: Dispatch<React.SetStateAction<boolean>>) => toast('Copied to clipboard', {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  onClose: () => cb(false)
});

const erred = (msg: string, cb: Dispatch<React.SetStateAction<boolean>>) => toast(`😵 ${msg}`, {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  onClose: () => cb(false)
});

export default function ControlPanel (): ReactElement {
  const {
    width,
    height,
    punch,
    blurhash,
    resolutionX,
    resolutionY,
    componentX,
    componentY,
    setBlurhash,
    changeImage,
    changePunch,
    changeWidth,
    changeHeight,
    changeComponent,
    changeResolution
  } = useGlobalContext();
  const uploadInput = useRef<HTMLInputElement>(null);
  const [validHash, setValidHash] = useState(true);
  const [inputHash, setInputHash] = useState(blurhash);
  const [isToastShown, setIsToastShown] = useState(false);

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
    if (isToastShown) return;

    setIsToastShown(true);

    navigator.clipboard.writeText(inputHash)
      .then(() => copied(setIsToastShown))
      .catch(() => erred('Copy failed', setIsToastShown));
  }

  return (
    <section className="control_panel">
      <h2>Control Panel</h2>
      <div className="center">
        <div className="cp_container">
          <div>
            <label htmlFor="width">Width</label>
            <input
              id="width"
              type="range"
              min="0"
              max="100"
              onChange={(e) => changeWidth(e.target.value, '%')}
              value={width.value}
            />
          </div>
          <div>
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
          <div>
            <label htmlFor="resolutionX">ResolutionX</label>
            <input
              id="resolutionX"
              type="text"
              value={resolutionX}
              onChange={(e) => changeResolution(parseInt(e.target.value), 'X')}
            />
          </div>
          <div>
            <label htmlFor="resolutionY">ResolutionY</label>
            <input
              id="resolutionY"
              type="text"
              value={resolutionY}
              onChange={(e) => changeResolution(parseInt(e.target.value), 'Y')}
            />
          </div>
          <div>
            <label htmlFor="punch">Punch</label>
            <input
              id="punch"
              type="text"
              value={punch}
              onChange={(e) => changePunch(parseInt(e.target.value))}
            />
          </div>
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
        </div>
      </div>
    </section>
  );
}
