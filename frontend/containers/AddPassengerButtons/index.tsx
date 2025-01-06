import {Stack} from '@mui/material';
import Button from '@mui/material/Button';
import {useTranslation} from 'next-i18next';
import useEventStore from '../../stores/useEventStore';
import {useSession} from 'next-auth/react';
import {useEffect, useReducer} from 'react';
import LoginDialog from '../LoginDialog';
import {useRouter} from 'next/router';

interface Props {
  travelId: string;
  onAddSelf: () => void;
  onAddOther: () => void;
  registered: boolean;
  variant: 'waitingList' | 'travel';
  disabled?: boolean;
}

const ADD_TO_LOCALE = {
  waitingList: 'travel.passengers.add_to_waitingList',
  travel: 'travel.passengers.add_to_travel',
};

const AddPassengerButtons = (props: Props) => {
  const {onAddSelf, onAddOther, registered, variant, disabled, travelId} =
    props;
  const {t} = useTranslation();
  const router = useRouter();
  const event = useEventStore(s => s.event);
  const isCarosterPlus = event?.enabled_modules?.includes('caroster-plus');
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const [showLoginDialog, toggleLoginDialog] = useReducer(i => !i, false);

  const onClickAddSelf = () => {
    if (isCarosterPlus && !isAuthenticated) toggleLoginDialog();
    else onAddSelf();
  };

  useEffect(() => {
    if (router.query.action === 'addSelf' && router.query.travel === travelId) {
      onAddSelf();
      router.replace(
        {pathname: `/${router.locale}/e/${router.query.uuid}`, query: null},
        undefined,
        {shallow: true}
      );
    }
  }, [router, onAddSelf]);

  return (
    <>
      <Stack spacing={2} p={1}>
        {(isCarosterPlus || isAuthenticated) && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClickAddSelf}
            disabled={disabled || registered}
          >
            {t(
              registered
                ? 'travel.passengers.registered'
                : 'travel.passengers.add_me'
            )}
          </Button>
        )}
        {!isCarosterPlus && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onAddOther}
            disabled={disabled}
          >
            {t(ADD_TO_LOCALE[variant])}
          </Button>
        )}
      </Stack>
      <LoginDialog
        title={t`travel.passengers.add_me`}
        content={t`travel.passengers.add_me.loginNotice`}
        open={showLoginDialog}
        toggle={toggleLoginDialog}
        redirectPath={`/e/${event?.uuid}/?action=addSelf&travel=${travelId}`}
      />
    </>
  );
};

export default AddPassengerButtons;
