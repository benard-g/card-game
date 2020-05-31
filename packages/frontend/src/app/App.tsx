import { makeStyles } from '@material-ui/core';
import React from 'react';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const useStyles = makeStyles({
  App: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  AppContent: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App: React.FC = () => {
  const styles = useStyles();

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
