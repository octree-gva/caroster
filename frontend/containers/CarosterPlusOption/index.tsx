import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material//ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useTranslation} from 'react-i18next';
import Markdown from '../../components/Markdown';
import useLocale from '../../hooks/useLocale';
import usePermissions from '../../hooks/usePermissions';
import {Event as EventType, Module} from '../../generated/graphql';

interface Props {
  event: EventType;
  modulesSettings: Module;
}

const CarosterPlusOption = ({event, modulesSettings}: Props) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canEditEventOptions},
  } = usePermissions();
  const {locale} = useLocale();

  const {
    caroster_plus_name,
    caroster_plus_description,
    caroster_plus_price,
    caroster_plus_payment_link,
  } = modulesSettings;

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: '100%',
        width: '350px',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        p={2}
        py={1}
      >
        <Typography variant="h4" pt={1}>
          {caroster_plus_name}
        </Typography>
        <Box pt={1}>
          <Tooltip
            title={t(
              canEditEventOptions()
                ? 'options.plus.activationOK'
                : 'options.plus.activationForbiden'
            )}
          >
            <Box>
              <Button
                href={`${caroster_plus_payment_link}?client_reference_id=${event.uuid}&locale=${locale}`}
                disabled={!canEditEventOptions()}
                sx={{
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  borderRadius: 8,
                  pl: 2,
                  pr: 1,
                }}
              >
                {caroster_plus_price} {caroster_plus_price && 'EUR'}{' '}
                <ChevronRightIcon />
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box p={2}>
        <Markdown
          variant="caption"
          sx={{
            '& ul': {
              pl: 2,
            },
          }}
        >
          {caroster_plus_description}
        </Markdown>
      </Box>
      <Divider />
      <ListItem
        sx={{p: 2}}
        secondaryAction={
          <Chip label={t('options.plus.creator')} size="small" />
        }
      >
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={event.email} />
      </ListItem>
    </Card>
  );
};

export default CarosterPlusOption;
