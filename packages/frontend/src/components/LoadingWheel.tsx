import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

interface Props {
  color: string;
  size: number | string;
}

const LoadingWheel: React.FC<Props> = (props) => {
  const { color, size } = props;
  const theme = createMuiTheme({
    palette: { primary: { main: color } },
  });

  return (
    <ThemeProvider theme={theme}>
      <CircularProgress color="primary" size={size} />
    </ThemeProvider>
  );
};

export default LoadingWheel;
