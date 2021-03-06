import React from 'react';
import { useGlobalContext } from '../../context';
import HashedImage from './HashedImage';

export default function ImagePreviewer () {
  const { url } = useGlobalContext();

  return (
    <section className="image_previewer">
      <div className="img_container">
        <img src={url} className="original" alt="Original Preview" />
      </div>
      <HashedImage />
    </section>
  );
}
