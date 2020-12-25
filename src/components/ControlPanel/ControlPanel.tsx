import React from 'react';
import BlurhashInput from './BlurhashInput';
import UploadInput from './UploadInput';
import ExternalUrlInput from './ExternalUrlInput';
import ComponentsInput from './ComponentsInput';
import { useGlobalContext } from '../../context';
import { TextInput } from '../General';
import { BiInfoCircle } from 'react-icons/bi';
import { ResolutionTooltip, PunchTooltip } from '../General/Tooltips';

export default function ControlPanel () {
  const {
    width,
    loading,
    height,
    punch,
    blurhash,
    resolutionX,
    resolutionY,
    setBlurhash,
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
              <PunchTooltip />
              <label htmlFor="punch">Punch <BiInfoCircle data-tip data-for="punch" /></label>
              <TextInput
                id="punch"
                loading={loading}
                value={punch}
                onChange={(e) => changePunch(e.target.value)}
              />
            </div>
          </div>
          <div className="components">
            <ResolutionTooltip />
            <label>Resolution <BiInfoCircle data-tip data-for="resolution" /></label>
            <TextInput
              id="resolutionX"
              loading={loading}
              value={resolutionX}
              onChange={(e) => changeResolution(e.target.value, 'X')}
            />
            <p>x</p>
            <TextInput
              id="resolutionY"
              loading={loading}
              value={resolutionY}
              onChange={(e) => changeResolution(e.target.value, 'Y')}
            />
          </div>
          <ComponentsInput
            changeComponent={changeComponent}
            loading={loading}
          />
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
            setUrl={setUrl}
          />
        </div>
        <p>or</p>
        <div className="url-input">
          <ExternalUrlInput
            loading={loading}
            setUrl={setUrl}
          />
        </div>
      </div>
    </section>
  );
}
