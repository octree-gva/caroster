import React from 'react';
import Icon from '@material-ui/core/Icon';
import FabMui from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';

const Fab = ({open = false, children = null, ...props}) => {
  const variant = children ? 'extended' : 'round';
  const classes = useStyles({open, variant});

  return (
    <div className={classes.container}>
      <FabMui
        className="tour_car_add1"
        color="secondary"
        variant={variant}
        {...props}
      >
        <Icon className={classes.icon}>add</Icon>
        {children}
      </FabMui>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: ({open}) => ({
    position: 'fixed',
    right: theme.spacing(3),
    transition: 'all 0.3s ease',
    bottom: open ? -theme.spacing(8) : theme.spacing(3),
    transform: open ? 'rotate(45deg)' : '',
    zIndex: theme.zIndex.speedDial,
  }),
  icon: ({variant}) => ({
    marginRight: variant === 'extended' ? theme.spacing(1) : theme.spacing(0),
  }),
}));

export default Fab;