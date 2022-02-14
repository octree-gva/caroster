import {forwardRef, Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import {useTranslation} from 'react-i18next';
import VehicleItem from './VehicleItem';
import Typography from '@material-ui/core/Typography';
import {VehicleFieldsFragment} from '../../generated/graphql';

interface Props {
  open: boolean;
  toggle: () => void;
  toggleNewTravel: ({
    opened,
    vehicle,
  }: {
    opened: boolean;
    vehicle?: VehicleFieldsFragment;
  }) => void;
  vehicles: Array<VehicleFieldsFragment>;
}

const VehicleChoiceDialog = ({
  open,
  toggle,
  toggleNewTravel,
  vehicles,
}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <DialogTitle>{t('travel.vehicle.title')}</DialogTitle>
      <DialogContent dividers className={classes.content}>
        {(vehicles && vehicles.length != 0 && (
          <List>
            {vehicles.map((vehicle, index, {length}) => (
              <Fragment key={index}>
                <VehicleItem
                  vehicle={vehicle}
                  select={() => {
                    toggleNewTravel({vehicle, opened: true});
                    toggle();
                  }}
                />
                {index + 1 < length && <Divider />}
              </Fragment>
            ))}
          </List>
        )) || (
          <Container className={classes.empty}>
            <Typography>{t('travel.vehicle.empty')}</Typography>
          </Container>
        )}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          className={classes.new}
          color="primary"
          fullWidth
          variant="outlined"
          onClick={() => {
            toggleNewTravel({opened: true});
            toggle();
          }}
        >
          {t('travel.vehicle.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'center',
  },
  content: {
    padding: 0,
  },
  new: {
    maxWidth: '300px',
  },
  empty: {
    padding: theme.spacing(2, 3)
  }
}));

export default VehicleChoiceDialog;
