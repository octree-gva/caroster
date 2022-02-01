import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {ReactNode} from 'react';
import useStyles from './useStyles';

interface Props {
  disabled: boolean;
  children: ReactNode;
  important?: boolean;
}

const SubmitButton = ({disabled, children, important}: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.buttonBox}>
      <Button
        color={important ? 'secondary' : 'primary'}
        variant={important ? 'contained' : 'outlined'}
        fullWidth
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        id="AddPassenger"
        startIcon={<Icon>person_add</Icon>}
      >
        {children}
      </Button>
    </Box>
  );
};

export default SubmitButton;
