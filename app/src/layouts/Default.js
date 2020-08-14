import React from 'react';
import GenericMenu from '../containers/GenericMenu';

const DefaultLayout = ({
  children,
  className,
  menuTitle = 'Caroster',
  menuActions,
  goBack = false,
}) => {
  return (
    <>
      {(menuTitle || menuActions) && (
        <GenericMenu title={menuTitle} actions={menuActions} goBack={goBack} />
      )}
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
