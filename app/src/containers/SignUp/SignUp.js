import React, {useCallback, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActions';
import CardActions from '@material-ui/core/CardActions';

export default () => {
  const {t} = useTranslation();
  const {signUp} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, email, password].filter(s => s.length < 4)
        .length === 0,
    [firstName, lastName, email, password]
  );

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      await signUp(email, email, password, {firstName, lastName});
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [firstName, lastName, email, password]);
  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <TextField
          label={t('signup.firstName')}
          fullWidth
          autoFocus
          margin="dense"
          value={firstName}
          required={true}
          onChange={({target: {value = ''}}) => setFirstName(value)}
          id="SignUpFirstName"
          name="firstName"
        />
        <TextField
          label={t('signup.lastName')}
          fullWidth
          required={true}
          margin="dense"
          value={lastName}
          onChange={({target: {value = ''}}) => setLastName(value)}
          id="SignUpLastName"
          name="lastName"
        />
        <TextField
          label={t('signup.email')}
          fullWidth
          required={true}
          margin="dense"
          value={email}
          onChange={({target: {value = ''}}) => setEmail(value)}
          id="SignUpEmail"
          name="email"
          type="email"
        />
        <TextField
          label={t('signup.password')}
          fullWidth
          required={true}
          margin="dense"
          value={password}
          onChange={({target: {value = ''}}) => setPassword(value)}
          id="SignUpEmail"
          name="password"
          type="password"
        />
      </CardContent>
      <CardActionArea>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            id="SignUpSubmit"
            s
          >
            {t('signup.submit')}
          </Button>
          <Link id="SignUpLogin" href="/login">
            {t('signup.login')}
          </Link>
        </CardActions>
      </CardActionArea>
    </form>
  );
};
