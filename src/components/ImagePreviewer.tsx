import React, { ReactElement, useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
import HashedImage from './HashedImage';

export default function ImagePreviewer (): ReactElement {
  const { sourceUrl, changeWidth } = useGlobalContext();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageWidth = imageRef.current?.clientWidth;
    if (imageWidth)
      changeWidth(imageWidth?.toString(), 'px');
  }, [sourceUrl]); //FIXME:

  return (
    <section className="image_previewer">
      <div className="img_container">
        <img ref={imageRef} src={sourceUrl} className="original" alt="Original Preview" />
      </div>
      <HashedImage />
    </section>
  );
}
