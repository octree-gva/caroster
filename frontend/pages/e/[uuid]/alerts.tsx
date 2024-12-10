import {PropsWithChildren} from 'react';
import Alerts from '../../../containers/Alerts';
import EventLayout, {TabComponent} from '../../../layouts/Event';
import {
  EventByUuidDocument,
  EventEntity,
  TripAlertDocument,
  TripAlertEntity,
} from '../../../generated/graphql';
import pageUtils from '../../../lib/pageUtils';
import {getLocaleForLang} from '../../../lib/getLocale';

interface Props {
  eventUUID: string;
  announcement?: string;
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
}

const Page = (props: PropsWithChildren<Props>) => {
  return (
    <EventLayout
      {...props}
      Tab={AlertsTab}
      tabProps={{tripAlertEntity: props.tripAlertEntity}}
    />
  );
};

const AlertsTab: TabComponent<Props> = ({
  event,
  tripAlertEntity,
}: {
  event: EventEntity;
  tripAlertEntity: TripAlertEntity;
}) => {
  return <Alerts event={event} tripAlertEntity={tripAlertEntity} />;
};

export const getServerSideProps = pageUtils.getServerSideProps(
  async (context, apolloClient) => {
    const {uuid} = context.query;
    const {host = ''} = context.req.headers;
    let event = null;
    let tripAlertEntity = null;

    try {
      const {data} = await apolloClient.query({
        query: EventByUuidDocument,
        variables: {uuid},
      });
      event = data?.eventByUUID?.data;
    } catch (error) {
      return {
        notFound: true,
      };
    }

    const isCarosterPlus =
      event?.attributes?.enabled_modules?.includes('caroster-plus');
    if (!isCarosterPlus)
      return {
        notFound: true,
      };

    try {
      const {data} = await apolloClient.query({
        query: TripAlertDocument,
        variables: {eventId: event.id},
      });
      tripAlertEntity = data.eventTripAlert.data;
    } catch (error) {
      tripAlertEntity = null;
    }

    const description = await getLocaleForLang(
      event?.attributes?.lang,
      'meta.description'
    );

    return {
      props: {
        eventUUID: uuid,
        tripAlertEntity,
        metas: {
          title: event?.attributes?.name || '',
          description,
          url: `https://${host}${context.resolvedUrl}`,
        },
      },
    };
  }
);

export default Page;
