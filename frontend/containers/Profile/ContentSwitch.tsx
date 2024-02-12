import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const ContentSwitch = ({
  isEditing,
  checked,
  onChange,
  trueLabel,
  falseLabel,
  t,
}) => {
  return isEditing ? (
    <Switch checked={checked} onChange={onChange} />
  ) : (
    <Typography variant="h6">
      {checked ? t(trueLabel) : t(falseLabel)}
    </Typography>
  );
};

export default ContentSwitch;
