import React from 'react';
import Icon from '@material-ui/core/Icon';
import FabMui from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';

const Fab = ({open, ...props}) => {
  const classes = useStyles({open});

  return (
    <div className={classes.container}>
      <FabMui color="secondary" {...props}>
        <Icon>add</Icon>
      </FabMui>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: ({open}) => ({
    position: 'fixed',
    bottom: open ? -theme.spacing(8) : theme.spacing(3),
    right: theme.spacing(3),
    transition: 'all 0.3s ease',
    transform: open ? 'rotate(45deg)' : '',
    zIndex: theme.zIndex.speedDial,
  }),
}));

export default Fab;
