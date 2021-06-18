import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
const ProfileField = ({
  name,
  label,
  value,
  defaultValue = '',
  onChange,
  isEditing,
  ...inputProps
}) => {
  if (isEditing) {
    return (
      <TextField
        label={label}
        fullWidth
        margin="dense"
        value={value}
        onChange={({target: {value = ''}}) => onChange(value)}
        id={`Profile${name}`}
        name={name}
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
