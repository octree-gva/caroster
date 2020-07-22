import React from 'react';
import {Helmet} from 'react-helmet';

const LayoutHelmet = ({title}) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default LayoutHelmet;
