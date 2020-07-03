import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';

const Input = ({addPassenger}) => {
  const [name, setName] = useState('');
  const {t} = useTranslation();

  const onSave = () => {
    if (!!name) {
      addPassenger(name);
      setName('');
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) onSave();
  };

  return (
    <Box pb={1}>
      <Box display="flex" flexDirection="row" alignItems="center" px={2} pb={2}>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={onKeyDown}
          fullWidth
          label={t('car.passengers.add')}
          id="NewPassenger"
          name="passenger"
        />
        <IconButton edge="end" size="small" disabled={!name} onClick={onSave}>
          <Icon>check</Icon>
        </IconButton>
      </Box>
      <Divider />
    </Box>
  );
};

export default Input;
