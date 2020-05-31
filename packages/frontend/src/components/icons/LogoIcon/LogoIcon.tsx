import { makeStyles } from '@material-ui/core';
import React from 'react';

import { PropsWithStyle } from '../../utils/PropsWithStyle';

import Logo from './logo.svg';

const useStyles = makeStyles({
  img: {
    height: '50px',
  },
});

type Props = PropsWithStyle<typeof useStyles>;

const LogoIcon: React.FC<Props> = (props) => {
  const styles = useStyles(props);

  return <img src={Logo} alt="Logo" className={styles.img} />;
};

export default LogoIcon;
