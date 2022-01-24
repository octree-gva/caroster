import {ReactNode} from 'react';
import {Helmet} from 'react-helmet';
import useGTM from '../hooks/useGTM';
import GenericToolbar from '../containers/GenericToolbar';
import {ActionType} from '../containers/GenericMenu/Action';

interface Props {
  children: ReactNode;
  className?: string;
  menuTitle?: string;
  menuActions?: Array<ActionType>;
  pageTitle?: string;
  displayMenu?: boolean;
  goBack?: () => void;
}

const DefaultLayout = (props: Props) => {
  const {
    children,
    className,
    pageTitle = undefined,
    displayMenu = true,
    menuTitle = 'Caroster',
    menuActions,
    goBack = null,
  } = props;

  useGTM();

  return (
    <div className={className}>
      <Helmet>
        <title>{pageTitle || menuTitle}</title>
      </Helmet>
      {displayMenu && (menuTitle || menuActions) && (
        <GenericToolbar
          title={menuTitle}
          actions={menuActions}
          goBack={goBack}
        />
      )}
      {children}
    </div>
  );
};

export default DefaultLayout;
