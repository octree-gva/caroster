import React from 'react';

const DefaultLayout = ({children, className = undefined}) => {
  return <div className={className}>{children}</div>;
};

export default DefaultLayout;
