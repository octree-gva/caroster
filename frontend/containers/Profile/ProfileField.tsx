import Typography from '@material-ui/core/Typography';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

type Props = TextFieldProps & {
  isEditing: boolean;
};

const ProfileField = (props: Props) => {
  const {onChange, isEditing, ...inputProps} = props;
  const {name, label, value, defaultValue = ''} = inputProps;

  if (isEditing) {
    return (
      <TextField
        fullWidth
        margin="dense"
        onChange={e => onChange(e.target.value)}
        id={`Profile${name}`}
        {...inputProps}
      />
    );
  }
  return (
    <>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body1" gutterBottom>
        {value || defaultValue}
      </Typography>
    </>
  );
};
export default ProfileField;
