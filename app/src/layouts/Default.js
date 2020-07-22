import React from 'react';
import GenericMenu from '../containers/GenericMenu';
import Helmet from './Helmet';

const DefaultLayout = ({
  children,
  className,
  menuTitle = 'Caroster',
  menuActions,
  pageTitle = undefined,
}) => {
  return (
    <>
      <Helmet title={pageTitle || menuTitle} />
      {(menuTitle || menuActions) && (
        <GenericMenu title={menuTitle} actions={menuActions} />
      )}
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
