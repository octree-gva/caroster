import React from 'react';
import Icon from '@mui/material/Icon';
import FabMui, {FabProps} from '@mui/material/Fab';
import useMinimizedFab from '../../hooks/useMinimizedFab';
import theme from '../../theme';

const Fab = ({
  children = null,
  noDrawer = false,
  ...props
}: FabProps & {noDrawer?: boolean}) => {
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
          bottom: noDrawer ? theme.spacing(1) : theme.spacing(12),
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
