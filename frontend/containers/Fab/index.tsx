import React from 'react';
import {useTheme} from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import FabMui, {FabProps} from '@mui/material/Fab';
import useMinimizedFab from '../../hooks/useMinimizedFab';

const Fab = ({children = null, ...props}: FabProps) => {
  const theme = useTheme();
  const isFabMinimized = useMinimizedFab();
  const variant = !isFabMinimized && children ? 'extended' : 'circular';

  return (
    <FabMui
      color="secondary"
      variant={variant}
      {...props}
      sx={{
        transition: 'all 0.1s ease',
        position: 'fixed',
        right: theme.spacing(3),
        bottom: theme.spacing(3),

        [theme.breakpoints.down('md')]: {
          right: theme.spacing(2),
          bottom: theme.spacing(9),
        },
      }}
    >
      <Icon
        sx={{
          marginRight:
            variant === 'extended' ? theme.spacing(1) : theme.spacing(0),
        }}
      >
        add
      </Icon>
      {!isFabMinimized && children}
    </FabMui>
  );
};

export default Fab;
