import React from 'react';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.AppContent}>
        <p>Hello world !</p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
