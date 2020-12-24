import React from 'react';
import { Blurhash } from 'react-blurhash';
import { useGlobalContext } from '../../context';

export default function HashedImage () {
  const { blurhash, width, height, resolutionY, resolutionX, punch } = useGlobalContext();

  return (
    <div className="img_container resizable">
      <Blurhash
        hash={blurhash}
        width={`${width.value}${width.metric}`}
        height={`${height.value}${height.metric}`}
        resolutionX={resolutionX + 1}
        resolutionY={resolutionY + 1}
        style={{ maxWidth: '100%' }}
        punch={punch}
      />
    </div>
  );
}
