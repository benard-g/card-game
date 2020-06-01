import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LogoIcon from '../icons/LogoIcon/LogoIcon';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#276fbf',
    height: '50px',
    padding: '0 10px',
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: '30px',
    marginRight: '8px',
  },
  title: {
    fontFamily: 'KurriIsland',
    fontSize: '1.3rem',
    letterSpacing: '0.08rem',
    marginTop: '5px',
  },
  loginButton: {
    padding: '0.3rem 1.1rem',
    backgroundColor: '#9dd863 !important',
  },
});

const Navbar: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      {/* Left part  */}
      <div className={styles.subRoot}>
        <LogoIcon classes={{ img: styles.logo }} />
        <h1 className={styles.title}>{t('components.Navbar.title')}</h1>
      </div>

      {/* Right part */}
      <div className={styles.subRoot}>
        <Button variant="contained" classes={{ contained: styles.loginButton }}>
          {t('components.Navbar.loginButton')}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
