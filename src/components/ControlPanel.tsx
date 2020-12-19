import React from 'react';
import BlurhashInput from './BlurhashInput';
import UploadInput from './UploadInput';
import ExternalUrlInput from './ExternalUrlInput';
import { useGlobalContext } from '../context';

export default function ControlPanel () {
  const {
    width,
    loading,
    height,
    punch,
    blurhash,
    resolutionX,
    resolutionY,
    componentX,
    componentY,
    setBlurhash,
    setEdit,
    setUrl,
    changePunch,
    changeWidth,
    changeHeight,
    changeComponent,
    changeResolution
  } = useGlobalContext();

  return (
    <>
      {!loading && <section className="control_panel">
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
            <BlurhashInput
              blurhash={blurhash}
              setBlurhash={setBlurhash}
            />
          </div>
          <div className="cp_container">
            <UploadInput
              changeComponent={changeComponent}
              componentX={componentX}
              componentY={componentY}
              setEdit={setEdit}
              setUrl={setUrl}
            />
          </div>
          <div className="cp_container url-input">
            <ExternalUrlInput
              setEdit={setEdit}
              setUrl={setUrl}
            />
          </div>
        </div>
      </section>}
    </>
  );
}
