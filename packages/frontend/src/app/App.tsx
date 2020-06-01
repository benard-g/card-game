import { makeStyles } from '@material-ui/core';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
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

const AppReady: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.AppContent}>
        <p>{t('app.title')}</p>
      </div>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppReady />
    </Suspense>
  );
};

export default App;
