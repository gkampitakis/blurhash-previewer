import React from 'react';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import ImagePreviewer from '../components/Preview/ImagePreviewer';

export default function Home () {
  return (
    <main className="main">
      <ControlPanel />
      <ImagePreviewer />
    </main>
  );
}
