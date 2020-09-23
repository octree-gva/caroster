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
  goBack = false,
}) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle || menuTitle}</title>
      </Helmet>
      {displayMenu && (menuTitle || menuActions) && (
        <GenericMenu title={menuTitle} actions={menuActions} goBack={goBack} />
      )}
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
