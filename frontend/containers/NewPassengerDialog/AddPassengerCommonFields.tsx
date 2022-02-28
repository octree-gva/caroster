import {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from 'react-i18next';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

interface Props {
  name: string;
  setName: (name: string) => void;
  email: string;
  emailError: boolean;
  setEmail: (email: string) => void;
}

const AddPassengerCommonFields = ({name, setName, email, emailError, setEmail}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.inputBox}>
        <label htmlFor="name">
          <Typography className={classes.label}>
            <Icon className={classes.labelIcon}>person</Icon>{' '}
            {t('travel.passengers.name')}
          </Typography>
        </label>
        <TextField
          id="PassengerName"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          label=""
          placeholder={t('travel.passengers.name_placeholder')}
        />
      </Box>
      <Box className={classes.inputBox}>
        <label htmlFor="email">
          <Typography className={classes.label}>
            <Icon className={classes.labelIcon}>mail_outlined</Icon>{' '}
            {t('travel.passengers.email')}
          </Typography>
        </label>
        <TextField
          id="PassengerEmail"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          label=""
          error={email && emailError}
          helperText={email && t('travel.passengers.email_helpertext')}
          placeholder={t('travel.passengers.email_placeholder')}
        />
      </Box>
    </Fragment>
  );
};

export default AddPassengerCommonFields;
