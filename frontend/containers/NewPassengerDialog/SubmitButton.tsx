import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
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
