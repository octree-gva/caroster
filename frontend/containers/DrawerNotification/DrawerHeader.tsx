import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

const DrawerHeader = ({onClose, markAllRead, disabled}) => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width:400px)');
  return (
    <Box>
      {!isMobile && (
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
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
          <Typography variant="h3">{`${t('notifications.title')}`}</Typography>
        </Box>
        <Button
          onClick={markAllRead}
          disabled={disabled}
        >{t`notifications.markAllRead`}</Button>
      </Box>
    </Box>
  );
};

export default DrawerHeader;
