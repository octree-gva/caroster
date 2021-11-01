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
      style={{
        ...style,
        left,
        right,
        display: 'flex',
      }}
      onClick={onClick}
    />
  );
};

const useStyles = makeStyles(theme => ({
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    width: 40,
    height: '100%',
    transition: 'background-color 0.5s ease',
    '&:not(.slick-disabled)': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    '&:not(.slick-disabled):hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '&::before': {
      fontSize: 23,
      color: theme.palette.primary.main,
    },
  },
}));

export default CustomArrow;
