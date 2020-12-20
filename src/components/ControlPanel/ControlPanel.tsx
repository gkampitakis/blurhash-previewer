import React from 'react';
import BlurhashInput from './BlurhashInput';
import UploadInput from './UploadInput';
import ExternalUrlInput from './ExternalUrlInput';
import { useGlobalContext } from '../../context';
import { TextInput } from '../General';

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
    <section className="control_panel">
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="resolutionX">ResolutionX</label>
            <TextInput
              id="resolutionX"
              loading={loading}
              value={resolutionX}
              onChange={(e: any) => changeResolution(parseInt(e.target.value), 'X')}
            />
          </div>
          <div>
            <label htmlFor="resolutionY">ResolutionY</label>
            <TextInput
              id="resolutionY"
              loading={loading}
              value={resolutionY}
              onChange={(e: any) => changeResolution(parseInt(e.target.value), 'Y')}
            />
          </div>
          <div>
            <label htmlFor="punch">Punch</label>
            <TextInput
              id="punch"
              loading={loading}
              value={punch}
              onChange={(e: any) => changePunch(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="cp_container">
          <BlurhashInput
            blurhash={blurhash}
            setBlurhash={setBlurhash}
            loading={loading}
          />
        </div>
        <div className="cp_container">
          <UploadInput
            loading={loading}
            changeComponent={changeComponent}
            componentX={componentX}
            componentY={componentY}
            setEdit={setEdit}
            setUrl={setUrl}
          />
        </div>
        <div className="cp_container url-input">
          <ExternalUrlInput
            loading={loading}
            setEdit={setEdit}
            setUrl={setUrl}
          />
        </div>
      </div>
    </section>
  );
}
