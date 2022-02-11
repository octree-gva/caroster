import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {
  VehicleFieldsFragment,
  useUpdateVehicleMutation,
  FindUserVehiclesDocument,
} from '../../generated/graphql';
import useProfile from '../../hooks/useProfile';

interface Props {
  vehicle: VehicleFieldsFragment;
  select: () => void;
}

const VehicleItem = ({vehicle, select}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const {user} = useProfile();
  const [unlinkUserCar] = useUpdateVehicleMutation({
    variables: {
      id: vehicle.id,
      vehicleUpdate: {
        user: null,
      },
    },
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
        <Button color="primary" variant="text" onClick={() => unlinkUserCar()}>
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
  delete: {
    color: theme.palette.error.main,
    position: 'absolute',
    right: theme.spacing(2),
    '& > span': {
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: `calc(100% - ${theme.spacing(2)}px)`,
        height: theme.spacing(0.25),
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        backgroundColor: theme.palette.error.light,
      },
    },
  },
  select: {
    display: 'block',
    maxWidth: '300px',
    margin: '0 auto',
  },
}));

export default VehicleItem;
