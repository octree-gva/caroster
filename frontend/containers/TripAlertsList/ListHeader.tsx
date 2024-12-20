import {Box, Divider, Typography} from '@mui/material';
import {useMemo} from 'react';
import {useTranslation} from 'next-i18next';
import useEventStore from '../../stores/useEventStore';

type Props = {};

const ListHeader = (props: Props) => {
  const {t} = useTranslation();
  const event = useEventStore(s => s.event);
  const travels = useMemo(
    () =>
      event?.travels?.data?.length > 0 ? event?.travels?.data.slice() : [],
    [event?.travels?.data]
  );

  const count = useMemo(() => {
    if (!travels) return;
    return travels.reduce((count, {attributes: {seats, passengers}}) => {
      if (!seats) return 0;
      else if (!passengers) return count + seats;
      return count + seats - passengers?.data?.length;
    }, 0);
  }, [travels]);

  return (
    <>
      <Box p={2}>
        <Typography variant="h5">{t('passenger.title')}</Typography>
        <Typography variant="overline">
          {t('passenger.availability.seats', {count})}
        </Typography>
        <Typography variant="body2" mt={2} whiteSpace="pre-line">
          {t`passenger.waitingList.helper`}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default ListHeader;
