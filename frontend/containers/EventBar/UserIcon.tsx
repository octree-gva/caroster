import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useProfile from '../../hooks/useProfile';
import theme from '../../theme';

const UserIcon = () => {
  const {profile} = useProfile();

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
