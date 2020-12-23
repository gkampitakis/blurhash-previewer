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
    <section className="cp">
      <div className="center">
        <div>
          <div className="controls">
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
              <label htmlFor="punch">Punch</label>
              <TextInput
                id="punch"
                loading={loading}
                value={punch}
                onChange={(e) => changePunch(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="components">
            <label htmlFor="resolutionX">Resolution</label>
            <TextInput
              id="resolutionX"
              loading={loading}
              value={resolutionX}
              onChange={(e) => changeResolution(parseInt(e.target.value), 'X')}
            />
            <p>x</p>
            <TextInput
              id="resolutionY"
              loading={loading}
              value={resolutionY}
              onChange={(e) => changeResolution(parseInt(e.target.value), 'Y')}
            />
          </div>
          <div className="components">
            <label htmlFor="componentX">Components</label>
            <TextInput
              id="componentX"
              loading={loading}
              value={componentX}
              onChange={(e) => changeComponent(parseInt(e.target.value), 'X')}
            />
            <p>x</p>
            <TextInput
              id="componentY"
              loading={loading}
              value={componentY}
              onChange={(e) => changeComponent(parseInt(e.target.value), 'Y')}
            />
          </div>
        </div>
        <hr />
        <div>
          <BlurhashInput
            blurhash={blurhash}
            setBlurhash={setBlurhash}
            loading={loading}
          />
        </div>
        <div>
          <UploadInput
            loading={loading}
            setEdit={setEdit}
            setUrl={setUrl}
          />
        </div>
        <p>or</p>
        <div className="url-input">
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
