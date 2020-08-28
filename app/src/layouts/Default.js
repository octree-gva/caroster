import React from 'react';
import {Helmet} from 'react-helmet';
import GenericMenu from '../containers/GenericMenu';

const DefaultLayout = ({
  children,
  className,
  menuTitle = 'Caroster',
  menuActions,
  pageTitle = undefined,
  displayMenu = true,
}) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle || menuTitle}</title>
      </Helmet>
      {displayMenu && (menuTitle || menuActions) && (
        <GenericMenu title={menuTitle} actions={menuActions} />
      )}
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
