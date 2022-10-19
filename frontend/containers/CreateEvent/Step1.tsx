import React, {useState, useEffect, useMemo} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import NextLink from 'next/link';
import CardActions from '@mui/material/CardActions';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import {useSession} from 'next-auth/react';
import useDebounce from '../../hooks/useDebounce';
import {isValidEmail} from '../../lib/formValidation';

const Step1 = ({nextStep, event, addToEvent}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = session.status === 'authenticated';

  // States
  const [name, setName] = useState(event.name ?? '');
  const [email, setEmail] = useState(event.email ?? '');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const debouncedEmail = useDebounce(email, 400);

  useEffect(() => {
    setEmailIsValid(isValidEmail(debouncedEmail));
  }, [debouncedEmail]);

  const canSubmit = useMemo(() => {
    const n = name.length > 0;
    const e = email.length > 0 && emailIsValid;
    return isAuthenticated ? n : n && e;
  }, [name, email, emailIsValid, isAuthenticated]);

  const onNext = submitEvent => {
    if (submitEvent.preventDefault) submitEvent.preventDefault();
    addToEvent({
      name,
      email: isAuthenticated ? user.email : email,
      newsletter: isAuthenticated ? true : newsletter,
    });
    nextStep();
    return false;
  };

  return (
    <Box component="form" onSubmit={onNext}>
      <TextField
        label={t('event.creation.name')}
        fullWidth
        autoFocus
        margin="dense"
        variant="standard"
        value={name}
        onChange={e => setName(e.target.value)}
        id="NewEventName"
        name="name"
      />
      {!isAuthenticated && (
        <>
          <TextField
            label={t('event.creation.creator_email')}
            fullWidth
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            id="NewEventEmail"
          />
          <FormControlLabel
            sx={{marginTop: theme.spacing(2)}}
            label={t('event.creation.newsletter')}
            control={
              <Checkbox
                name="newsletter"
                color="primary"
                id="NewEventNewsletter"
                checked={newsletter}
                onChange={e => setNewsletter(e.target.checked)}
              />
            }
          />
        </>
      )}
      <Button
        sx={{marginTop: theme.spacing(2)}}
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
      >
        {t('event.creation.next')}
      </Button>

      {!isAuthenticated && (
        <Box sx={{marginTop: theme.spacing(8), textAlign: 'center'}}>
          <Typography variant="body1">
            {t('event.creation.addFromAccount.title')}
          </Typography>
          <Typography variant="body2">
            {t('event.creation.addFromAccount.subtitle')}
          </Typography>
          <CardActions
            sx={{
              marginTop: theme.spacing(1),
              justifyContent: 'space-evenly',
              textAlign: 'center',
            }}
          >
            <NextLink href="/auth/register" passHref>
              <Button variant="text">
                {t('event.creation.addFromAccount.actions.register')}
              </Button>
            </NextLink>
            <NextLink href="/auth/login" passHref>
              <Button color="primary">
                {t('event.creation.addFromAccount.actions.login')}
              </Button>
            </NextLink>
          </CardActions>
        </Box>
      )}
    </Box>
  );
};

export default Step1;
