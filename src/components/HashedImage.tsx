import React, { ReactElement } from 'react';
import { Blurhash } from 'react-blurhash';
import { useGlobalContext } from '../context';

export default function HashedImage (): ReactElement {
  const { blurhash, width, height, resolutionY, resolutionX, punch } = useGlobalContext();  

  return (
    <div className="img_container resizable">
      <Blurhash
        hash={blurhash}
        width={`${width.value}${width.metric}`}
        height={`${height.value}${height.metric}`}
        resolutionX={resolutionX}
        resolutionY={resolutionY}
        style={{ maxWidth: '100%' }}
        punch={punch}
      />
    </div>
  );
}
