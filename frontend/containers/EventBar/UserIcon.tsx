import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
  else return <AccountCircleOutlinedIcon />;
};

export default UserIcon;
