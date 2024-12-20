import {Button, Icon} from '@mui/material';
import {useEffect, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import NewTravelDialog from './NewTravelDialog';
import useEventStore from '../../stores/useEventStore';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import LoginDialog from '../LoginDialog';

type Props = {};

const AddTravelButton = (props: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const event = useEventStore(s => s.event);
  const isCarosterPlus = event?.enabled_modules?.includes('caroster-plus');
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const [showLoginDialog, toggleLoginDialog] = useReducer(i => !i, false);
  const [showNewTravelDialog, toggleNewTravelDialog] = useReducer(
    i => !i,
    false
  );

  const onClick = () => {
    if (isCarosterPlus && !isAuthenticated) toggleLoginDialog();
    else toggleNewTravelDialog();
  };

  useEffect(() => {
    if (router.query.action === 'createTravel') {
      toggleNewTravelDialog();
      router.replace(
        {pathname: `/${router.locale}/e/${router.query.uuid}`, query: null},
        undefined,
        {shallow: true}
      );
    }
  }, [router]);

  return (
    <>
      <Button
        aria-label="add-car"
        variant="contained"
        color="secondary"
        endIcon={<Icon>add</Icon>}
        sx={{width: {xs: 1, sm: 'auto'}}}
        onClick={onClick}
      >
        {t('travel.creation.title')}
      </Button>
      <NewTravelDialog
        open={showNewTravelDialog}
        toggle={toggleNewTravelDialog}
      />
      <LoginDialog
        title={t`travel.creation.title`}
        content={t`travel.creation.loginNotice`}
        open={showLoginDialog}
        toggle={toggleLoginDialog}
        redirectPath={`/e/${event?.uuid}/?action=createTravel`}
      />
    </>
  );
};

export default AddTravelButton;
