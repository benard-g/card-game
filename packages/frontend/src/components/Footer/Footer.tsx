import { makeStyles } from '@material-ui/core';
import React from 'react';

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

  return (
    <footer className={styles.Footer}>
      <p>Made by Guillaume Benard</p>
      <a
        href="https://github.com/benard-g/card-game"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        <GithubIcon classes={{ img: styles.logo }} />
        View the project on Github
      </a>
    </footer>
  );
};

export default Footer;
