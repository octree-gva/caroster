import {Button, ButtonGroup} from '@mui/material';
import {useTranslation} from 'react-i18next';
import useEventStore from '../../stores/useEventStore';
import Link from 'next/link';
import {useRouter} from 'next/router';

type Props = {};

const LinkedEventSwitch = (props: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const loadedEvent = useEventStore(s => s.event);
  const linkedEvent = loadedEvent?.linkedEvent?.data?.attributes;

  if (!loadedEvent || !linkedEvent) return null;

  const goEvent = loadedEvent.isReturnEvent ? linkedEvent : loadedEvent;
  const returnEvent = loadedEvent.isReturnEvent ? loadedEvent : linkedEvent;

  return (
    <ButtonGroup variant="contained">
      <Link href={router.asPath.replace(loadedEvent.uuid, goEvent.uuid)}>
        <Button
          color={loadedEvent.isReturnEvent ? 'inherit' : 'secondary'}
          sx={{color: 'black'}}
        >
          {t`event.linked.goEvent`} ({goEvent.travels?.data?.length || 0})
        </Button>
      </Link>
      <Link href={router.asPath.replace(loadedEvent.uuid, returnEvent.uuid)}>
        <Button
          color={!loadedEvent.isReturnEvent ? 'inherit' : 'secondary'}
          sx={{color: 'black'}}
        >
          {t`event.linked.returnEvent`} (
          {returnEvent?.travels?.data?.length || 0})
        </Button>
      </Link>
    </ButtonGroup>
  );
};

export default LinkedEventSwitch;
