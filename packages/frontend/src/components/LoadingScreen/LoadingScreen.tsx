import { makeStyles } from '@material-ui/core';
import React from 'react';

import LoadingWheel from '../LoadingWheel';

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <LoadingWheel size="4rem" color="#fb8c00" />
    </div>
  );
};

export default LoadingScreen;
