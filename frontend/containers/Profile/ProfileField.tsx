import Typography from '@mui/material/Typography';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import {Box} from '@mui/material';

type Props = TextFieldProps & {
  isEditing: boolean;
};

const ProfileField = (props: Props) => {
  const {onChange, isEditing, ...inputProps} = props;
  const {name, label, value, defaultValue = ''} = inputProps;

  if (isEditing) {
    return (
      <Box mb={1}>
        <TextField
          fullWidth
          margin="dense"
          onChange={e => onChange(e.target.value)}
          id={`Profile${name}`}
          {...inputProps}
        />
      </Box>
    );
  }
  return (
    <Box mb={2}>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="h6">{value || defaultValue}</Typography>
    </Box>
  );
};
export default ProfileField;
