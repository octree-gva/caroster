import React from 'react';
import Icon from '@material-ui/core/Icon';
import FabMui from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';

const Fab = ({children = null, ...props}) => {
  const variant = children ? 'extended' : 'round';
  const classes = useStyles({variant});

  return (
    <FabMui
      color="secondary"
      variant={variant}
      {...props}
      className={classes.fab}
    >
      <Icon className={classes.icon}>add</Icon>
      {children}
    </FabMui>
  );
};

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(2),
      bottom: theme.spacing(9),
    },
  },
  icon: ({variant}) => ({
    marginRight: variant === 'extended' ? theme.spacing(1) : theme.spacing(0),
  }),
}));

export default Fab;
