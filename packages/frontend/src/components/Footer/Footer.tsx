import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import GithubIcon from '../icons/GithubIcon';

const useStyles = makeStyles({
  Footer: {
    fontSize: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0',
  },
  githubLink: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: '1rem',
    marginRight: '0.3rem',
  },
});

const Footer: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <footer className={styles.Footer}>
      <p>{t('components.Footer.madeBy')}</p>
      <a
        href="https://github.com/benard-g/card-game"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        <GithubIcon classes={{ img: styles.logo }} />
        {t('components.Footer.viewOnGithub')}
      </a>
    </footer>
  );
};

export default Footer;
