import {
  Drawer,
  Icon,
  Typography,
  useMediaQuery,
  Link,
  Box,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import DrawerPassengerHeader from './DrawerPassengerHeader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const DrawerPassenger = ({
  isOpen,
  onClose,
  lastName,
  firstName,
  email,
  phone,
}: Props) => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width:400px)');

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      hideBackdrop={true}
      sx={{
        height: 'auto',
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : '375px',
          maxWidth: '100%',
        },
      }}
    >
      <Box bgcolor="background.default" sx={{height: '100%', overflow: 'auto'}}>
        <DrawerPassengerHeader isMobile={isMobile} onClose={onClose} />
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          bgcolor="white"
          padding={2}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              {t('passenger.informations.name.label')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {firstName}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              {t('passenger.informations.surname.label')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {lastName}
            </Typography>
          </Box>
          {phone && (
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">
                {t('passenger.informations.phone.label')}
              </Typography>
              <Link href={`tel:${phone}`}>
                <Typography variant="body1" gutterBottom>
                  {phone}
                </Typography>
              </Link>
            </Box>
          )}
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              {t('passenger.informations.email.label')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {email}
            </Typography>
          </Box>
          <Link
            sx={{display: 'flex', flexDirection: 'row', gap: 1}}
            href={`mailto:${email}`}
          >
            <Icon>email</Icon> {t('passenger.informations.email.label')}
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerPassenger;
