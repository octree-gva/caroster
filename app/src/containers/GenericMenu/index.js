import React, {useState, useEffect, useMemo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import GenericToolbar from './Toolbar';
const GenericMenu = ({title, actions = []}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const validActions = useMemo(() => actions.filter(Boolean), [actions]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar
      position="static"
      color="primary"
      className={classes.appbar}
      id="Menu"
    >
      <Toolbar>
        <div className={classes.name}>
          <Typography variant="h6" noWrap id="MenuHeaderTitle">
            {title}
          </Typography>
        </div>
        {validActions.length > 0 && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              id="MenuMoreInfo"
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <Icon>more_vert</Icon>
            </IconButton>

            <GenericToolbar
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              actions={validActions}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  appbar: {
    overflow: 'hidden',
    height: theme.mixins.toolbar.minHeight,
    transition: 'height 0.3s ease',
    zIndex: theme.zIndex.appBar,
    position: 'fixed',
    top: 0,
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(0),
  },
}));

export default GenericMenu;
