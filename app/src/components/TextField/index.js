import React from 'react';
import TextFieldMUI from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const TextField = ({className, light, ...props}) => {
  const classes = useStyles();
  return (
    <TextFieldMUI
      className={`${classes.input} ${className} ${light ? 'light' : ''}`}
      fullWidth
      margin="dense"
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
  input: {
    '&.light .MuiFormLabel-root': {
      color: 'white',
    },
    '&.light .MuiInputBase-input': {color: 'white'},
    '&.light .MuiInput-underline::before': {
      borderColor: 'white',
    },
    '&.light .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderColor: 'white',
    },
    '&.light .MuiInput-underline::after': {
      transform: 'scaleX(0)',
    },
  },
}));

export default TextField;
