import React from 'react';
import ReactTooltip from 'react-tooltip';

export const ResolutionTooltip = () => {
  return (
    <ReactTooltip id="resolution">
      <span>
        The resolution in which the decoded image will be rendered at. (Recommended 32px)
        <br />
        Large sizes (&gt;128px) will greatly decrease rendering performance.
        </span>
    </ReactTooltip>
  );
}

export const ComponentsTooltip = () => {
  return (
    <ReactTooltip id="components">
      <span>
        BlurHash must have between 1 and 9 components
      </span>
    </ReactTooltip>
  );
}

export const PunchTooltip = () => {
  return (
    <ReactTooltip id="punch">
      <span>
        Controls the "punch" value (~contrast) of the blurhash decoding algorithm.
      </span>
    </ReactTooltip>
  );
}