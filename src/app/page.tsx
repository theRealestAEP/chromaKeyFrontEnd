'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { UploadForm } from '../components/upload';
import { GridStatus } from '../components/status'

export default function Home() {

  return (
    <div>
      <div>
        <header className='header-container'>
          <h1>Green Screen Remover</h1>
          <p>Converts your green screen video (.mp4) (.avi) etc... to a webm with a transparent background</p>
        </header>
        <div className='main-container'>
          <div className='upload-box '>
            <UploadForm />
          </div>
          <div className=''>
            <GridStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

