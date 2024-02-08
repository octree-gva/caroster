import {forwardRef, Fragment} from 'react';
import {useTheme} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import {useTranslation} from 'react-i18next';
import VehicleItem from './VehicleItem';
import Typography from '@mui/material/Typography';
import {VehicleEntity} from '../../generated/graphql';
import Icon from '@mui/material/Icon';

interface Props {
  open: boolean;
  setSelectedVehicle: (vehicle: VehicleEntity) => void;
  setNewTravelDialog: (open: boolean) => void;
  toggle: () => void;
  vehicles: Array<VehicleEntity>;
}

const VehicleChoiceDialog = ({
  open,
  setSelectedVehicle,
  setNewTravelDialog,
  toggle,
  vehicles,
}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={toggle}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {t('travel.vehicle.title')}
        <Icon
          sx={{
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
            cursor: 'pointer',
            padding: theme.spacing(0.5),
            width: theme.spacing(4),
            height: theme.spacing(4),
          }}
          onClick={toggle}
          aria-label="close"
        >
          close
        </Icon>
      </DialogTitle>
      <DialogContent dividers sx={{padding: 0}}>
        {(vehicles && vehicles.length != 0 && (
          <List>
            {vehicles.map((vehicle, index, {length}) => (
              <Fragment key={index}>
                <VehicleItem
                  vehicle={vehicle}
                  select={() => {
                    setNewTravelDialog(true);
                    setSelectedVehicle(vehicle);
                    toggle();
                  }}
                />
                {index + 1 < length && <Divider />}
              </Fragment>
            ))}
          </List>
        )) || (
          <Container sx={{padding: theme.spacing(2, 3)}}>
            <Typography>{t('travel.vehicle.empty')}</Typography>
          </Container>
        )}
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button
          sx={{maxWidth: '300px'}}
          color="primary"
          fullWidth
          variant="outlined"
          onClick={() => {
            setNewTravelDialog(true);
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

export default VehicleChoiceDialog;
