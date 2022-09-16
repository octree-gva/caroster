import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import useProfile from '../../hooks/useProfile';

const UserIcon = () => {
  const {profile} = useProfile();
  const classes = useStyles();

  if (profile)
    return (
      <Avatar className={classes.avatar}>
        {`${profile.username[0]}`.toUpperCase()}
      </Avatar>
    );
  else return <Icon>more_vert</Icon>;
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 16,
  },
}));

export default UserIcon;
