import {Fragment} from 'react';
import TextField from '@mui/material/TextField';
import {useTranslation} from 'next-i18next';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStyles from './useStyles';

interface Props {
  name: string;
  setName: (name: string) => void;
  email: string;
  emailError: boolean;
  optionalEmail?: boolean;
  setEmail: (email: string) => void;
}

const AddPassengerCommonFields = ({
  name,
  setName,
  email,
  emailError,
  setEmail,
  optionalEmail,
}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const emailPlaceholder = t(
    optionalEmail
      ? 'travel.passengers.email_placeholder_optionnal'
      : 'travel.passengers.email_placeholder'
  );

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
          error={!!email && emailError}
          helperText={
            email && emailError && t('travel.passengers.email_helpertext')
          }
          placeholder={emailPlaceholder}
        />
      </Box>
    </Fragment>
  );
};

export default AddPassengerCommonFields;
