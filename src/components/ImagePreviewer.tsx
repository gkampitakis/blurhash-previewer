import React, { ReactElement, useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
import HashedImage from './HashedImage';

export default function ImagePreviewer (): ReactElement {
  const { blurhash, url, changeWidth } = useGlobalContext();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageWidth = imageRef.current?.clientWidth;
    if (imageWidth)
      changeWidth(imageWidth?.toString(), 'px');
  }, [blurhash]); //FIXME: this works but seems hacky

  return (
    <section className="image_previewer">
      <div className="img_container">
        <img ref={imageRef} src={url} className="original" alt="Original Preview" />
      </div>
      <HashedImage />
    </section>
  );
}
