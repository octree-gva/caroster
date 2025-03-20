import pageUtils from '../../lib/pageUtils';
import Layout from '../../layouts/EventCreation';
import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import useEventCreationStore from '../../stores/useEventCreationStore';
import {useTranslation} from 'next-i18next';
import {useSession} from 'next-auth/react';
import {useMemo} from 'react';
import {isValidEmail} from '../../lib/formValidation';
import NextLink from 'next/link';
import Logo from '../../components/Logo';

interface Props {
  announcement?: string;
}

const NewEvent = (props: Props) => {
  const {t} = useTranslation();
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const event = useEventCreationStore(s => s.event);
  const setField = useEventCreationStore(s => s.setField);

  const canSubmit = useMemo(() => {
    const nameIsOk = event.name?.length > 0;
    const emailIsOk = event.email?.length > 0 && isValidEmail(event.email);
    return isAuthenticated ? nameIsOk : nameIsOk && emailIsOk;
  }, [event, , isAuthenticated]);

  return (
    <Layout {...props}>
      <Paper
        sx={{
          p: 2,
          width: '480px',
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
        }}
      >
        <Logo />
        <Stack spacing={2}>
          <TextField
            label={t('event.creation.name')}
            fullWidth
            autoFocus
            margin="dense"
            variant="standard"
            value={event.name}
            onChange={e => setField('name', e.target.value)}
            id="NewEventName"
            name="name"
          />
          {!isAuthenticated && (
            <>
              <TextField
                label={t('event.creation.creator_email')}
                fullWidth
                variant="standard"
                value={event.email}
                onChange={e => setField('email', e.target.value)}
                name="email"
                type="email"
                id="NewEventEmail"
              />
              <FormControlLabel
                label={t('event.creation.newsletter')}
                control={
                  <Checkbox
                    name="newsletter"
                    color="primary"
                    id="NewEventNewsletter"
                    checked={event.newsletter}
                    onChange={e => setField('newsletter', e.target.checked)}
                  />
                }
              />
            </>
          )}
          <NextLink
            href="/new/details"
            passHref
            tabIndex={canSubmit ? undefined : -1}
            style={{pointerEvents: canSubmit ? undefined : 'none'}}
            aria-disabled={!canSubmit}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
            >
              {t('event.creation.toEventDetails')}
            </Button>
          </NextLink>
          {!isAuthenticated && (
            <CardActions
              sx={{
                justifyContent: 'space-evenly',
                textAlign: 'center',
              }}
            >
              <NextLink href="/auth/login" passHref>
                <Button color="primary">
                  {t('event.creation.addFromAccount.actions.login')}
                </Button>
              </NextLink>
            </CardActions>
          )}
        </Stack>
      </Paper>
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default NewEvent;
