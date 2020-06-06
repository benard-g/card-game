import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Navbar from '../components/Navbar';

import Routes from './Routes';

const useStyles = makeStyles({
  App: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const AppContextWrapper: React.FC = (props) => {
  const { children } = props;

  return <BrowserRouter>{children}</BrowserRouter>;
};

const AppReady: React.FC = () => {
  const styles = useStyles();

  return (
    <AppContextWrapper>
      <div className={styles.App}>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    </AppContextWrapper>
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
