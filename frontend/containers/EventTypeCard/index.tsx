import {Box, Paper, Typography} from '@mui/material';
import {useTranslation} from 'next-i18next';
import BasicAction from './BasicAction';
import PlusAction from './PlusAction';
import {useModuleQuery} from '../../generated/graphql';

type Props = {
  type: 'basic' | 'plus';
};

const EventTypeCard = (props: Props) => {
  const {type} = props;
  const {t} = useTranslation();
  const {data} = useModuleQuery({variables: {locale: 'en'}});
  const modulesSettings = data?.module.data?.attributes;

  return (
    <Box
      component={Paper}
      p={2}
      width={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Typography color="primary" variant="h5">
        {t(`event.creation.${type}.title`)}
      </Typography>
      <Typography color="textSecondary">
        {t(`event.creation.${type}.subtitle`)}
      </Typography>
      {type === 'basic' && (
        <Box display="flex" alignItems="baseline" pt={3.75} pb={2}>
          <Typography fontSize={64} lineHeight={1}>
            0
          </Typography>
          <Typography fontSize={24} lineHeight={1}>
            €
          </Typography>
        </Box>
      )}
      {type === 'plus' && (
        <Box py={2}>
          <Typography fontSize={14} lineHeight={1}>
            {t`event.creation.plus.fromPrice`}
          </Typography>
          <Box display="flex" alignItems="baseline">
            <Typography fontSize={64} lineHeight={1}>
              {modulesSettings?.caroster_plus_price}
            </Typography>
            <Typography fontSize={24} lineHeight={1}>
              €
            </Typography>
          </Box>
        </Box>
      )}
      <Typography color="textSecondary" pb={3}>
        {t(`event.creation.${type}.description`)}
      </Typography>
      {type === 'basic' && <BasicAction />}
      {type === 'plus' && <PlusAction />}
    </Box>
  );
};

export default EventTypeCard;
