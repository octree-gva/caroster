import {Link, MenuItem} from '@mui/material';
import React from 'react';

type Props = {
  label: JSX.Element | string;
  url: string;
  id: string;
};

const ExternalLink = (props: Props) => {
  const {label, url, id} = props;

  return (
    <Link href={url} target="_blank" underline="none">
      <MenuItem id={id}>{label}</MenuItem>
    </Link>
  );
};

export default ExternalLink;
