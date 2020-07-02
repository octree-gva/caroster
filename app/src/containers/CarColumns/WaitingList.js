import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useStrapi} from 'strapi-react-context';
import {useEvent} from '../../contexts/Event';
import PassengersList from '../PassengersList';
import Divider from '@material-ui/core/Divider';

const WaitingList = ({car}) => {
  const {t} = useTranslation();
  const {event} = useEvent();
  const strapi = useStrapi();
  const classes = useStyles();

  const addPassenger = async passenger => {
    try {
      await strapi.services.events.update(event.id, {
        waiting_list: [...(event.waiting_list || []), passenger],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removePassenger = async idx => {
    try {
      await strapi.services.events.update(event.id, {
        waiting_list: event.waiting_list.filter((_, i) => i !== idx),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper>
      <div className={classes.header}>
        <Typography variant="h5">{t('passenger.title')}</Typography>
      </div>
      <Divider />
      <PassengersList
        hideEmpty
        passengers={event.waiting_list}
        places={50}
        addPassenger={addPassenger}
        removePassenger={removePassenger}
      />
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  header: {padding: theme.spacing(2)},
}));

export default WaitingList;
