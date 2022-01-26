import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    dialogContent: {
      padding: theme.spacing(1, 3, 3, 3),
    },
    labelIcon: {
      verticalAlign: 'middle',
      fontSize: '1rem'
    },
    inputBox: {
      padding: theme.spacing(1, 0),
    },
    buttonBox: {
      padding: theme.spacing(2, 0, 1, 0),
    },
    title: {
      textAlign: 'center',
      width: '100%',
      padding: theme.spacing(2, 8, 0, 8),
    },
    closeIcon: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      cursor: 'pointer',
      padding: theme.spacing(0.5),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }));
  
  export default useStyles;