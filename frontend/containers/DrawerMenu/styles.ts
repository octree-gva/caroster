import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawer: ({bannerOffset}) => ({
    width: '85px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      paddingTop: theme.mixins.toolbar.minHeight + bannerOffset,
      zIndex: theme.zIndex.appBar - 1,
      width: '84px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      left: 0,
      top: 0,
      backgroundColor: theme.overrides.MuiAppBar.colorPrimary.backgroundColor,
      color: theme.overrides.MuiAppBar.colorPrimary.color,

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
  button: {
    width: '100%',
    height: '100%',
    minWidth: 0,
    padding: 0,
    borderRadius: '50%',
  },
  drawerMenuItem: ({active}) => ({
    margin: `${theme.spacing(3)}px auto`,
    width: `calc(${theme.mixins.toolbar.minHeight}px - 16px)`,
    height: `calc(${theme.mixins.toolbar.minHeight}px - 16px)`,
    textAlign: 'center',
    color: active ? '#fff' : 'rgba(256, 256, 256, .76)',

    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  }),
  drawerText: {
    fontSize: '0.7em',
    lineHeight: '1.1em',
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'none',

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'nowrap',
    },
  },
}));

export default useStyles;
