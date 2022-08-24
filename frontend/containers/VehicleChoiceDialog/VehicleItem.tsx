import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {
  Vehicle,
  FindUserVehiclesDocument,
  useDeleteVehicleMutation,
} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';

interface Props {
  vehicle: Vehicle & {id: string};
  select: () => void;
}

const VehicleItem = ({vehicle, select}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {user} = useProfile();
  const [deleteVehicleMutation] = useDeleteVehicleMutation({
    variables: {id: vehicle.id},
    refetchQueries: [
      {query: FindUserVehiclesDocument, variables: {userId: user.id}},
    ],
  });

  return (
    <ListItem className={classes.item}>
      <Box>
        <Typography variant="overline" className={classes.label}>
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
      <Typography variant="body1" className={classes.section}>
        {vehicle.name}
      </Typography>
      <Typography variant="overline" className={classes.label}>
        {t('travel.vehicle.seats_number')}
      </Typography>
      <Typography variant="body1" className={classes.section}>
        {vehicle.seats}
      </Typography>
      <Button
        className={classes.select}
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

const useStyles = makeStyles(theme => ({
  item: {
    display: 'block',
    padding: theme.spacing(2, 3),
  },
  section: {
    maxWidth: '75%',
    marginBottom: theme.spacing(1),
  },
  label: {
    fontWeight: 'bold',
    opacity: 0.6,
    marginRight: theme.spacing(2),
  },
  select: {
    display: 'block',
    maxWidth: '300px',
    margin: `0 auto ${theme.spacing(1.5)}px auto`,
  },
}));

export default VehicleItem;
