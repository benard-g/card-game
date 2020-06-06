import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  Login: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Login: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.Login}>
      <p>TODO: Login page</p>
    </div>
  );
};

export default Login;
