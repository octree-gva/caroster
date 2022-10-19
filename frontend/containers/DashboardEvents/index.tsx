import {useTranslation} from 'react-i18next';
import Box from '@mui/material/Box';
import Section from './Section';
import { EventEntity } from '../../generated/graphql';

const DashboardEvents = ({
  futureEvents = [],
  noDateEvents = [],
  pastEvents = [],
}: {
  futureEvents: EventEntity[];
  noDateEvents: EventEntity[];
  pastEvents: EventEntity[];
}) => {
  const {t} = useTranslation();

  return (
    <Box p={4}>
      {futureEvents.length > 0 && (
        <Section
          label={t('dashboard.sections.future', {
            count: futureEvents.length,
          })}
          events={futureEvents}
        />
      )}
      {noDateEvents.length > 0 && (
        <Section
          label={t('dashboard.sections.noDate', {
            count: noDateEvents.length,
          })}
          events={noDateEvents}
        />
      )}
      {pastEvents.length > 0 && (
        <Section
          label={t('dashboard.sections.past', {
            count: pastEvents.length,
          })}
          events={pastEvents}
        />
      )}
    </Box>
  );
};

export default DashboardEvents;
