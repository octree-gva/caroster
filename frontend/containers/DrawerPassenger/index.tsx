import {Drawer, Typography, useMediaQuery, Link, Box} from '@mui/material';
import {useTranslation} from 'next-i18next';
import {CountryIso2} from 'react-international-phone';
import DrawerPassengerHeader from './DrawerPassengerHeader';
import {getFormatedPhoneNumber} from '../../lib/phoneNumbers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  phoneCountry?: '' | CountryIso2;
}

const DrawerPassenger = ({
  isOpen,
  onClose,
  lastName,
  firstName,
  email,
  phone,
  phoneCountry,
}: Props) => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width:400px)');

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
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
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              {t('passenger.informations.email.label')}
            </Typography>
            <Link
              sx={{display: 'flex', flexDirection: 'row', gap: 1}}
              href={`mailto:${email}`}
            >
              {email}
            </Link>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              {t('passenger.informations.phone.label')}
            </Typography>
            {phone ? (
              <Link
                sx={{display: 'flex', flexDirection: 'row', gap: 1}}
                href={`tel:${phone}`}
              >
                {getFormatedPhoneNumber({phone, phoneCountry})}
              </Link>
            ) : (
              <Typography variant="body1">
                {t('passenger.informations.notSpecify')},{' '}
                {t('passenger.informations.byAdmin')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerPassenger;
