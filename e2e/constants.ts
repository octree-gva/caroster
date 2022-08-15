import {
  Event,
  Settings,
  Travel,
  UsersPermissionsUser,
  Vehicle,
} from "./graphql";

export const DATABASE_TEMPLATE_PATH = "./strapi/template.db";
export const DATABASE_PATH = "./strapi/test.db";

export const USER_PASSWORD = "Testtest1";
export const USER_ID = "1";
export const USER: Partial<UsersPermissionsUser> = {
  id: USER_ID,
  email: "test@octree.ch",
  username: "test",
  firstName: "Kai",
  lastName: "Doe",
};

export const EVENT_UUID = "2c336e59-087d-4dec-bf9b-f74b1ca22cd4";
export const EVENT_ID = "1";
export const EVENT: Event = {
  id: EVENT_ID,
  uuid: EVENT_UUID,
  email: "test+event@octree.ch",
  name: "A Test Event",
  address: "442, rue Auguste Lebon, 78 432 Fernandes, France",
  description: "Description de l'événement de test",
  created_at: "2022-08-12",
  updated_at: "2022-08-20",
};

export const TRAVEL_ID = "1";
export const TRAVEL: Travel = {
  id: TRAVEL_ID,
  details: "Travel details",
  event: EVENT,
  meeting: "Meeting test point",
  passengers: [],
  phone_number: "+41 79 632 58 85",
  seats: 4,
  vehicleName: "The Test Car",
  departure: "2023-08-12T13:57:40.093Z",
  created_at: "2022-08-12",
  updated_at: "2022-08-20",
};

export const VEHICLE_ID = "1";
export const VEHICLE: Partial<Vehicle> = {
  id: VEHICLE_ID,
  name: "My Test Car",
  seats: 4,
  phone_number: "+41 79 632 58 85",
  user: USER as UsersPermissionsUser,
};

export const SETTING_FR: Partial<Settings> = {
  announcement: "Annonce en français",
  about_link: "https://about.test",
  faq_link: "https://faq.test",
};

export const SETTING_EN: Partial<Settings> = {
  announcement: "Annoucement in english",
  about_link: "https://about.test",
  faq_link: "https://faq.test",
};
