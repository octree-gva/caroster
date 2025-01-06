import pageUtils from '../../lib/pageUtils';
import Layout from '../../layouts/EventCreation';
import {useTranslation} from 'next-i18next';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import EventTypeCard from '../../containers/EventTypeCard';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import useEventCreationStore from '../../stores/useEventCreationStore';
import {useModuleQuery} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';

const NewEventType = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const event = useEventCreationStore(s => s.event);
  const eventStoreReady = useEventCreationStore(s => s.ready);
  const {locale} = useLocale();
  const {data: moduleData} = useModuleQuery({variables: {locale}});
  const moduleConfig = moduleData?.module?.data?.attributes;

  useEffect(() => {
    if (eventStoreReady && !event.name) router.push('/new');
  }, [event.name, eventStoreReady, router]);

  return (
    <Layout>
      <Box display="flex" justifyContent="center">
        <Typography
          variant="h3"
          align="center"
          maxWidth={400}
        >{t`event.creation.chooseType`}</Typography>
      </Box>
      <Box display="flex" gap={4} py={4} flexWrap={isMobile && 'wrap'}>
        <EventTypeCard type="basic" />
        {moduleConfig?.caroster_plus_payment_link && (
          <EventTypeCard type="plus" moduleConfig={moduleConfig} />
        )}
      </Box>
    </Layout>
  );
};

export const getServerSideProps = pageUtils.getServerSideProps();

export default NewEventType;
