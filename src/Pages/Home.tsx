import React, { ReactElement } from 'react';
import ControlPanel from '../components/ControlPanel';
import ImagePreviewer from '../components/ImagePreviewer';

export default function Home (): ReactElement {
  return (
    <main className="main_container">
      <ControlPanel />
      <ImagePreviewer />
    </main>
  );
}
