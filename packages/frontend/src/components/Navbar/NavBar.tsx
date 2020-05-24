import Button from '@material-ui/core/Button';
import React from 'react';

import LogoIcon from '../icons/LogoIcon/LogoIcon';

import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Left part  */}
      <div className={styles.subContainer}>
        <LogoIcon className={styles.logo} />
        <h1 className={styles.title}>Shipwreck</h1>
      </div>

      {/* Right part */}
      <div className={styles.subContainer}>
        <Button variant="contained" className={styles.loginButton}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
