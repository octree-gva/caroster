import React from 'react';
import Switch, {SwitchProps} from '@mui/material/Switch';
import theme from '../../theme';

interface Props {
  activate: () => void;
  checked: boolean;
}

const switchStyles = {
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 0.25,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'primary.main',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: 'grey[100]',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: 'background-color 500ms',
  },
};

const Toggle = ({activate, checked, ...props}: SwitchProps & Props) => {
  return (
    <Switch
      sx={switchStyles}
      checked={checked}
      onChange={activate}
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  );
};

export default Toggle;
