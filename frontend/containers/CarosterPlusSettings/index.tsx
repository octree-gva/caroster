import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material//ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import usePermissions from '../../hooks/usePermissions';
import {Event as EventType} from '../../generated/graphql';

interface Props {
  event: EventType;
}

const CarosterPlusSettings = ({event}: Props) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canEditEventOptions},
  } = usePermissions();

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: '100%',
        width: '350px',
        pb: 3,
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
          {t('options.plus.title')}
        </Typography>
      </Box>
      <Divider />
      <Box p={2} display="flex" justifyContent="space-between" width="100%">
        <Typography pt={1} variant="body2" color="GrayText">
          {t('options.plus.admins')}
        </Typography>
        <Button
          variant="text"
          disabled={!canEditEventOptions}
          endIcon={<AddIcon />}
        >
          {t('generic.add')}
        </Button>
      </Box>
      <List disablePadding>
        <ListItem
          secondaryAction={
            <Chip label={t('options.plus.creator')} size="medium" />
          }
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={event.email} />
        </ListItem>
      </List>
    </Card>
  );
};

export default CarosterPlusSettings;
