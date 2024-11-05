import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  I18NLocaleCode: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Enum_Event_Lang {
  de = 'de',
  en = 'en',
  fr = 'fr',
  nl = 'nl'
}

export enum Enum_Notification_Type {
  AddedAsAdmin = 'AddedAsAdmin',
  ContactTripCreator = 'ContactTripCreator',
  DeletedFromTrip = 'DeletedFromTrip',
  DeletedTrip = 'DeletedTrip',
  DeletedYourTrip = 'DeletedYourTrip',
  EnabledCarosterPlus = 'EnabledCarosterPlus',
  EventCreated = 'EventCreated',
  EventEnded = 'EventEnded',
  EventRecap = 'EventRecap',
  NewPassengerInYourTrip = 'NewPassengerInYourTrip',
  NewTrip = 'NewTrip',
  NewTripAlert = 'NewTripAlert',
  PassengerJoinTrip = 'PassengerJoinTrip'
}

export enum Enum_Page_Type {
  tos = 'tos'
}

export enum Enum_Userspermissionsuser_Lang {
  de = 'de',
  en = 'en',
  fr = 'fr',
  nl = 'nl'
}

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']['output']>;
  administrators?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  date?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  enabled_modules?: Maybe<Scalars['JSON']['output']>;
  lang?: Maybe<Enum_Event_Lang>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  passengers?: Maybe<PassengerRelationResponseCollection>;
  travels?: Maybe<TravelRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  waitingPassengers?: Maybe<PassengerRelationResponseCollection>;
};


export type EventPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type EventTravelsArgs = {
  filters?: InputMaybe<TravelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse';
  data?: Maybe<EventEntity>;
};

export type EventFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  administrators?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  date?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  enabled_modules?: InputMaybe<JsonFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lang?: InputMaybe<StringFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  newsletter?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  travels?: InputMaybe<TravelFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
  uuid?: InputMaybe<StringFilterInput>;
};

export type EventInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  administrators?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled_modules?: InputMaybe<Scalars['JSON']['input']>;
  lang?: InputMaybe<Enum_Event_Lang>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  travels?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = Event | I18NLocale | Module | Notification | Page | Passenger | Setting | Travel | TripAlert | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Vehicle;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Module = {
  __typename?: 'Module';
  caroster_plus_description?: Maybe<Scalars['String']['output']>;
  caroster_plus_enabled?: Maybe<Scalars['Boolean']['output']>;
  caroster_plus_name: Scalars['String']['output'];
  caroster_plus_payment_link: Scalars['String']['output'];
  caroster_plus_price?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<ModuleRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ModuleEntity = {
  __typename?: 'ModuleEntity';
  attributes?: Maybe<Module>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ModuleEntityResponse = {
  __typename?: 'ModuleEntityResponse';
  data?: Maybe<ModuleEntity>;
};

export type ModuleInput = {
  caroster_plus_description?: InputMaybe<Scalars['String']['input']>;
  caroster_plus_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  caroster_plus_name?: InputMaybe<Scalars['String']['input']>;
  caroster_plus_payment_link?: InputMaybe<Scalars['String']['input']>;
  caroster_plus_payment_link_id?: InputMaybe<Scalars['String']['input']>;
  caroster_plus_price?: InputMaybe<Scalars['Float']['input']>;
};

export type ModuleRelationResponseCollection = {
  __typename?: 'ModuleRelationResponseCollection';
  data: Array<ModuleEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEventAdmin?: Maybe<EventEntityResponse>;
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createEvent?: Maybe<EventEntityResponse>;
  createModuleLocalization?: Maybe<ModuleEntityResponse>;
  createNotification?: Maybe<NotificationEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  /** Create a passenger */
  createPassenger?: Maybe<PassengerEntityResponse>;
  createSettingLocalization?: Maybe<SettingEntityResponse>;
  createTravel?: Maybe<TravelEntityResponse>;
  createTripAlert?: Maybe<TripAlertEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVehicle?: Maybe<VehicleEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteEventAdmin?: Maybe<EventEntityResponse>;
  deleteModule?: Maybe<ModuleEntityResponse>;
  deleteNotification?: Maybe<NotificationEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePassenger?: Maybe<PassengerEntityResponse>;
  deleteSetting?: Maybe<SettingEntityResponse>;
  deleteTravel?: Maybe<TravelEntityResponse>;
  deleteTripAlert?: Maybe<TripAlertEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVehicle?: Maybe<VehicleEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  readNotifications?: Maybe<NotificationEntityResponseCollection>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  setTripAlert?: Maybe<TripAlertEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  /** Update an event using its UUID */
  updateEventByUUID?: Maybe<EventEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateMe: UsersPermissionsUserEntityResponse;
  updateModule?: Maybe<ModuleEntityResponse>;
  updateNotification?: Maybe<NotificationEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  /** Update a passenger */
  updatePassenger?: Maybe<PassengerEntityResponse>;
  updateSetting?: Maybe<SettingEntityResponse>;
  updateTravel?: Maybe<TravelEntityResponse>;
  updateTripAlert?: Maybe<TripAlertEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVehicle?: Maybe<VehicleEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationAddEventAdminArgs = {
  email: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateModuleLocalizationArgs = {
  data?: InputMaybe<ModuleInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateNotificationArgs = {
  data: NotificationInput;
};


export type MutationCreatePageArgs = {
  data: PageInput;
};


export type MutationCreatePassengerArgs = {
  data: PassengerInput;
};


export type MutationCreateSettingLocalizationArgs = {
  data?: InputMaybe<SettingInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateTravelArgs = {
  createVehicle?: InputMaybe<Scalars['Boolean']['input']>;
  data: TravelInput;
};


export type MutationCreateTripAlertArgs = {
  data: TripAlertInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVehicleArgs = {
  data: VehicleInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEventAdminArgs = {
  email: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
};


export type MutationDeleteModuleArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePassengerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSettingArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteTravelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTripAlertArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationReadNotificationsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationSetTripAlertArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  event: Scalars['ID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventByUuidArgs = {
  data: EventInput;
  uuid: Scalars['String']['input'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateMeArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationUpdateModuleArgs = {
  data: ModuleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePassengerArgs = {
  data: PassengerInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSettingArgs = {
  data: SettingInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateTravelArgs = {
  data: TravelInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTripAlertArgs = {
  data: TripAlertInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVehicleArgs = {
  data: VehicleInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  event?: Maybe<EventEntityResponse>;
  payload?: Maybe<Scalars['JSON']['output']>;
  read?: Maybe<Scalars['Boolean']['output']>;
  type: Enum_Notification_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  attributes?: Maybe<Notification>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type NotificationEntityResponse = {
  __typename?: 'NotificationEntityResponse';
  data?: Maybe<NotificationEntity>;
};

export type NotificationEntityResponseCollection = {
  __typename?: 'NotificationEntityResponseCollection';
  data: Array<NotificationEntity>;
  meta: ResponseCollectionMeta;
};

export type NotificationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NotificationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<NotificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NotificationFiltersInput>>>;
  payload?: InputMaybe<JsonFilterInput>;
  read?: InputMaybe<BooleanFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type NotificationInput = {
  event?: InputMaybe<Scalars['ID']['input']>;
  payload?: InputMaybe<Scalars['JSON']['input']>;
  read?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Enum_Notification_Type>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type NotificationRelationResponseCollection = {
  __typename?: 'NotificationRelationResponseCollection';
  data: Array<NotificationEntity>;
};

export type Page = {
  __typename?: 'Page';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  type?: Maybe<Enum_Page_Type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Enum_Page_Type>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Passenger = {
  __typename?: 'Passenger';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  event?: Maybe<EventEntityResponse>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  phoneCountry?: Maybe<Scalars['String']['output']>;
  travel?: Maybe<TravelEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type PassengerEntity = {
  __typename?: 'PassengerEntity';
  attributes?: Maybe<Passenger>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PassengerEntityResponse = {
  __typename?: 'PassengerEntityResponse';
  data?: Maybe<PassengerEntity>;
};

export type PassengerEntityResponseCollection = {
  __typename?: 'PassengerEntityResponseCollection';
  data: Array<PassengerEntity>;
  meta: ResponseCollectionMeta;
};

export type PassengerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PassengerFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  location?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PassengerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PassengerFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  phoneCountry?: InputMaybe<StringFilterInput>;
  travel?: InputMaybe<TravelFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type PassengerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  phoneCountry?: InputMaybe<Scalars['String']['input']>;
  travel?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type PassengerRelationResponseCollection = {
  __typename?: 'PassengerRelationResponseCollection';
  data: Array<PassengerEntity>;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<EventEntityResponse>;
  /** Retrieve an event using its UUID */
  eventByUUID?: Maybe<EventEntityResponse>;
  eventTripAlert?: Maybe<TripAlertEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  module?: Maybe<ModuleEntityResponse>;
  notification?: Maybe<NotificationEntityResponse>;
  notifications?: Maybe<NotificationEntityResponseCollection>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  passenger?: Maybe<PassengerEntityResponse>;
  passengers?: Maybe<PassengerEntityResponseCollection>;
  setting?: Maybe<SettingEntityResponse>;
  travel?: Maybe<TravelEntityResponse>;
  travels?: Maybe<TravelEntityResponseCollection>;
  tripAlert?: Maybe<TripAlertEntityResponse>;
  tripAlerts?: Maybe<TripAlertEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  vehicle?: Maybe<VehicleEntityResponse>;
  vehicles?: Maybe<VehicleEntityResponseCollection>;
};


export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryEventTripAlertArgs = {
  event: Scalars['ID']['input'];
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryModuleArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryNotificationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPassengerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySettingArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryTravelArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTravelsArgs = {
  filters?: InputMaybe<TravelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTripAlertArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTripAlertsArgs = {
  filters?: InputMaybe<TripAlertFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVehicleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVehiclesArgs = {
  filters?: InputMaybe<VehicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Setting = {
  __typename?: 'Setting';
  about_link?: Maybe<Scalars['String']['output']>;
  announcement?: Maybe<Scalars['String']['output']>;
  code_link?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data_policy_link?: Maybe<Scalars['String']['output']>;
  gtm_id?: Maybe<Scalars['String']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<SettingRelationResponseCollection>;
  matomo_script_url?: Maybe<Scalars['String']['output']>;
  opencollective_link?: Maybe<Scalars['String']['output']>;
  stripe_dashboard_link?: Maybe<Scalars['String']['output']>;
  tos_link?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SettingEntity = {
  __typename?: 'SettingEntity';
  attributes?: Maybe<Setting>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type SettingEntityResponse = {
  __typename?: 'SettingEntityResponse';
  data?: Maybe<SettingEntity>;
};

export type SettingInput = {
  about_link?: InputMaybe<Scalars['String']['input']>;
  announcement?: InputMaybe<Scalars['String']['input']>;
  code_link?: InputMaybe<Scalars['String']['input']>;
  data_policy_link?: InputMaybe<Scalars['String']['input']>;
  gtm_id?: InputMaybe<Scalars['String']['input']>;
  matomo_script_url?: InputMaybe<Scalars['String']['input']>;
  opencollective_link?: InputMaybe<Scalars['String']['input']>;
  stripe_dashboard_link?: InputMaybe<Scalars['String']['input']>;
  tos_link?: InputMaybe<Scalars['String']['input']>;
};

export type SettingRelationResponseCollection = {
  __typename?: 'SettingRelationResponseCollection';
  data: Array<SettingEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Travel = {
  __typename?: 'Travel';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  departureDate?: Maybe<Scalars['Date']['output']>;
  departureTime?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  event?: Maybe<EventEntityResponse>;
  meeting?: Maybe<Scalars['String']['output']>;
  meeting_latitude?: Maybe<Scalars['Float']['output']>;
  meeting_longitude?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<PassengerRelationResponseCollection>;
  phoneCountry?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  seats?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
  vehicleName?: Maybe<Scalars['String']['output']>;
};


export type TravelPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TravelEntity = {
  __typename?: 'TravelEntity';
  attributes?: Maybe<Travel>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TravelEntityResponse = {
  __typename?: 'TravelEntityResponse';
  data?: Maybe<TravelEntity>;
};

export type TravelEntityResponseCollection = {
  __typename?: 'TravelEntityResponseCollection';
  data: Array<TravelEntity>;
  meta: ResponseCollectionMeta;
};

export type TravelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TravelFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  departureDate?: InputMaybe<DateFilterInput>;
  departureTime?: InputMaybe<StringFilterInput>;
  details?: InputMaybe<StringFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  meeting?: InputMaybe<StringFilterInput>;
  meeting_latitude?: InputMaybe<FloatFilterInput>;
  meeting_longitude?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<TravelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TravelFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  phoneCountry?: InputMaybe<StringFilterInput>;
  phone_number?: InputMaybe<StringFilterInput>;
  seats?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
  vehicleName?: InputMaybe<StringFilterInput>;
};

export type TravelInput = {
  departureDate?: InputMaybe<Scalars['Date']['input']>;
  departureTime?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<Scalars['ID']['input']>;
  meeting?: InputMaybe<Scalars['String']['input']>;
  meeting_latitude?: InputMaybe<Scalars['Float']['input']>;
  meeting_longitude?: InputMaybe<Scalars['Float']['input']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  phoneCountry?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  seats?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
  vehicleName?: InputMaybe<Scalars['String']['input']>;
};

export type TravelRelationResponseCollection = {
  __typename?: 'TravelRelationResponseCollection';
  data: Array<TravelEntity>;
};

export type TripAlert = {
  __typename?: 'TripAlert';
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  event?: Maybe<EventEntityResponse>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type TripAlertEntity = {
  __typename?: 'TripAlertEntity';
  attributes?: Maybe<TripAlert>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TripAlertEntityResponse = {
  __typename?: 'TripAlertEntityResponse';
  data?: Maybe<TripAlertEntity>;
};

export type TripAlertEntityResponseCollection = {
  __typename?: 'TripAlertEntityResponseCollection';
  data: Array<TripAlertEntity>;
  meta: ResponseCollectionMeta;
};

export type TripAlertFiltersInput = {
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TripAlertFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  enabled?: InputMaybe<BooleanFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<TripAlertFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TripAlertFiltersInput>>>;
  radius?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type TripAlertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  event?: InputMaybe<Scalars['ID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  profile?: Maybe<UsersPermissionsUser>;
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  newsletterConsent?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
  tosAcceptationDate?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  events?: Maybe<EventRelationResponseCollection>;
  firstName?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  lastName?: Maybe<Scalars['String']['output']>;
  newsletterConsent?: Maybe<Scalars['Boolean']['output']>;
  notificationEnabled?: Maybe<Scalars['Boolean']['output']>;
  notifications?: Maybe<NotificationRelationResponseCollection>;
  onboardingCreator?: Maybe<Scalars['Boolean']['output']>;
  onboardingUser?: Maybe<Scalars['Boolean']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  tosAcceptationDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
  vehicles?: Maybe<VehicleRelationResponseCollection>;
};


export type UsersPermissionsUserEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsUserNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsUserVehiclesArgs = {
  filters?: InputMaybe<VehicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  events?: InputMaybe<EventFiltersInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lang?: InputMaybe<StringFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  newsletterConsent?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  notificationEnabled?: InputMaybe<BooleanFilterInput>;
  notifications?: InputMaybe<NotificationFiltersInput>;
  onboardingCreator?: InputMaybe<BooleanFilterInput>;
  onboardingUser?: InputMaybe<BooleanFilterInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  tosAcceptationDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
  vehicles?: InputMaybe<VehicleFiltersInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Enum_Userspermissionsuser_Lang>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  newsletterConsent?: InputMaybe<Scalars['Boolean']['input']>;
  notificationEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  notifications?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  onboardingCreator?: InputMaybe<Scalars['Boolean']['input']>;
  onboardingUser?: InputMaybe<Scalars['Boolean']['input']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  tosAcceptationDate?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  phoneCountry?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  seats?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type VehicleEntity = {
  __typename?: 'VehicleEntity';
  attributes?: Maybe<Vehicle>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type VehicleEntityResponse = {
  __typename?: 'VehicleEntityResponse';
  data?: Maybe<VehicleEntity>;
};

export type VehicleEntityResponseCollection = {
  __typename?: 'VehicleEntityResponseCollection';
  data: Array<VehicleEntity>;
  meta: ResponseCollectionMeta;
};

export type VehicleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VehicleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<VehicleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VehicleFiltersInput>>>;
  phoneCountry?: InputMaybe<StringFilterInput>;
  phone_number?: InputMaybe<StringFilterInput>;
  seats?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type VehicleInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  phoneCountry?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  seats?: InputMaybe<Scalars['Int']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type VehicleRelationResponseCollection = {
  __typename?: 'VehicleRelationResponseCollection';
  data: Array<VehicleEntity>;
};

export type TripAlertQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type TripAlertQuery = { __typename?: 'Query', eventTripAlert?: { __typename?: 'TripAlertEntityResponse', data?: { __typename?: 'TripAlertEntity', id?: string | null, attributes?: { __typename?: 'TripAlert', address?: string | null, enabled?: boolean | null, radius?: number | null, longitude?: number | null, latitude?: number | null } | null } | null } | null };

export type SetTripAlertMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SetTripAlertMutation = { __typename?: 'Mutation', setTripAlert?: { __typename?: 'TripAlertEntityResponse', data?: { __typename?: 'TripAlertEntity', id?: string | null, attributes?: { __typename?: 'TripAlert', latitude?: number | null, longitude?: number | null, address?: string | null, enabled?: boolean | null } | null } | null } | null };

export type MeFieldsFragment = { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null };

export type RegisterMutationVariables = Exact<{
  user: UsersPermissionsRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UsersPermissionsPasswordPayload', ok: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } | null };

export type EventFieldsFragment = { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null };

export type CreateEventMutationVariables = Exact<{
  eventData: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  eventUpdate: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type AddEventAdminMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type AddEventAdminMutation = { __typename?: 'Mutation', addEventAdmin?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', administrators?: Array<string | null> | null } | null } | null } | null };

export type DeleteEventAdminMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type DeleteEventAdminMutation = { __typename?: 'Mutation', deleteEventAdmin?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', administrators?: Array<string | null> | null } | null } | null } | null };

export type EventByUuidQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type EventByUuidQuery = { __typename?: 'Query', eventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type ModuleQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type ModuleQuery = { __typename?: 'Query', module?: { __typename?: 'ModuleEntityResponse', data?: { __typename?: 'ModuleEntity', attributes?: { __typename?: 'Module', caroster_plus_name: string, caroster_plus_price?: number | null, caroster_plus_enabled?: boolean | null, caroster_plus_description?: string | null, caroster_plus_payment_link: string } | null } | null } | null };

export type UserNotificationsQueryVariables = Exact<{
  maxItems?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserNotificationsQuery = { __typename?: 'Query', notifications?: { __typename?: 'NotificationEntityResponseCollection', data: Array<{ __typename?: 'NotificationEntity', id?: string | null, attributes?: { __typename?: 'Notification', type: Enum_Notification_Type, read?: boolean | null, createdAt?: any | null, event?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', name: string, uuid?: string | null } | null } | null } | null } | null }> } | null };

export type ReadNotificationsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ReadNotificationsMutation = { __typename?: 'Mutation', readNotifications?: { __typename?: 'NotificationEntityResponseCollection', data: Array<{ __typename?: 'NotificationEntity', id?: string | null, attributes?: { __typename?: 'Notification', type: Enum_Notification_Type, read?: boolean | null } | null }> } | null };

export type PassengerFieldsFragment = { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null };

export type CreatePassengerMutationVariables = Exact<{
  passenger: PassengerInput;
}>;


export type CreatePassengerMutation = { __typename?: 'Mutation', createPassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null } | null } | null };

export type UpdatePassengerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  passengerUpdate: PassengerInput;
}>;


export type UpdatePassengerMutation = { __typename?: 'Mutation', updatePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null } | null } | null };

export type DeletePassengerMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePassengerMutation = { __typename?: 'Mutation', deletePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null } | null } | null };

export type SettingQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input'];
}>;


export type SettingQuery = { __typename?: 'Query', setting?: { __typename?: 'SettingEntityResponse', data?: { __typename?: 'SettingEntity', id?: string | null, attributes?: { __typename?: 'Setting', gtm_id?: string | null, about_link?: string | null, announcement?: string | null, matomo_script_url?: string | null, opencollective_link?: string | null, code_link?: string | null, stripe_dashboard_link?: string | null, tos_link?: string | null, data_policy_link?: string | null } | null } | null } | null };

export type TravelFieldsFragment = { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null };

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
  createVehicle?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateTravelMutation = { __typename?: 'Mutation', createTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  travelUpdate: TravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTravelMutation = { __typename?: 'Mutation', deleteTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null } | null } | null };

export type UserFieldsFragment = { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, newsletterConsent?: boolean | null, notificationEnabled?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null, enabled_modules?: any | null } | null }> } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, newsletterConsent?: boolean | null, notificationEnabled?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null, enabled_modules?: any | null } | null }> } | null } | null } | null };

export type UpdateMeMutationVariables = Exact<{
  userUpdate: UsersPermissionsUserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, newsletterConsent?: boolean | null, notificationEnabled?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null, enabled_modules?: any | null } | null }> } | null } | null } | null } };

export type VehicleFieldsFragment = { __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string, seats?: number | null, phone_number?: string | null, phoneCountry?: string | null } | null };

export type FindUserVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVehiclesQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', vehicles?: { __typename?: 'VehicleRelationResponseCollection', data: Array<{ __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string, seats?: number | null, phone_number?: string | null, phoneCountry?: string | null } | null }> } | null } | null } | null };

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVehicleMutation = { __typename?: 'Mutation', deleteVehicle?: { __typename?: 'VehicleEntityResponse', data?: { __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string } | null } | null } | null };

export const MeFieldsFragmentDoc = gql`
    fragment MeFields on UsersPermissionsMe {
  id
  username
  email
  confirmed
}
    `;
export const EventFieldsFragmentDoc = gql`
    fragment EventFields on EventEntity {
  id
  attributes {
    uuid
    name
    description
    enabled_modules
    email
    lang
    administrators
    date
    address
    latitude
    longitude
    waitingPassengers {
      data {
        id
        attributes {
          name
          email
          location
          user {
            data {
              id
              attributes {
                firstName
                lastName
              }
            }
          }
        }
      }
    }
    travels(pagination: {limit: 500}) {
      data {
        id
        attributes {
          meeting
          meeting_latitude
          meeting_longitude
          departureDate
          departureTime
          details
          vehicleName
          phone_number
          phoneCountry
          seats
          user {
            data {
              id
            }
          }
          passengers {
            data {
              id
              attributes {
                name
                location
                email
                phone
                phoneCountry
                user {
                  data {
                    id
                    attributes {
                      firstName
                      lastName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const PassengerFieldsFragmentDoc = gql`
    fragment PassengerFields on PassengerEntity {
  id
  attributes {
    name
    location
    phone
    phoneCountry
    email
    user {
      data {
        id
        attributes {
          firstName
          lastName
          email
        }
      }
    }
  }
}
    `;
export const TravelFieldsFragmentDoc = gql`
    fragment TravelFields on TravelEntity {
  id
  attributes {
    meeting
    meeting_latitude
    meeting_longitude
    departureDate
    departureTime
    details
    vehicleName
    phone_number
    phoneCountry
    seats
    passengers {
      data {
        id
        attributes {
          name
          location
          phone
          phoneCountry
          user {
            data {
              id
              attributes {
                firstName
                lastName
                email
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on UsersPermissionsUser {
  username
  email
  confirmed
  lastName
  firstName
  lang
  onboardingUser
  onboardingCreator
  newsletterConsent
  notificationEnabled
  provider
  events(pagination: {limit: 500}) {
    data {
      id
      attributes {
        uuid
        name
        date
        address
        enabled_modules
      }
    }
  }
}
    `;
export const VehicleFieldsFragmentDoc = gql`
    fragment VehicleFields on VehicleEntity {
  id
  attributes {
    name
    seats
    phone_number
    phoneCountry
  }
}
    `;
export const TripAlertDocument = gql`
    query TripAlert($eventId: ID!) {
  eventTripAlert(event: $eventId) {
    data {
      id
      attributes {
        address
        enabled
        radius
        longitude
        latitude
      }
    }
  }
}
    `;

/**
 * __useTripAlertQuery__
 *
 * To run a query within a React component, call `useTripAlertQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripAlertQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripAlertQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useTripAlertQuery(baseOptions: Apollo.QueryHookOptions<TripAlertQuery, TripAlertQueryVariables> & ({ variables: TripAlertQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TripAlertQuery, TripAlertQueryVariables>(TripAlertDocument, options);
      }
export function useTripAlertLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TripAlertQuery, TripAlertQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TripAlertQuery, TripAlertQueryVariables>(TripAlertDocument, options);
        }
export function useTripAlertSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TripAlertQuery, TripAlertQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TripAlertQuery, TripAlertQueryVariables>(TripAlertDocument, options);
        }
export type TripAlertQueryHookResult = ReturnType<typeof useTripAlertQuery>;
export type TripAlertLazyQueryHookResult = ReturnType<typeof useTripAlertLazyQuery>;
export type TripAlertSuspenseQueryHookResult = ReturnType<typeof useTripAlertSuspenseQuery>;
export type TripAlertQueryResult = Apollo.QueryResult<TripAlertQuery, TripAlertQueryVariables>;
export const SetTripAlertDocument = gql`
    mutation SetTripAlert($eventId: ID!, $enabled: Boolean, $latitude: Float, $longitude: Float, $address: String, $radius: Float) {
  setTripAlert(
    event: $eventId
    latitude: $latitude
    longitude: $longitude
    address: $address
    radius: $radius
    enabled: $enabled
  ) {
    data {
      id
      attributes {
        latitude
        longitude
        address
        enabled
      }
    }
  }
}
    `;
export type SetTripAlertMutationFn = Apollo.MutationFunction<SetTripAlertMutation, SetTripAlertMutationVariables>;

/**
 * __useSetTripAlertMutation__
 *
 * To run a mutation, you first call `useSetTripAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTripAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTripAlertMutation, { data, loading, error }] = useSetTripAlertMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      enabled: // value for 'enabled'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      address: // value for 'address'
 *      radius: // value for 'radius'
 *   },
 * });
 */
export function useSetTripAlertMutation(baseOptions?: Apollo.MutationHookOptions<SetTripAlertMutation, SetTripAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTripAlertMutation, SetTripAlertMutationVariables>(SetTripAlertDocument, options);
      }
export type SetTripAlertMutationHookResult = ReturnType<typeof useSetTripAlertMutation>;
export type SetTripAlertMutationResult = Apollo.MutationResult<SetTripAlertMutation>;
export type SetTripAlertMutationOptions = Apollo.BaseMutationOptions<SetTripAlertMutation, SetTripAlertMutationVariables>;
export const RegisterDocument = gql`
    mutation register($user: UsersPermissionsRegisterInput!) {
  register(input: $user) {
    jwt
    user {
      ...MeFields
    }
  }
}
    ${MeFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($password: String!, $passwordConfirmation: String!, $code: String!) {
  resetPassword(
    password: $password
    passwordConfirmation: $passwordConfirmation
    code: $code
  ) {
    jwt
    user {
      ...MeFields
    }
  }
}
    ${MeFieldsFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CreateEventDocument = gql`
    mutation createEvent($eventData: EventInput!) {
  createEvent(data: $eventData) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      eventData: // value for 'eventData'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation updateEvent($uuid: String!, $eventUpdate: EventInput!) {
  updateEventByUUID(uuid: $uuid, data: $eventUpdate) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      eventUpdate: // value for 'eventUpdate'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const AddEventAdminDocument = gql`
    mutation addEventAdmin($eventId: ID!, $email: String!) {
  addEventAdmin(eventId: $eventId, email: $email) {
    data {
      id
      attributes {
        administrators
      }
    }
  }
}
    `;
export type AddEventAdminMutationFn = Apollo.MutationFunction<AddEventAdminMutation, AddEventAdminMutationVariables>;

/**
 * __useAddEventAdminMutation__
 *
 * To run a mutation, you first call `useAddEventAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventAdminMutation, { data, loading, error }] = useAddEventAdminMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddEventAdminMutation(baseOptions?: Apollo.MutationHookOptions<AddEventAdminMutation, AddEventAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventAdminMutation, AddEventAdminMutationVariables>(AddEventAdminDocument, options);
      }
export type AddEventAdminMutationHookResult = ReturnType<typeof useAddEventAdminMutation>;
export type AddEventAdminMutationResult = Apollo.MutationResult<AddEventAdminMutation>;
export type AddEventAdminMutationOptions = Apollo.BaseMutationOptions<AddEventAdminMutation, AddEventAdminMutationVariables>;
export const DeleteEventAdminDocument = gql`
    mutation deleteEventAdmin($eventId: ID!, $email: String!) {
  deleteEventAdmin(eventId: $eventId, email: $email) {
    data {
      id
      attributes {
        administrators
      }
    }
  }
}
    `;
export type DeleteEventAdminMutationFn = Apollo.MutationFunction<DeleteEventAdminMutation, DeleteEventAdminMutationVariables>;

/**
 * __useDeleteEventAdminMutation__
 *
 * To run a mutation, you first call `useDeleteEventAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventAdminMutation, { data, loading, error }] = useDeleteEventAdminMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteEventAdminMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventAdminMutation, DeleteEventAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventAdminMutation, DeleteEventAdminMutationVariables>(DeleteEventAdminDocument, options);
      }
export type DeleteEventAdminMutationHookResult = ReturnType<typeof useDeleteEventAdminMutation>;
export type DeleteEventAdminMutationResult = Apollo.MutationResult<DeleteEventAdminMutation>;
export type DeleteEventAdminMutationOptions = Apollo.BaseMutationOptions<DeleteEventAdminMutation, DeleteEventAdminMutationVariables>;
export const EventByUuidDocument = gql`
    query eventByUUID($uuid: String!) {
  eventByUUID(uuid: $uuid) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useEventByUuidQuery__
 *
 * To run a query within a React component, call `useEventByUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByUuidQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useEventByUuidQuery(baseOptions: Apollo.QueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables> & ({ variables: EventByUuidQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, options);
      }
export function useEventByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, options);
        }
export function useEventByUuidSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, options);
        }
export type EventByUuidQueryHookResult = ReturnType<typeof useEventByUuidQuery>;
export type EventByUuidLazyQueryHookResult = ReturnType<typeof useEventByUuidLazyQuery>;
export type EventByUuidSuspenseQueryHookResult = ReturnType<typeof useEventByUuidSuspenseQuery>;
export type EventByUuidQueryResult = Apollo.QueryResult<EventByUuidQuery, EventByUuidQueryVariables>;
export const ModuleDocument = gql`
    query module($locale: I18NLocaleCode!) {
  module(locale: $locale) {
    data {
      attributes {
        caroster_plus_name
        caroster_plus_price
        caroster_plus_enabled
        caroster_plus_description
        caroster_plus_payment_link
      }
    }
  }
}
    `;

/**
 * __useModuleQuery__
 *
 * To run a query within a React component, call `useModuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useModuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModuleQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useModuleQuery(baseOptions: Apollo.QueryHookOptions<ModuleQuery, ModuleQueryVariables> & ({ variables: ModuleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
      }
export function useModuleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export function useModuleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export type ModuleQueryHookResult = ReturnType<typeof useModuleQuery>;
export type ModuleLazyQueryHookResult = ReturnType<typeof useModuleLazyQuery>;
export type ModuleSuspenseQueryHookResult = ReturnType<typeof useModuleSuspenseQuery>;
export type ModuleQueryResult = Apollo.QueryResult<ModuleQuery, ModuleQueryVariables>;
export const UserNotificationsDocument = gql`
    query UserNotifications($maxItems: Int = 20) {
  notifications(pagination: {limit: $maxItems}) {
    data {
      id
      attributes {
        type
        read
        createdAt
        event {
          data {
            id
            attributes {
              name
              uuid
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUserNotificationsQuery__
 *
 * To run a query within a React component, call `useUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNotificationsQuery({
 *   variables: {
 *      maxItems: // value for 'maxItems'
 *   },
 * });
 */
export function useUserNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
      }
export function useUserNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
        }
export function useUserNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
        }
export type UserNotificationsQueryHookResult = ReturnType<typeof useUserNotificationsQuery>;
export type UserNotificationsLazyQueryHookResult = ReturnType<typeof useUserNotificationsLazyQuery>;
export type UserNotificationsSuspenseQueryHookResult = ReturnType<typeof useUserNotificationsSuspenseQuery>;
export type UserNotificationsQueryResult = Apollo.QueryResult<UserNotificationsQuery, UserNotificationsQueryVariables>;
export const ReadNotificationsDocument = gql`
    mutation readNotifications($id: ID) {
  readNotifications(id: $id) {
    data {
      id
      attributes {
        type
        read
      }
    }
  }
}
    `;
export type ReadNotificationsMutationFn = Apollo.MutationFunction<ReadNotificationsMutation, ReadNotificationsMutationVariables>;

/**
 * __useReadNotificationsMutation__
 *
 * To run a mutation, you first call `useReadNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationsMutation, { data, loading, error }] = useReadNotificationsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationsMutation, ReadNotificationsMutationVariables>(ReadNotificationsDocument, options);
      }
export type ReadNotificationsMutationHookResult = ReturnType<typeof useReadNotificationsMutation>;
export type ReadNotificationsMutationResult = Apollo.MutationResult<ReadNotificationsMutation>;
export type ReadNotificationsMutationOptions = Apollo.BaseMutationOptions<ReadNotificationsMutation, ReadNotificationsMutationVariables>;
export const CreatePassengerDocument = gql`
    mutation createPassenger($passenger: PassengerInput!) {
  createPassenger(data: $passenger) {
    data {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export type CreatePassengerMutationFn = Apollo.MutationFunction<CreatePassengerMutation, CreatePassengerMutationVariables>;

/**
 * __useCreatePassengerMutation__
 *
 * To run a mutation, you first call `useCreatePassengerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePassengerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPassengerMutation, { data, loading, error }] = useCreatePassengerMutation({
 *   variables: {
 *      passenger: // value for 'passenger'
 *   },
 * });
 */
export function useCreatePassengerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePassengerMutation, CreatePassengerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePassengerMutation, CreatePassengerMutationVariables>(CreatePassengerDocument, options);
      }
export type CreatePassengerMutationHookResult = ReturnType<typeof useCreatePassengerMutation>;
export type CreatePassengerMutationResult = Apollo.MutationResult<CreatePassengerMutation>;
export type CreatePassengerMutationOptions = Apollo.BaseMutationOptions<CreatePassengerMutation, CreatePassengerMutationVariables>;
export const UpdatePassengerDocument = gql`
    mutation updatePassenger($id: ID!, $passengerUpdate: PassengerInput!) {
  updatePassenger(id: $id, data: $passengerUpdate) {
    data {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export type UpdatePassengerMutationFn = Apollo.MutationFunction<UpdatePassengerMutation, UpdatePassengerMutationVariables>;

/**
 * __useUpdatePassengerMutation__
 *
 * To run a mutation, you first call `useUpdatePassengerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePassengerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePassengerMutation, { data, loading, error }] = useUpdatePassengerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      passengerUpdate: // value for 'passengerUpdate'
 *   },
 * });
 */
export function useUpdatePassengerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePassengerMutation, UpdatePassengerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePassengerMutation, UpdatePassengerMutationVariables>(UpdatePassengerDocument, options);
      }
export type UpdatePassengerMutationHookResult = ReturnType<typeof useUpdatePassengerMutation>;
export type UpdatePassengerMutationResult = Apollo.MutationResult<UpdatePassengerMutation>;
export type UpdatePassengerMutationOptions = Apollo.BaseMutationOptions<UpdatePassengerMutation, UpdatePassengerMutationVariables>;
export const DeletePassengerDocument = gql`
    mutation deletePassenger($id: ID!) {
  deletePassenger(id: $id) {
    data {
      id
    }
  }
}
    `;
export type DeletePassengerMutationFn = Apollo.MutationFunction<DeletePassengerMutation, DeletePassengerMutationVariables>;

/**
 * __useDeletePassengerMutation__
 *
 * To run a mutation, you first call `useDeletePassengerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePassengerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePassengerMutation, { data, loading, error }] = useDeletePassengerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePassengerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePassengerMutation, DeletePassengerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePassengerMutation, DeletePassengerMutationVariables>(DeletePassengerDocument, options);
      }
export type DeletePassengerMutationHookResult = ReturnType<typeof useDeletePassengerMutation>;
export type DeletePassengerMutationResult = Apollo.MutationResult<DeletePassengerMutation>;
export type DeletePassengerMutationOptions = Apollo.BaseMutationOptions<DeletePassengerMutation, DeletePassengerMutationVariables>;
export const SettingDocument = gql`
    query setting($locale: I18NLocaleCode!) {
  setting(locale: $locale) {
    data {
      id
      attributes {
        gtm_id
        about_link
        announcement
        matomo_script_url
        opencollective_link
        code_link
        stripe_dashboard_link
        tos_link
        data_policy_link
      }
    }
  }
}
    `;

/**
 * __useSettingQuery__
 *
 * To run a query within a React component, call `useSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useSettingQuery(baseOptions: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables> & ({ variables: SettingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
        }
export function useSettingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingSuspenseQueryHookResult = ReturnType<typeof useSettingSuspenseQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;
export const CreateTravelDocument = gql`
    mutation createTravel($travel: TravelInput!, $createVehicle: Boolean) {
  createTravel(data: $travel, createVehicle: $createVehicle) {
    data {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export type CreateTravelMutationFn = Apollo.MutationFunction<CreateTravelMutation, CreateTravelMutationVariables>;

/**
 * __useCreateTravelMutation__
 *
 * To run a mutation, you first call `useCreateTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTravelMutation, { data, loading, error }] = useCreateTravelMutation({
 *   variables: {
 *      travel: // value for 'travel'
 *      createVehicle: // value for 'createVehicle'
 *   },
 * });
 */
export function useCreateTravelMutation(baseOptions?: Apollo.MutationHookOptions<CreateTravelMutation, CreateTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTravelMutation, CreateTravelMutationVariables>(CreateTravelDocument, options);
      }
export type CreateTravelMutationHookResult = ReturnType<typeof useCreateTravelMutation>;
export type CreateTravelMutationResult = Apollo.MutationResult<CreateTravelMutation>;
export type CreateTravelMutationOptions = Apollo.BaseMutationOptions<CreateTravelMutation, CreateTravelMutationVariables>;
export const UpdateTravelDocument = gql`
    mutation updateTravel($id: ID!, $travelUpdate: TravelInput!) {
  updateTravel(id: $id, data: $travelUpdate) {
    data {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export type UpdateTravelMutationFn = Apollo.MutationFunction<UpdateTravelMutation, UpdateTravelMutationVariables>;

/**
 * __useUpdateTravelMutation__
 *
 * To run a mutation, you first call `useUpdateTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTravelMutation, { data, loading, error }] = useUpdateTravelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      travelUpdate: // value for 'travelUpdate'
 *   },
 * });
 */
export function useUpdateTravelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTravelMutation, UpdateTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTravelMutation, UpdateTravelMutationVariables>(UpdateTravelDocument, options);
      }
export type UpdateTravelMutationHookResult = ReturnType<typeof useUpdateTravelMutation>;
export type UpdateTravelMutationResult = Apollo.MutationResult<UpdateTravelMutation>;
export type UpdateTravelMutationOptions = Apollo.BaseMutationOptions<UpdateTravelMutation, UpdateTravelMutationVariables>;
export const DeleteTravelDocument = gql`
    mutation deleteTravel($id: ID!) {
  deleteTravel(id: $id) {
    data {
      id
    }
  }
}
    `;
export type DeleteTravelMutationFn = Apollo.MutationFunction<DeleteTravelMutation, DeleteTravelMutationVariables>;

/**
 * __useDeleteTravelMutation__
 *
 * To run a mutation, you first call `useDeleteTravelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTravelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTravelMutation, { data, loading, error }] = useDeleteTravelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTravelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTravelMutation, DeleteTravelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTravelMutation, DeleteTravelMutationVariables>(DeleteTravelDocument, options);
      }
export type DeleteTravelMutationHookResult = ReturnType<typeof useDeleteTravelMutation>;
export type DeleteTravelMutationResult = Apollo.MutationResult<DeleteTravelMutation>;
export type DeleteTravelMutationOptions = Apollo.BaseMutationOptions<DeleteTravelMutation, DeleteTravelMutationVariables>;
export const ProfileDocument = gql`
    query profile {
  me {
    id
    username
    profile {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($userUpdate: UsersPermissionsUserInput!) {
  updateMe(data: $userUpdate) {
    data {
      id
      attributes {
        ...UserFields
      }
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      userUpdate: // value for 'userUpdate'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const FindUserVehiclesDocument = gql`
    query findUserVehicles {
  me {
    id
    username
    profile {
      vehicles(pagination: {limit: 500}) {
        data {
          ...VehicleFields
        }
      }
    }
  }
}
    ${VehicleFieldsFragmentDoc}`;

/**
 * __useFindUserVehiclesQuery__
 *
 * To run a query within a React component, call `useFindUserVehiclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserVehiclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserVehiclesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>(FindUserVehiclesDocument, options);
      }
export function useFindUserVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>(FindUserVehiclesDocument, options);
        }
export function useFindUserVehiclesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>(FindUserVehiclesDocument, options);
        }
export type FindUserVehiclesQueryHookResult = ReturnType<typeof useFindUserVehiclesQuery>;
export type FindUserVehiclesLazyQueryHookResult = ReturnType<typeof useFindUserVehiclesLazyQuery>;
export type FindUserVehiclesSuspenseQueryHookResult = ReturnType<typeof useFindUserVehiclesSuspenseQuery>;
export type FindUserVehiclesQueryResult = Apollo.QueryResult<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>;
export const DeleteVehicleDocument = gql`
    mutation deleteVehicle($id: ID!) {
  deleteVehicle(id: $id) {
    data {
      id
      attributes {
        name
      }
    }
  }
}
    `;
export type DeleteVehicleMutationFn = Apollo.MutationFunction<DeleteVehicleMutation, DeleteVehicleMutationVariables>;

/**
 * __useDeleteVehicleMutation__
 *
 * To run a mutation, you first call `useDeleteVehicleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVehicleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVehicleMutation, { data, loading, error }] = useDeleteVehicleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVehicleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(DeleteVehicleDocument, options);
      }
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>;
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>;