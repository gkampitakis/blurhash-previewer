import React, { ReactElement, useState } from 'react';
import { useGlobalContext } from '../context';

export default function ControlPanel (): ReactElement {
  const { width, height, blurhash, punch, resolutionX, resolutionY, changeImage, changeHeight, changeWidth } = useGlobalContext();

  //TODO: add here validation and parsing
  //TODO: it could be a slider
  //TODO: add validation on blurhash input and add copy button
  //TODO: add tooltip for descriptions as well

  function uploadImage (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => changeImage(reader.result as string);
    reader.readAsDataURL(file)
  }

  return (
    <section className="control_panel">
      <h2>Control Panel</h2>
      <label htmlFor="width">Width</label>
      <input value={width} id="width" type="text" onChange={(e) => changeWidth(e.target.value)} />
      <label htmlFor="height">Height</label>
      <input value={height} id="height" onChange={(e) => changeHeight(e.target.value)} type="text" />
      {/* <label htmlFor="blurhash">Blurhash</label>
      <input value={blurhash} id="blurhash" type="text" />
      <label htmlFor="resolutionX">ResolutionX</label>
      <input value={resolutionX} id="resolutionX" type="text" />
      <label htmlFor="resolutionY">ResolutionY</label>
      <input value={resolutionY} id="resolutionY" type="text" />
      <label htmlFor="punch">Punch</label>
      <input value={punch} id="punch" type="text" /> */}
      <input type="file" accept="image/*" onChange={uploadImage} />
    </section>
  );
}
