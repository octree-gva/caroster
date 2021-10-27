import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import {CSSProperties} from '@material-ui/styles';

interface Props {
  className?: string;
  style?: CSSProperties;
  left?: number;
  right?: number;
  onClick?: () => {};
}

const CustomArrow = (props: Props) => {
  const {className, style, onClick, left, right} = props;
  const classes = useStyles();

  return (
    <Box
      className={clsx(className, classes.arrow)}
      style={{...style, left, right}}
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
    />
  );
};

const useStyles = makeStyles(theme => ({
  arrow: {
    zIndex: 2,
    width: 24,
    height: 24,
    '&::before': {
      fontSize: 23,
      color: theme.palette.primary.main,
    },
  },
}));

export default CustomArrow;
