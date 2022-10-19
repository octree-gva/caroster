import React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';

const PREFIX = 'AddTravel';

const classes = {
  container: `${PREFIX}-container`,
  button: `${PREFIX}-button`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.container}`]: {},

  [`& .${classes.button}`]: {},
}));

interface Props {
  toggle: () => void;
}

const AddTravel = (props: Props) => {
  const {toggle} = props;

  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <StyledContainer
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
    </StyledContainer>
  );
};

export default AddTravel;
