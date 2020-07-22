import React from 'react';
import GenericMenu from '../containers/GenericMenu';

const DefaultLayout = ({
  children,
  className,
  menuTitle = 'Caroster',
  menuActions,
}) => {
  return (
    <>
      {(menuTitle || menuActions) && (
        <GenericMenu title={menuTitle} actions={menuActions} />
      )}
      <div className={className}>{children}</div>
    </>
  );
};

export default DefaultLayout;
