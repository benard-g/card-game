import React from 'react';

import GithubIcon from '../icons/GithubIcon';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.Footer}>
      <p>Made by Guillaume Benard</p>
      <a
        href="https://github.com/benard-g/card-game"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        <GithubIcon className={styles.logo} /> View the project on Github
      </a>
    </footer>
  );
};

export default Footer;
