import React, { ReactElement } from 'react';
import { Blurhash } from 'react-blurhash';
import { useGlobalContext } from '../context';

export default function ImagePreviewer (): ReactElement {
  const { blurhash, sourceUrl, width, height, resolutionY, resolutionX, punch } = useGlobalContext();

  return (
    <section className="image_previewer">
      <div className="img_container">
        <img src={sourceUrl} className="original" alt="Original Preview" />
      </div>
      <div className="img_container">
        <Blurhash
          hash={blurhash}
          width={`${width}%`}
          height={`${height}%`}
          resolutionX={resolutionX}
          resolutionY={resolutionY}
          punch={punch}
        />
      </div>
    </section>
  );
}


//TODO: break into to components here as it doesn't need to load every time the 1st one