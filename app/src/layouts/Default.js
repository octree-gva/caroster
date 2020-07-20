import React from 'react';
import Helmet from './Helmet';

const DefaultLayout = ({children, title, className = undefined}) => {
  return (
    <>
      <Helmet title={title} />
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
