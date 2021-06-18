import {ReactNode} from 'react';
import {Helmet} from 'react-helmet';
import GenericMenu from '../containers/GenericMenu';
import useGTM from '../hooks/useGTM';

interface Props {
  children: ReactNode;
  className?: string;
  menuTitle?: string;
  menuActions?: any;
  pageTitle?: string;
  displayMenu?: boolean;
  goBack?: () => void;
}

const DefaultLayout = (props: Props) => {
  const {
    children,
    className,
    menuTitle = 'Caroster',
    menuActions,
    pageTitle = undefined,
    displayMenu = true,
    goBack = () => {},
  } = props;

  useGTM();

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
