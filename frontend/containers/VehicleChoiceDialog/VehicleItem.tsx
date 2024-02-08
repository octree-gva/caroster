import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {
  FindUserVehiclesDocument,
  useDeleteVehicleMutation,
  VehicleEntity,
} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';
import useTheme from '@mui/styles/useTheme';

interface Props {
  vehicle: VehicleEntity;
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
    <ListItem
      sx={{py: 2, px: 3, flexDirection: 'column', alignItems: 'flex-start'}}
    >
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
        {vehicle.attributes.name}
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
        {vehicle.attributes.seats}
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
    </ListItem>
  );
};

export default VehicleItem;
