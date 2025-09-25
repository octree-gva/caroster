import {useTranslation} from 'next-i18next';
import Box from '@mui/material/Box';
import Section from './Section';
import {EventEntity} from '../../generated/graphql';
import theme from '../../theme';

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
    <Box
      sx={{
        px: 4,
        pb: 4,
        [theme.breakpoints.down('md')]: {
          px: 2,
        },
      }}
    >
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
