import {Box, IconButton, Icon, Typography} from '@mui/material';
import {t} from 'i18next';

interface DrawerHeaderProps {
  isMobile: boolean;
  onClose: () => void;
}

const DrawerHeader = ({isMobile, onClose}: DrawerHeaderProps) => {
  return (
    <Box>
      {!isMobile && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          paddingTop={2}
        >
          <IconButton
            sx={{marginRight: 0}}
            color="inherit"
            edge="end"
            aria-label="close"
            onClick={onClose}
            id="CloseBtn"
          >
            <Icon>close</Icon>
          </IconButton>
        </Box>
      )}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom={2}
      >
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton
              sx={{marginRight: 0}}
              color="inherit"
              edge="end"
              aria-label="close"
              onClick={onClose}
              id="CloseBtn"
            >
              <Icon>chevron_left</Icon>
            </IconButton>
          )}
          <Typography
            variant="h3"
            pl={2}
          >{t`passenger.informations.title`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerHeader;
