import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {
  Vehicle,
  FindUserVehiclesDocument,
  useDeleteVehicleMutation,
} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import useTheme from '@mui/styles/useTheme';

const PREFIX = 'VehicleItem';

const classes = {
  item: `${PREFIX}-item`,
  section: `${PREFIX}-section`,
  label: `${PREFIX}-label`,
  select: `${PREFIX}-select`,
};

const StyledListItem = styled(ListItem)(({theme}) => ({
  [`&.${classes.item}`]: {
    display: 'block',
    padding: theme.spacing(2, 3),
  },

  [`& .${classes.section}`]: {
    maxWidth: '75%',
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.label}`]: {
    fontWeight: 'bold',
    opacity: 0.6,
    marginRight: theme.spacing(2),
  },

  [`& .${classes.select}`]: {
    display: 'block',
    maxWidth: '300px',
    margin: `0 auto ${theme.spacing(1.5)} auto`,
  },
}));

interface Props {
  vehicle: Vehicle & {id: string};
  select: () => void;
}

const VehicleItem = ({vehicle, select}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const {userId} = useProfile();
  const [deleteVehicleMutation] = useDeleteVehicleMutation({
    variables: {id: vehicle.id},
    refetchQueries: [{query: FindUserVehiclesDocument, variables: {userId}}],
  });

  return (
    <StyledListItem sx={{display: 'block', padding: theme.spacing(2, 3)}}>
      <Box>
        <Typography
          variant="overline"
          sx={{fontWeight: 'bold', opacity: 0.6, marginRight: theme.spacing(2)}}
        >
          {t('travel.vehicle.name')}
        </Typography>
        <Button
          color="primary"
          variant="text"
          size="small"
          onClick={() => deleteVehicleMutation()}
        >
          {t('generic.delete')}
        </Button>
      </Box>
      <Typography
        variant="body1"
        sx={{maxWidth: '75%', marginBottom: theme.spacing(1)}}
      >
        {vehicle.name}
      </Typography>
      <Typography
        variant="overline"
        sx={{fontWeight: 'bold', opacity: 0.6, marginRight: theme.spacing(2)}}
      >
        {t('travel.vehicle.seats_number')}
      </Typography>
      <Typography
        variant="body1"
        sx={{maxWidth: '75%', marginBottom: theme.spacing(1)}}
      >
        {vehicle.seats}
      </Typography>
      <Button
        sx={{
          display: 'block',
          maxWidth: '300px',
          margin: `0 auto ${theme.spacing(1.5)} auto`,
        }}
        fullWidth
        color="primary"
        variant="contained"
        onClick={select}
      >
        {t('generic.select')}
      </Button>
    </StyledListItem>
  );
};

export default VehicleItem;
