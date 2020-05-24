import React from 'react';
import classnames from 'classnames';

import Logo from '../../../assets/images/github.png';

import styles from './GithubIcon.module.scss';

interface Props {
  className?: string;
}

const LogoIcon: React.FC<Props> = (props) => {
  const { className } = props;
  const classNames = classnames(styles.GithubIcon, className || undefined);

  return <img src={Logo} alt="Github" className={classNames} />;
};

export default LogoIcon;
