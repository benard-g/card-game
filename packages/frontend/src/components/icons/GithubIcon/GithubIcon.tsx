import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { PropsWithStyle } from '../../../utils/react/PropsWithStyle';

import Logo from './github.png';

const useStyles = makeStyles({
  img: {
    height: '32px',
  },
});

type Props = PropsWithStyle<typeof useStyles>;

const LogoIcon: React.FC<Props> = (props) => {
  const styles = useStyles(props);

  return <img src={Logo} alt="Github" className={styles.img} />;
};

export default LogoIcon;
