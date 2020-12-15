import React, { ReactElement, useEffect, useRef } from 'react';
import { Blurhash } from 'react-blurhash';
import { useGlobalContext } from '../context';

export default function ImagePreviewer (): ReactElement {
  const { blurhash, sourceUrl, width, height, resolutionY, resolutionX, punch, changeWidth } = useGlobalContext();
  const imageRef = useRef<any>('');

  useEffect(() => {
    const imageWidth = imageRef.current.clientWidth;
    if (imageRef.current.clientWidth)
      changeWidth(imageWidth, 'px');
  }, [sourceUrl]);

  return (
    <section className="image_previewer">
      <div className="img_container">
        <img ref={imageRef} src={sourceUrl} className="original" alt="Original Preview" />
      </div>
      <div className="img_container">
        <Blurhash
          hash={blurhash}
          width={`${width.value}${width.metric}`}
          height={`${height.value}${height.metric}`}
          resolutionX={resolutionX}
          resolutionY={resolutionY}
          punch={punch}
        />
      </div>
    </section>
  );
}

//NOTE: add dynamic getting original images width and adjusting blurhash
//TODO: break into to components here as it doesn't need to load every time the 1st one