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
    position: 'fixed',
    zIndex: 0,
    width: 40,
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '&:not(.slick-disabled)': {
      backgroundColor: 'rgba(255,255,255,1)',
      boxShadow: '0 0 6px rgb(1 1 1 / 20%)',
    },
    '&:not(.slick-disabled):hover': {
      boxShadow: '0 0 1px rgb(1 1 1 / 20%)',
    },
    '&::before': {
      fontSize: 23,
      color: theme.palette.primary.main,
    },
  },
}));

export default CustomArrow;
