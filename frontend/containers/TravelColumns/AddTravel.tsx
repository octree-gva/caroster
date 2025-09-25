import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useTranslation} from 'next-i18next';
import theme from '../../theme';

interface Props {
  toggle: () => void;
}

const AddTravel = (props: Props) => {
  const {toggle} = props;

  const {t} = useTranslation();
  return (
    <Container
      maxWidth="sm"
      sx={{display: 'flex', justifyContent: 'center', padding: 0}}
    >
      <Button
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          '&:hover': {color: theme.palette.secondary.contrastText},
        }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={toggle}
      >
        {t('travel.creation.title')}
      </Button>
    </Container>
  );
};

export default AddTravel;
