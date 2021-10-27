import {useState} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import {useTranslation} from 'react-i18next';
import {EditComponentPassengerPassengerInput as PassengerInput} from '../../generated/graphql';
import {makeStyles} from '@material-ui/core';
import {isValidEmail} from '../../lib/formValidation';

interface Props {
  addPassenger: (passenger: PassengerInput) => void;
  id: number;
}

const Input = (props: Props) => {
  const {addPassenger, id} = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const classes = useStyles({showEmail: !!name});
  const {t} = useTranslation();

  const onSave = () => {
    if (email && !isValidEmail(email)) setError('email');
    else if (name) {
      addPassenger({name, email});
      setName('');
      setEmail('');
      setError(null);
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) onSave();
  };

  return (
    <Box pb={1}>
      <Box display="flex" flexDirection="row" alignItems="center" px={2}>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={onKeyDown}
          fullWidth
          label={t('car.passengers.add')}
          id={`NewPassenger-${id}-name`}
          name={`passenger-${id}-name`}
        />
        <IconButton
          color="primary"
          edge="end"
          size="small"
          disabled={!name}
          onClick={onSave}
        >
          <Icon>check</Icon>
        </IconButton>
      </Box>
      <Box pl={2} pt={1} pr={5} mb={2} className={classes.emailBox}>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={onKeyDown}
          fullWidth
          label={t`car.passengers.email`}
          id={`NewPassenger-${id}-email`}
          name={`passenger-${id}-email`}
          helperText={t`car.passengers.emailHelper`}
          error={error === 'email'}
        />
      </Box>
      <Divider />
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  emailBox: {
    transition: 'all 0.3s ease',
    maxHeight: ({showEmail}) => (showEmail ? '5rem' : 0),
    overflow: 'hidden',
  },
}));

export default Input;