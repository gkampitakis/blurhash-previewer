import React, { ReactElement } from 'react';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import ImagePreviewer from '../components/Preview/ImagePreviewer';

export default function Home (): ReactElement {
  return (
    <main className="main_container">
      <ControlPanel />
      <ImagePreviewer />
    </main>
  );
}
