import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import {useTheme} from '@mui/material/styles';
import useProfile from '../../hooks/useProfile';

const UserIcon = () => {
  const {profile} = useProfile();
  const theme = useTheme();

  if (profile)
    return (
      <Avatar
        sx={{width: theme.spacing(3), height: theme.spacing(3), fontSize: 16}}
      >
        {`${profile.username[0]}`.toUpperCase()}
      </Avatar>
    );
  else return <Icon>more_vert</Icon>;
};

export default UserIcon;
