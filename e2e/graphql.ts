import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  I18NLocaleCode: any;
  JSON: any;
  Upload: any;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  nei?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  contains?: InputMaybe<Scalars['Date']>;
  containsi?: InputMaybe<Scalars['Date']>;
  endsWith?: InputMaybe<Scalars['Date']>;
  eq?: InputMaybe<Scalars['Date']>;
  eqi?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nei?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']>;
  notContainsi?: InputMaybe<Scalars['Date']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  startsWith?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  nei?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
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
  address?: Maybe<Scalars['String']>;
  administrators?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  enabled_modules?: Maybe<Scalars['JSON']>;
  lang?: Maybe<Enum_Event_Lang>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  passengers?: Maybe<PassengerRelationResponseCollection>;
  travels?: Maybe<TravelRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
  waitingPassengers?: Maybe<PassengerRelationResponseCollection>;
};


export type EventPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventTravelsArgs = {
  filters?: InputMaybe<TravelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars['ID']>;
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
  address?: InputMaybe<Scalars['String']>;
  administrators?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  enabled_modules?: InputMaybe<Scalars['JSON']>;
  lang?: InputMaybe<Enum_Event_Lang>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  travels?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  nei?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Event | I18NLocale | Module | Notification | Page | Passenger | Setting | Travel | TripAlert | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Vehicle;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
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
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  nei?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  nei?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  nei?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Module = {
  __typename?: 'Module';
  caroster_plus_description?: Maybe<Scalars['String']>;
  caroster_plus_enabled?: Maybe<Scalars['Boolean']>;
  caroster_plus_name: Scalars['String'];
  caroster_plus_payment_link: Scalars['String'];
  caroster_plus_price?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ModuleRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ModuleEntity = {
  __typename?: 'ModuleEntity';
  attributes?: Maybe<Module>;
  id?: Maybe<Scalars['ID']>;
};

export type ModuleEntityResponse = {
  __typename?: 'ModuleEntityResponse';
  data?: Maybe<ModuleEntity>;
};

export type ModuleInput = {
  caroster_plus_description?: InputMaybe<Scalars['String']>;
  caroster_plus_enabled?: InputMaybe<Scalars['Boolean']>;
  caroster_plus_name?: InputMaybe<Scalars['String']>;
  caroster_plus_payment_link?: InputMaybe<Scalars['String']>;
  caroster_plus_payment_link_id?: InputMaybe<Scalars['String']>;
  caroster_plus_price?: InputMaybe<Scalars['Float']>;
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
  email: Scalars['String'];
  eventId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateModuleLocalizationArgs = {
  data?: InputMaybe<ModuleInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
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
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateTravelArgs = {
  createVehicle?: InputMaybe<Scalars['Boolean']>;
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
  id: Scalars['ID'];
};


export type MutationDeleteEventAdminArgs = {
  email: Scalars['String'];
  eventId: Scalars['ID'];
};


export type MutationDeleteModuleArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePassengerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSettingArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteTravelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTripAlertArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteVehicleArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationReadNotificationsArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationSetTripAlertArgs = {
  address?: InputMaybe<Scalars['String']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  event: Scalars['ID'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  radius?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID'];
};


export type MutationUpdateEventByUuidArgs = {
  data: EventInput;
  uuid: Scalars['String'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateMeArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationUpdateModuleArgs = {
  data: ModuleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationInput;
  id: Scalars['ID'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
};


export type MutationUpdatePassengerArgs = {
  data: PassengerInput;
  id: Scalars['ID'];
};


export type MutationUpdateSettingArgs = {
  data: SettingInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateTravelArgs = {
  data: TravelInput;
  id: Scalars['ID'];
};


export type MutationUpdateTripAlertArgs = {
  data: TripAlertInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateVehicleArgs = {
  data: VehicleInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTime']>;
  event?: Maybe<EventEntityResponse>;
  payload?: Maybe<Scalars['JSON']>;
  read?: Maybe<Scalars['Boolean']>;
  type: Enum_Notification_Type;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  attributes?: Maybe<Notification>;
  id?: Maybe<Scalars['ID']>;
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
  event?: InputMaybe<Scalars['ID']>;
  payload?: InputMaybe<Scalars['JSON']>;
  read?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Enum_Notification_Type>;
  user?: InputMaybe<Scalars['ID']>;
};

export type NotificationRelationResponseCollection = {
  __typename?: 'NotificationRelationResponseCollection';
  data: Array<NotificationEntity>;
};

export type Page = {
  __typename?: 'Page';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  type?: Maybe<Enum_Page_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']>;
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
  content?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Page_Type>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Passenger = {
  __typename?: 'Passenger';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  event?: Maybe<EventEntityResponse>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  phoneCountry?: Maybe<Scalars['String']>;
  travel?: Maybe<TravelEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type PassengerEntity = {
  __typename?: 'PassengerEntity';
  attributes?: Maybe<Passenger>;
  id?: Maybe<Scalars['ID']>;
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
  email?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  phoneCountry?: InputMaybe<Scalars['String']>;
  travel?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
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
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String'];
};


export type QueryEventTripAlertArgs = {
  event: Scalars['ID'];
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryModuleArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryNotificationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPassengerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySettingArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryTravelArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTravelsArgs = {
  filters?: InputMaybe<TravelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTripAlertArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTripAlertsArgs = {
  filters?: InputMaybe<TripAlertFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryVehicleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryVehiclesArgs = {
  filters?: InputMaybe<VehicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Setting = {
  __typename?: 'Setting';
  about_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  code_link?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data_policy_link?: Maybe<Scalars['String']>;
  gtm_id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SettingRelationResponseCollection>;
  matomo_script_url?: Maybe<Scalars['String']>;
  opencollective_link?: Maybe<Scalars['String']>;
  stripe_dashboard_link?: Maybe<Scalars['String']>;
  tos_link?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SettingEntity = {
  __typename?: 'SettingEntity';
  attributes?: Maybe<Setting>;
  id?: Maybe<Scalars['ID']>;
};

export type SettingEntityResponse = {
  __typename?: 'SettingEntityResponse';
  data?: Maybe<SettingEntity>;
};

export type SettingInput = {
  about_link?: InputMaybe<Scalars['String']>;
  announcement?: InputMaybe<Scalars['String']>;
  code_link?: InputMaybe<Scalars['String']>;
  data_policy_link?: InputMaybe<Scalars['String']>;
  gtm_id?: InputMaybe<Scalars['String']>;
  matomo_script_url?: InputMaybe<Scalars['String']>;
  opencollective_link?: InputMaybe<Scalars['String']>;
  stripe_dashboard_link?: InputMaybe<Scalars['String']>;
  tos_link?: InputMaybe<Scalars['String']>;
};

export type SettingRelationResponseCollection = {
  __typename?: 'SettingRelationResponseCollection';
  data: Array<SettingEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nei?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Travel = {
  __typename?: 'Travel';
  createdAt?: Maybe<Scalars['DateTime']>;
  departureDate?: Maybe<Scalars['Date']>;
  departureTime?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<EventEntityResponse>;
  meeting?: Maybe<Scalars['String']>;
  meeting_latitude?: Maybe<Scalars['Float']>;
  meeting_longitude?: Maybe<Scalars['Float']>;
  passengers?: Maybe<PassengerRelationResponseCollection>;
  phoneCountry?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
  vehicleName?: Maybe<Scalars['String']>;
};


export type TravelPassengersArgs = {
  filters?: InputMaybe<PassengerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TravelEntity = {
  __typename?: 'TravelEntity';
  attributes?: Maybe<Travel>;
  id?: Maybe<Scalars['ID']>;
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
  departureDate?: InputMaybe<Scalars['Date']>;
  departureTime?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  meeting?: InputMaybe<Scalars['String']>;
  meeting_latitude?: InputMaybe<Scalars['Float']>;
  meeting_longitude?: InputMaybe<Scalars['Float']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phoneCountry?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['ID']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type TravelRelationResponseCollection = {
  __typename?: 'TravelRelationResponseCollection';
  data: Array<TravelEntity>;
};

export type TripAlert = {
  __typename?: 'TripAlert';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  enabled?: Maybe<Scalars['Boolean']>;
  event?: Maybe<EventEntityResponse>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type TripAlertEntity = {
  __typename?: 'TripAlertEntity';
  attributes?: Maybe<TripAlert>;
  id?: Maybe<Scalars['ID']>;
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
  address?: InputMaybe<Scalars['String']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  event?: InputMaybe<Scalars['ID']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  radius?: InputMaybe<Scalars['Float']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
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
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
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
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profile?: Maybe<UsersPermissionsUser>;
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
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
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  newsletterConsent?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  tosAcceptationDate?: InputMaybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
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
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  events?: Maybe<EventRelationResponseCollection>;
  firstName?: Maybe<Scalars['String']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  lastName?: Maybe<Scalars['String']>;
  newsletterConsent?: Maybe<Scalars['Boolean']>;
  notificationEnabled?: Maybe<Scalars['Boolean']>;
  notifications?: Maybe<NotificationRelationResponseCollection>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  tosAcceptationDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  vehicles?: Maybe<VehicleRelationResponseCollection>;
};


export type UsersPermissionsUserEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsUserNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsUserVehiclesArgs = {
  filters?: InputMaybe<VehicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
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
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  firstName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Enum_Userspermissionsuser_Lang>;
  lastName?: InputMaybe<Scalars['String']>;
  newsletterConsent?: InputMaybe<Scalars['Boolean']>;
  notificationEnabled?: InputMaybe<Scalars['Boolean']>;
  notifications?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  oldPassword?: InputMaybe<Scalars['String']>;
  onboardingCreator?: InputMaybe<Scalars['Boolean']>;
  onboardingUser?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  tosAcceptationDate?: InputMaybe<Scalars['DateTime']>;
  username?: InputMaybe<Scalars['String']>;
  vehicles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  phoneCountry?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type VehicleEntity = {
  __typename?: 'VehicleEntity';
  attributes?: Maybe<Vehicle>;
  id?: Maybe<Scalars['ID']>;
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
  name?: InputMaybe<Scalars['String']>;
  phoneCountry?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type VehicleRelationResponseCollection = {
  __typename?: 'VehicleRelationResponseCollection';
  data: Array<VehicleEntity>;
};

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
export const LoginDocument = gql`
    mutation login($identifier: String!, $password: String!) {
  login(input: {identifier: $identifier, password: $password}) {
    jwt
    user {
      id
      username
      email
      confirmed
    }
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
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
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
export const CreateEventDocument = gql`
    mutation createEvent($eventData: EventInput!) {
  createEvent(data: $eventData) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
export const UpdateEventDocument = gql`
    mutation updateEvent($uuid: String!, $eventUpdate: EventInput!) {
  updateEventByUUID(uuid: $uuid, data: $eventUpdate) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
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
export const EventByUuidDocument = gql`
    query eventByUUID($uuid: String!) {
  eventByUUID(uuid: $uuid) {
    data {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
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
export const UserNotificationsDocument = gql`
    query UserNotifications($maxItems: Int = 20) {
  notifications(pagination: {limit: $maxItems}, sort: "createdAt:DESC") {
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
export const CreatePassengerDocument = gql`
    mutation createPassenger($passenger: PassengerInput!) {
  createPassenger(data: $passenger) {
    data {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export const UpdatePassengerDocument = gql`
    mutation updatePassenger($id: ID!, $passengerUpdate: PassengerInput!) {
  updatePassenger(id: $id, data: $passengerUpdate) {
    data {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export const DeletePassengerDocument = gql`
    mutation deletePassenger($id: ID!) {
  deletePassenger(id: $id) {
    data {
      id
    }
  }
}
    `;
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
export const CreateTravelDocument = gql`
    mutation createTravel($travel: TravelInput!, $createVehicle: Boolean) {
  createTravel(data: $travel, createVehicle: $createVehicle) {
    data {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export const UpdateTravelDocument = gql`
    mutation updateTravel($id: ID!, $travelUpdate: TravelInput!) {
  updateTravel(id: $id, data: $travelUpdate) {
    data {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export const DeleteTravelDocument = gql`
    mutation deleteTravel($id: ID!) {
  deleteTravel(id: $id) {
    data {
      id
    }
  }
}
    `;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    TripAlert(variables: TripAlertQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TripAlertQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TripAlertQuery>(TripAlertDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TripAlert', 'query');
    },
    SetTripAlert(variables: SetTripAlertMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetTripAlertMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetTripAlertMutation>(SetTripAlertDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetTripAlert', 'mutation');
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register', 'mutation');
    },
    forgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ForgotPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ForgotPasswordMutation>(ForgotPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'forgotPassword', 'mutation');
    },
    resetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPassword', 'mutation');
    },
    createEvent(variables: CreateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>(CreateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEvent', 'mutation');
    },
    updateEvent(variables: UpdateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>(UpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateEvent', 'mutation');
    },
    addEventAdmin(variables: AddEventAdminMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddEventAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddEventAdminMutation>(AddEventAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addEventAdmin', 'mutation');
    },
    deleteEventAdmin(variables: DeleteEventAdminMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventAdminMutation>(DeleteEventAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteEventAdmin', 'mutation');
    },
    eventByUUID(variables: EventByUuidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventByUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventByUuidQuery>(EventByUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'eventByUUID', 'query');
    },
    module(variables: ModuleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ModuleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ModuleQuery>(ModuleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'module', 'query');
    },
    UserNotifications(variables?: UserNotificationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserNotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserNotificationsQuery>(UserNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserNotifications', 'query');
    },
    readNotifications(variables?: ReadNotificationsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReadNotificationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReadNotificationsMutation>(ReadNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'readNotifications', 'mutation');
    },
    createPassenger(variables: CreatePassengerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePassengerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePassengerMutation>(CreatePassengerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPassenger', 'mutation');
    },
    updatePassenger(variables: UpdatePassengerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePassengerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePassengerMutation>(UpdatePassengerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePassenger', 'mutation');
    },
    deletePassenger(variables: DeletePassengerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePassengerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePassengerMutation>(DeletePassengerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePassenger', 'mutation');
    },
    setting(variables: SettingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SettingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SettingQuery>(SettingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setting', 'query');
    },
    createTravel(variables: CreateTravelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTravelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTravelMutation>(CreateTravelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTravel', 'mutation');
    },
    updateTravel(variables: UpdateTravelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTravelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTravelMutation>(UpdateTravelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTravel', 'mutation');
    },
    deleteTravel(variables: DeleteTravelMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTravelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTravelMutation>(DeleteTravelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTravel', 'mutation');
    },
    profile(variables?: ProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileQuery>(ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profile', 'query');
    },
    updateMe(variables: UpdateMeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMeMutation>(UpdateMeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateMe', 'mutation');
    },
    findUserVehicles(variables?: FindUserVehiclesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindUserVehiclesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindUserVehiclesQuery>(FindUserVehiclesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findUserVehicles', 'query');
    },
    deleteVehicle(variables: DeleteVehicleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteVehicleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteVehicleMutation>(DeleteVehicleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteVehicle', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } };

export type TripAlertQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type TripAlertQuery = { __typename?: 'Query', eventTripAlert?: { __typename?: 'TripAlertEntityResponse', data?: { __typename?: 'TripAlertEntity', id?: string | null, attributes?: { __typename?: 'TripAlert', address?: string | null, enabled?: boolean | null, radius?: number | null, longitude?: number | null, latitude?: number | null } | null } | null } | null };

export type SetTripAlertMutationVariables = Exact<{
  eventId: Scalars['ID'];
  enabled?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  address?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['Float']>;
}>;


export type SetTripAlertMutation = { __typename?: 'Mutation', setTripAlert?: { __typename?: 'TripAlertEntityResponse', data?: { __typename?: 'TripAlertEntity', id?: string | null, attributes?: { __typename?: 'TripAlert', latitude?: number | null, longitude?: number | null, address?: string | null, enabled?: boolean | null } | null } | null } | null };

export type MeFieldsFragment = { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null };

export type RegisterMutationVariables = Exact<{
  user: UsersPermissionsRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UsersPermissionsPasswordPayload', ok: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } | null };

export type EventFieldsFragment = { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null };

export type CreateEventMutationVariables = Exact<{
  eventData: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String'];
  eventUpdate: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type AddEventAdminMutationVariables = Exact<{
  eventId: Scalars['ID'];
  email: Scalars['String'];
}>;


export type AddEventAdminMutation = { __typename?: 'Mutation', addEventAdmin?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', administrators?: Array<string | null> | null } | null } | null } | null };

export type DeleteEventAdminMutationVariables = Exact<{
  eventId: Scalars['ID'];
  email: Scalars['String'];
}>;


export type DeleteEventAdminMutation = { __typename?: 'Mutation', deleteEventAdmin?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', administrators?: Array<string | null> | null } | null } | null } | null };

export type EventByUuidQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EventByUuidQuery = { __typename?: 'Query', eventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, enabled_modules?: any | null, email: string, lang?: Enum_Event_Lang | null, administrators?: Array<string | null> | null, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type ModuleQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type ModuleQuery = { __typename?: 'Query', module?: { __typename?: 'ModuleEntityResponse', data?: { __typename?: 'ModuleEntity', attributes?: { __typename?: 'Module', caroster_plus_name: string, caroster_plus_price?: number | null, caroster_plus_enabled?: boolean | null, caroster_plus_description?: string | null, caroster_plus_payment_link: string } | null } | null } | null };

export type UserNotificationsQueryVariables = Exact<{
  maxItems?: InputMaybe<Scalars['Int']>;
}>;


export type UserNotificationsQuery = { __typename?: 'Query', notifications?: { __typename?: 'NotificationEntityResponseCollection', data: Array<{ __typename?: 'NotificationEntity', id?: string | null, attributes?: { __typename?: 'Notification', type: Enum_Notification_Type, read?: boolean | null, createdAt?: any | null, event?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', name: string, uuid?: string | null } | null } | null } | null } | null }> } | null };

export type ReadNotificationsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ReadNotificationsMutation = { __typename?: 'Mutation', readNotifications?: { __typename?: 'NotificationEntityResponseCollection', data: Array<{ __typename?: 'NotificationEntity', id?: string | null, attributes?: { __typename?: 'Notification', type: Enum_Notification_Type, read?: boolean | null } | null }> } | null };

export type PassengerFieldsFragment = { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null };

export type CreatePassengerMutationVariables = Exact<{
  passenger: PassengerInput;
}>;


export type CreatePassengerMutation = { __typename?: 'Mutation', createPassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null } | null } | null };

export type UpdatePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
  passengerUpdate: PassengerInput;
}>;


export type UpdatePassengerMutation = { __typename?: 'Mutation', updatePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null } | null } | null };

export type DeletePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePassengerMutation = { __typename?: 'Mutation', deletePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null } | null } | null };

export type SettingQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type SettingQuery = { __typename?: 'Query', setting?: { __typename?: 'SettingEntityResponse', data?: { __typename?: 'SettingEntity', id?: string | null, attributes?: { __typename?: 'Setting', gtm_id?: string | null, about_link?: string | null, announcement?: string | null, matomo_script_url?: string | null, opencollective_link?: string | null, code_link?: string | null, stripe_dashboard_link?: string | null, tos_link?: string | null, data_policy_link?: string | null } | null } | null } | null };

export type TravelFieldsFragment = { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null };

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
  createVehicle?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateTravelMutation = { __typename?: 'Mutation', createTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID'];
  travelUpdate: TravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departureDate?: any | null, departureTime?: string | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, phoneCountry?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, phone?: string | null, phoneCountry?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null, email: string } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['ID'];
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
  id: Scalars['ID'];
}>;


export type DeleteVehicleMutation = { __typename?: 'Mutation', deleteVehicle?: { __typename?: 'VehicleEntityResponse', data?: { __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string } | null } | null } | null };
