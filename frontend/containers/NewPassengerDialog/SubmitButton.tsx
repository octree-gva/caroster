import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {ReactNode} from 'react';
import useStyles from './useStyles';

const SubmitButton = ({
  disabled,
  children,
}: {
  disabled: boolean;
  children: ReactNode;
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.buttonBox}>
      <Button
        color="primary"
        variant="outlined"
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
