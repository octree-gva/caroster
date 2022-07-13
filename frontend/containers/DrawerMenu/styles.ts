import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawer: () => ({
    width: '85px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

    '& .MuiDrawer-paper': {
      paddingTop: theme.mixins.toolbar.minHeight,
      zIndex: theme.zIndex.appBar - 1,
      width: '84px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      left: 0,
      top: 0,
      backgroundColor: theme.overrides.MuiAppBar.colorPrimary.backgroundColor,
      color: theme.overrides.MuiAppBar.colorPrimary.color,
      overflowX: 'hidden',
      position: 'static',

      [theme.breakpoints.down('sm')]: {
        bottom: 0,
        top: 'auto',
        paddingTop: 0,
        height: '56px',
        width: '100%',
        flexDirection: 'row',
      },
    },
  }),
  icon: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  drawerMenuButton: ({active}) => ({
    display: 'block',
    position: 'relative',
    minWidth: 0,
    margin: 0,
    width: '84px',
    height: '84px',
    textAlign: 'center',
    color: active
      ? theme.palette.background.default
      : 'rgba(256, 256, 256, .76)',

    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      height: '56px',
      width: '100%',
    },
  }),
  drawerText: {
    position: 'relative',
    fontSize: '11px',
    lineHeight: '1.1em',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'none',

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'nowrap',
      lineHeight: '.5em',
    },
  },
}));

export default useStyles;
