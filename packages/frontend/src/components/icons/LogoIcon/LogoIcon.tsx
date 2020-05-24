import React from 'react';
import classnames from 'classnames';

import Logo from '../../../assets/images/logo.svg';

import styles from './LogoIcon.module.scss';

interface Props {
  className?: string;
}

const LogoIcon: React.FC<Props> = (props) => {
  const { className } = props;
  const classNames = classnames(styles.LogoIcon, className || undefined);

  return <img src={Logo} alt="Logo" className={classNames} />;
};

export default LogoIcon;
