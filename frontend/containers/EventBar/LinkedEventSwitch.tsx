import {Button, ButtonGroup, useMediaQuery} from '@mui/material';
import {useTranslation} from 'next-i18next';
import useEventStore from '../../stores/useEventStore';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTheme} from '@mui/styles';

type Props = {};

const LinkedEventSwitch = (props: Props) => {
  const {t} = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const loadedEvent = useEventStore(s => s.event);
  const linkedEvent = loadedEvent?.linkedEvent?.data?.attributes;

  if (!loadedEvent || !linkedEvent) return null;

  const goEvent = loadedEvent.isReturnEvent ? linkedEvent : loadedEvent;
  const returnEvent = loadedEvent.isReturnEvent ? loadedEvent : linkedEvent;

  return (
    <ButtonGroup variant="contained" fullWidth={isMobile}>
      <Link
        href={router.asPath.replace(loadedEvent.uuid, goEvent.uuid)}
        style={{width: isMobile && '100%'}}
      >
        <Button
          color={loadedEvent.isReturnEvent ? 'inherit' : 'primary'}
          sx={{
            color: loadedEvent.isReturnEvent
              ? 'rgba(0, 0, 0, 0.87)'
              : 'rgba(255, 255, 255, 0.87)',
          }}
        >
          {t`event.linked.goEvent`} ({goEvent.travels?.data?.length || 0})
        </Button>
      </Link>
      <Link
        href={router.asPath.replace(loadedEvent.uuid, returnEvent.uuid)}
        style={{width: isMobile && '100%'}}
      >
        <Button
          color={!loadedEvent.isReturnEvent ? 'inherit' : 'primary'}
          sx={{
            color: !loadedEvent.isReturnEvent
              ? 'rgba(0, 0, 0, 0.87)'
              : 'rgba(255, 255, 255, 0.87)',
          }}
        >
          {t`event.linked.returnEvent`} (
          {returnEvent?.travels?.data?.length || 0})
        </Button>
      </Link>
    </ButtonGroup>
  );
};

export default LinkedEventSwitch;
