import {useReducer, useState} from 'react';
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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useTranslation} from 'react-i18next';
import usePermissions from '../../hooks/usePermissions';
import useToastStore from '../../stores/useToastStore';
import FormDialog from '../FormDialog';
import {validateEmail} from '../../lib/validation';
import {
  Event as EventType,
  useAddEventAdminMutation,
  useDeleteEventAdminMutation,
} from '../../generated/graphql';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  event: EventType & {id: string};
}

const CarosterPlusSettings = ({event}: Props) => {
  const {t} = useTranslation();
  const {
    userPermissions: {canEditEventOptions},
  } = usePermissions();

  const {addToast} = useToastStore();

  const [addAdminMutation] = useAddEventAdminMutation();
  const [deleteAdminMutation] = useDeleteEventAdminMutation();
  const [addAdminDialogOpen, toggleAddAdminDialog] = useReducer(i => !i, false);
  const [adminEmail, setAdminEmail] = useState('');
  const isEmailValid = validateEmail(adminEmail);
  const emailError = adminEmail !== '' && !isEmailValid;

  const addAdmin = async () => {
    try {
      await addAdminMutation({
        variables: {
          eventId: event.id,
          email: adminEmail,
        },
      });
      addToast(t('options.plus.adminAdded'));
      toggleAddAdminDialog();
      setAdminEmail('');
    } catch (e) {
      console.error(e);
      addToast(t('options.plus.addAdminError'));
    }
  };

  const deleteAdmin = async ({email}) => {
    try {
      await deleteAdminMutation({
        variables: {
          eventId: event.id,
          email,
        },
      });
      addToast(t('options.plus.adminDeleted'));
      toggleAddAdminDialog();
    } catch (e) {
      console.error(e);
      addToast(t('options.plus.deleteAdminError'));
    }
  };

  const canEdit = canEditEventOptions();

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: '100%',
        width: '480px',
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
        {canEdit ? (
          <Button
            variant="text"
            endIcon={<AddIcon />}
            onClick={toggleAddAdminDialog}
          >
            {t('generic.add')}
          </Button>
        ) : (
          <Tooltip title={t('options.plus.notRightForAddAdmin')}>
            <div>
              <Button variant="text" disabled endIcon={<AddIcon />}>
                {t('generic.add')}
              </Button>
            </div>
          </Tooltip>
        )}
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
        {event.administrators?.map(email => (
          <ListItem
            secondaryAction={
              canEditEventOptions() && (
                <IconButton size="medium" onClick={() => deleteAdmin({email})}>
                  <DeleteOutlineIcon />
                </IconButton>
              )
            }
          >
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
      <FormDialog
        title={t('options.plus.addAdmin')}
        open={addAdminDialogOpen}
        cancel={toggleAddAdminDialog}
        onSubmit={addAdmin}
        disabled={!isEmailValid}
      >
        <TextField
          fullWidth
          error={emailError}
          label={t('options.plus.addAdmin.email')}
          value={adminEmail}
          onChange={e => setAdminEmail(e.target.value)}
          helperText={emailError && t('options.plus.addAdmin.emailHelper')}
          variant="standard"
        />
      </FormDialog>
    </Card>
  );
};

export default CarosterPlusSettings;
