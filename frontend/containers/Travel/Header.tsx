import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Link from '@material-ui/core/Link';
import {Travel} from '../../generated/graphql';
import getMapsLink from '../../utils/getMapsLink';

interface Props {
  travel: Travel;
  toggleEditing: () => void;
}

const Header = (props: Props) => {
  const {travel, toggleEditing} = props;
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <div className={classes.header}>
      <IconButton
        size="small"
        color="primary"
        className={classes.editBtn}
        onClick={toggleEditing}
        id="EditTravelBtn"
      >
        <Icon>edit</Icon>
      </IconButton>
      {!!travel.departure && (
        <Typography variant="overline" id="TravelDeparture">
          {moment(travel.departure).format('LLLL')}
        </Typography>
      )}
      <Typography variant="h5" id="TravelName">
        {travel.vehicleName}
      </Typography>
      {!!travel.phone_number && (
        <div className={classes.section}>
          <Typography variant="subtitle2">
            {t('travel.fields.phone')}
          </Typography>
          <Typography variant="body2" id="TravelPhone">
            {travel.phone_number}
          </Typography>
        </div>
      )}
      {!!travel.meeting && (
        <div className={classes.section}>
          <Typography variant="subtitle2">
            {t('travel.fields.meeting_point')}
          </Typography>
          <Typography variant="body2" id="TravelMeeting">
            <Link
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={getMapsLink(travel.meeting)}
            >
              {travel.meeting}
            </Link>
          </Typography>
        </div>
      )}
      {!!travel.details && (
        <div className={classes.section}>
          <Typography variant="subtitle2">
            {t('travel.fields.details')}
          </Typography>
          <Typography variant="body2" id="TravelDetails">
            {travel.details}
          </Typography>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2),
  },
  editBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    zIndex: theme.zIndex.speedDial,
  },
  section: {
    marginTop: theme.spacing(2),
  },
}));

export default Header;
