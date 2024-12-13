import {TravelEntity} from '../generated/graphql';

export const getTravelName = (
  travel: TravelEntity,
  canSeeFullName: boolean
) => {
  const hideName = (name: string) => (canSeeFullName ? name : `${name[0]}.`);

  if (travel.attributes.firstname && travel.attributes.lastname)
    return `${travel.attributes.firstname} ${hideName(
      travel.attributes.lastname
    )}`;

  const linkedUser = travel.attributes?.user?.data?.attributes;
  if (linkedUser?.firstName && linkedUser?.lastName)
    return `${linkedUser.firstName} ${hideName(linkedUser.lastName)}`;

  return travel.attributes.vehicleName;
};
