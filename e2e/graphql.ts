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
  JSON: any;
  Long: any;
  Time: any;
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type ComponentPassengerPassenger = {
  __typename?: 'ComponentPassengerPassenger';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  user?: Maybe<UsersPermissionsUser>;
};

export type ComponentPassengerPassengerInput = {
  email?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  user?: InputMaybe<Scalars['ID']>;
};

export enum Enum_Page_Type {
  Tos = 'tos'
}

export enum Enum_Userspermissionsuser_Lang {
  En = 'EN',
  Fr = 'FR'
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  design?: Maybe<Scalars['JSON']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sourceCodeToTemplateId?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  updated_at: Scalars['DateTime'];
};

export type EmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sourceCodeToTemplateId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  newsletter?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['JSON']>;
  travels?: Maybe<Array<Maybe<Travel>>>;
  updated_at: Scalars['DateTime'];
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  uuid?: Maybe<Scalars['String']>;
  waitingPassengers?: Maybe<Array<Maybe<Passenger>>>;
};


export type EventTravelsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type EventUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type EventWaitingPassengersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type EventAggregator = {
  __typename?: 'EventAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  aggregate?: Maybe<EventAggregator>;
  groupBy?: Maybe<EventGroupBy>;
  values?: Maybe<Array<Maybe<Event>>>;
};

export type EventConnectionAddress = {
  __typename?: 'EventConnectionAddress';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['String']>;
};

export type EventConnectionCreated_At = {
  __typename?: 'EventConnectionCreated_at';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type EventConnectionDate = {
  __typename?: 'EventConnectionDate';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type EventConnectionDescription = {
  __typename?: 'EventConnectionDescription';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['String']>;
};

export type EventConnectionEmail = {
  __typename?: 'EventConnectionEmail';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['String']>;
};

export type EventConnectionId = {
  __typename?: 'EventConnectionId';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type EventConnectionName = {
  __typename?: 'EventConnectionName';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['String']>;
};

export type EventConnectionNewsletter = {
  __typename?: 'EventConnectionNewsletter';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type EventConnectionPosition = {
  __typename?: 'EventConnectionPosition';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type EventConnectionUpdated_At = {
  __typename?: 'EventConnectionUpdated_at';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type EventConnectionUuid = {
  __typename?: 'EventConnectionUuid';
  connection?: Maybe<EventConnection>;
  key?: Maybe<Scalars['String']>;
};

export type EventGroupBy = {
  __typename?: 'EventGroupBy';
  address?: Maybe<Array<Maybe<EventConnectionAddress>>>;
  created_at?: Maybe<Array<Maybe<EventConnectionCreated_At>>>;
  date?: Maybe<Array<Maybe<EventConnectionDate>>>;
  description?: Maybe<Array<Maybe<EventConnectionDescription>>>;
  email?: Maybe<Array<Maybe<EventConnectionEmail>>>;
  id?: Maybe<Array<Maybe<EventConnectionId>>>;
  name?: Maybe<Array<Maybe<EventConnectionName>>>;
  newsletter?: Maybe<Array<Maybe<EventConnectionNewsletter>>>;
  position?: Maybe<Array<Maybe<EventConnectionPosition>>>;
  updated_at?: Maybe<Array<Maybe<EventConnectionUpdated_At>>>;
  uuid?: Maybe<Array<Maybe<EventConnectionUuid>>>;
};

export type EventInput = {
  address?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  newsletter?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Scalars['JSON']>;
  travels?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  uuid?: InputMaybe<Scalars['String']>;
  waitingPassengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: InputMaybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: InputMaybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};

export type InputUuid = {
  uuid: Scalars['String'];
};

export type LocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Morph = ComponentPassengerPassenger | EmailDesignerEmailTemplate | Event | EventAggregator | EventConnection | EventConnectionAddress | EventConnectionCreated_At | EventConnectionDate | EventConnectionDescription | EventConnectionEmail | EventConnectionId | EventConnectionName | EventConnectionNewsletter | EventConnectionPosition | EventConnectionUpdated_At | EventConnectionUuid | EventGroupBy | I18NLocale | Page | PageAggregator | PageConnection | PageConnectionContent | PageConnectionCreated_At | PageConnectionId | PageConnectionName | PageConnectionType | PageConnectionUpdated_At | PageGroupBy | Passenger | PassengerAggregator | PassengerConnection | PassengerConnectionCreated_At | PassengerConnectionEmail | PassengerConnectionEvent | PassengerConnectionId | PassengerConnectionLocation | PassengerConnectionName | PassengerConnectionTravel | PassengerConnectionUpdated_At | PassengerConnectionUser | PassengerGroupBy | Settings | Travel | TravelAggregator | TravelAggregatorAvg | TravelAggregatorMax | TravelAggregatorMin | TravelAggregatorSum | TravelConnection | TravelConnectionCreated_At | TravelConnectionDeparture | TravelConnectionDetails | TravelConnectionEvent | TravelConnectionId | TravelConnectionMeeting | TravelConnectionPhone_Number | TravelConnectionSeats | TravelConnectionUpdated_At | TravelConnectionVehicleName | TravelGroupBy | UploadFile | UploadFileAggregator | UploadFileAggregatorAvg | UploadFileAggregatorMax | UploadFileAggregatorMin | UploadFileAggregatorSum | UploadFileConnection | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionCreated_At | UploadFileConnectionExt | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionHeight | UploadFileConnectionId | UploadFileConnectionMime | UploadFileConnectionName | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | UploadFileConnectionSize | UploadFileConnectionUpdated_At | UploadFileConnectionUrl | UploadFileConnectionWidth | UploadFileGroupBy | UserPermissionsPasswordPayload | UsersPermissionsLoginPayload | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleAggregator | UsersPermissionsRoleConnection | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionType | UsersPermissionsRoleGroupBy | UsersPermissionsUser | UsersPermissionsUserAggregator | UsersPermissionsUserConnection | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionFirstName | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionLang | UsersPermissionsUserConnectionLastName | UsersPermissionsUserConnectionOnboardingCreator | UsersPermissionsUserConnectionOnboardingUser | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserGroupBy | Vehicle | VehicleAggregator | VehicleAggregatorAvg | VehicleAggregatorMax | VehicleAggregatorMin | VehicleAggregatorSum | VehicleConnection | VehicleConnectionCreated_At | VehicleConnectionId | VehicleConnectionName | VehicleConnectionPhone_Number | VehicleConnectionSeats | VehicleConnectionUpdated_At | VehicleConnectionUser | VehicleGroupBy | CreateEventPayload | CreatePagePayload | CreatePassengerPayload | CreateRolePayload | CreateTravelPayload | CreateUserPayload | CreateVehiclePayload | DeleteEventPayload | DeleteFilePayload | DeletePagePayload | DeletePassengerPayload | DeleteRolePayload | DeleteSettingPayload | DeleteTravelPayload | DeleteUserPayload | DeleteVehiclePayload | UpdateEventPayload | UpdatePagePayload | UpdatePassengerPayload | UpdateRolePayload | UpdateSettingPayload | UpdateTravelPayload | UpdateUserPayload | UpdateVehiclePayload;

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<CreateEventPayload>;
  createPage?: Maybe<CreatePagePayload>;
  createPassenger?: Maybe<CreatePassengerPayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createSettingLocalization: Settings;
  createTravel?: Maybe<CreateTravelPayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  createVehicle?: Maybe<CreateVehiclePayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deletePage?: Maybe<DeletePagePayload>;
  deletePassenger?: Maybe<DeletePassengerPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteSetting?: Maybe<DeleteSettingPayload>;
  deleteTravel?: Maybe<DeleteTravelPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteVehicle?: Maybe<DeleteVehiclePayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updateEventByUUID?: Maybe<UpdateEventPayload>;
  updateFileInfo: UploadFile;
  updateMe: UpdateUserPayload;
  updatePage?: Maybe<UpdatePagePayload>;
  updatePassenger?: Maybe<UpdatePassengerPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateSetting?: Maybe<UpdateSettingPayload>;
  updateTravel?: Maybe<UpdateTravelPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  updateVehicle?: Maybe<UpdateVehiclePayload>;
  upload: UploadFile;
};


export type MutationCreateEventArgs = {
  input?: InputMaybe<CreateEventInput>;
};


export type MutationCreatePageArgs = {
  input?: InputMaybe<CreatePageInput>;
};


export type MutationCreatePassengerArgs = {
  input?: InputMaybe<CreatePassengerInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};


export type MutationCreateSettingLocalizationArgs = {
  input: UpdateSettingInput;
};


export type MutationCreateTravelArgs = {
  input?: InputMaybe<CreateTravelInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationCreateVehicleArgs = {
  input?: InputMaybe<CreateVehicleInput>;
};


export type MutationDeleteEventArgs = {
  input?: InputMaybe<DeleteEventInput>;
};


export type MutationDeleteFileArgs = {
  input?: InputMaybe<DeleteFileInput>;
};


export type MutationDeletePageArgs = {
  input?: InputMaybe<DeletePageInput>;
};


export type MutationDeletePassengerArgs = {
  input?: InputMaybe<DeletePassengerInput>;
};


export type MutationDeleteRoleArgs = {
  input?: InputMaybe<DeleteRoleInput>;
};


export type MutationDeleteSettingArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteTravelArgs = {
  input?: InputMaybe<DeleteTravelInput>;
};


export type MutationDeleteUserArgs = {
  input?: InputMaybe<DeleteUserInput>;
};


export type MutationDeleteVehicleArgs = {
  input?: InputMaybe<DeleteVehicleInput>;
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
  source?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  input?: InputMaybe<UpdateEventInput>;
};


export type MutationUpdateEventByUuidArgs = {
  input?: InputMaybe<UpdateEventByUuidInput>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationUpdateMeArgs = {
  input?: InputMaybe<EditUserInput>;
};


export type MutationUpdatePageArgs = {
  input?: InputMaybe<UpdatePageInput>;
};


export type MutationUpdatePassengerArgs = {
  input?: InputMaybe<UpdatePassengerInput>;
};


export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRoleInput>;
};


export type MutationUpdateSettingArgs = {
  input?: InputMaybe<UpdateSettingInput>;
  locale?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTravelArgs = {
  input?: InputMaybe<UpdateTravelInput>;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateVehicleArgs = {
  input?: InputMaybe<UpdateVehicleInput>;
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Enum_Page_Type>;
  updated_at: Scalars['DateTime'];
};

export type PageAggregator = {
  __typename?: 'PageAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate?: Maybe<PageAggregator>;
  groupBy?: Maybe<PageGroupBy>;
  values?: Maybe<Array<Maybe<Page>>>;
};

export type PageConnectionContent = {
  __typename?: 'PageConnectionContent';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionCreated_At = {
  __typename?: 'PageConnectionCreated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageConnectionId = {
  __typename?: 'PageConnectionId';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionName = {
  __typename?: 'PageConnectionName';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionType = {
  __typename?: 'PageConnectionType';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionUpdated_At = {
  __typename?: 'PageConnectionUpdated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageGroupBy = {
  __typename?: 'PageGroupBy';
  content?: Maybe<Array<Maybe<PageConnectionContent>>>;
  created_at?: Maybe<Array<Maybe<PageConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<PageConnectionId>>>;
  name?: Maybe<Array<Maybe<PageConnectionName>>>;
  type?: Maybe<Array<Maybe<PageConnectionType>>>;
  updated_at?: Maybe<Array<Maybe<PageConnectionUpdated_At>>>;
};

export type PageInput = {
  content?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  type?: InputMaybe<Enum_Page_Type>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Passenger = {
  __typename?: 'Passenger';
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  travel?: Maybe<Travel>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<UsersPermissionsUser>;
};

export type PassengerAggregator = {
  __typename?: 'PassengerAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PassengerConnection = {
  __typename?: 'PassengerConnection';
  aggregate?: Maybe<PassengerAggregator>;
  groupBy?: Maybe<PassengerGroupBy>;
  values?: Maybe<Array<Maybe<Passenger>>>;
};

export type PassengerConnectionCreated_At = {
  __typename?: 'PassengerConnectionCreated_at';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PassengerConnectionEmail = {
  __typename?: 'PassengerConnectionEmail';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PassengerConnectionEvent = {
  __typename?: 'PassengerConnectionEvent';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PassengerConnectionId = {
  __typename?: 'PassengerConnectionId';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PassengerConnectionLocation = {
  __typename?: 'PassengerConnectionLocation';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PassengerConnectionName = {
  __typename?: 'PassengerConnectionName';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PassengerConnectionTravel = {
  __typename?: 'PassengerConnectionTravel';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PassengerConnectionUpdated_At = {
  __typename?: 'PassengerConnectionUpdated_at';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PassengerConnectionUser = {
  __typename?: 'PassengerConnectionUser';
  connection?: Maybe<PassengerConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PassengerGroupBy = {
  __typename?: 'PassengerGroupBy';
  created_at?: Maybe<Array<Maybe<PassengerConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<PassengerConnectionEmail>>>;
  event?: Maybe<Array<Maybe<PassengerConnectionEvent>>>;
  id?: Maybe<Array<Maybe<PassengerConnectionId>>>;
  location?: Maybe<Array<Maybe<PassengerConnectionLocation>>>;
  name?: Maybe<Array<Maybe<PassengerConnectionName>>>;
  travel?: Maybe<Array<Maybe<PassengerConnectionTravel>>>;
  updated_at?: Maybe<Array<Maybe<PassengerConnectionUpdated_At>>>;
  user?: Maybe<Array<Maybe<PassengerConnectionUser>>>;
};

export type PassengerInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  travel?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventByUUID?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsConnection?: Maybe<EventConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  passenger?: Maybe<Passenger>;
  passengers?: Maybe<Array<Maybe<Passenger>>>;
  passengersConnection?: Maybe<PassengerConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  setting?: Maybe<Settings>;
  travel?: Maybe<Travel>;
  travels?: Maybe<Array<Maybe<Travel>>>;
  travelsConnection?: Maybe<TravelConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  vehicle?: Maybe<Vehicle>;
  vehicles?: Maybe<Array<Maybe<Vehicle>>>;
  vehiclesConnection?: Maybe<VehicleConnection>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String'];
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryEventsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryFilesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryFilesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryPageArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryPagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryPagesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryPassengerArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryPassengersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryPassengersConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryRolesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryRolesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QuerySettingArgs = {
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryTravelArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryTravelsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryTravelsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryUsersConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryVehicleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryVehiclesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryVehiclesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type SettingInput = {
  about_link?: InputMaybe<Scalars['String']>;
  announcement?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  faq_link?: InputMaybe<Scalars['String']>;
  gtm_id?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Settings = {
  __typename?: 'Settings';
  about_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  faq_link?: Maybe<Scalars['String']>;
  gtm_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Settings>>>;
  updated_at: Scalars['DateTime'];
};


export type SettingsLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type Travel = {
  __typename?: 'Travel';
  created_at: Scalars['DateTime'];
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  meeting?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Maybe<Passenger>>>;
  phone_number?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  vehicleName?: Maybe<Scalars['String']>;
};


export type TravelPassengersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type TravelAggregator = {
  __typename?: 'TravelAggregator';
  avg?: Maybe<TravelAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TravelAggregatorMax>;
  min?: Maybe<TravelAggregatorMin>;
  sum?: Maybe<TravelAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TravelAggregatorAvg = {
  __typename?: 'TravelAggregatorAvg';
  seats?: Maybe<Scalars['Float']>;
};

export type TravelAggregatorMax = {
  __typename?: 'TravelAggregatorMax';
  seats?: Maybe<Scalars['Float']>;
};

export type TravelAggregatorMin = {
  __typename?: 'TravelAggregatorMin';
  seats?: Maybe<Scalars['Float']>;
};

export type TravelAggregatorSum = {
  __typename?: 'TravelAggregatorSum';
  seats?: Maybe<Scalars['Float']>;
};

export type TravelConnection = {
  __typename?: 'TravelConnection';
  aggregate?: Maybe<TravelAggregator>;
  groupBy?: Maybe<TravelGroupBy>;
  values?: Maybe<Array<Maybe<Travel>>>;
};

export type TravelConnectionCreated_At = {
  __typename?: 'TravelConnectionCreated_at';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TravelConnectionDeparture = {
  __typename?: 'TravelConnectionDeparture';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TravelConnectionDetails = {
  __typename?: 'TravelConnectionDetails';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['String']>;
};

export type TravelConnectionEvent = {
  __typename?: 'TravelConnectionEvent';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type TravelConnectionId = {
  __typename?: 'TravelConnectionId';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type TravelConnectionMeeting = {
  __typename?: 'TravelConnectionMeeting';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['String']>;
};

export type TravelConnectionPhone_Number = {
  __typename?: 'TravelConnectionPhone_number';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['String']>;
};

export type TravelConnectionSeats = {
  __typename?: 'TravelConnectionSeats';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type TravelConnectionUpdated_At = {
  __typename?: 'TravelConnectionUpdated_at';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TravelConnectionVehicleName = {
  __typename?: 'TravelConnectionVehicleName';
  connection?: Maybe<TravelConnection>;
  key?: Maybe<Scalars['String']>;
};

export type TravelGroupBy = {
  __typename?: 'TravelGroupBy';
  created_at?: Maybe<Array<Maybe<TravelConnectionCreated_At>>>;
  departure?: Maybe<Array<Maybe<TravelConnectionDeparture>>>;
  details?: Maybe<Array<Maybe<TravelConnectionDetails>>>;
  event?: Maybe<Array<Maybe<TravelConnectionEvent>>>;
  id?: Maybe<Array<Maybe<TravelConnectionId>>>;
  meeting?: Maybe<Array<Maybe<TravelConnectionMeeting>>>;
  phone_number?: Maybe<Array<Maybe<TravelConnectionPhone_Number>>>;
  seats?: Maybe<Array<Maybe<TravelConnectionSeats>>>;
  updated_at?: Maybe<Array<Maybe<TravelConnectionUpdated_At>>>;
  vehicleName?: Maybe<Array<Maybe<TravelConnectionVehicleName>>>;
};

export type TravelInput = {
  createVehicle?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  departure?: InputMaybe<Scalars['DateTime']>;
  details?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  meeting?: InputMaybe<Scalars['String']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};


export type UploadFileRelatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  firstName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Enum_Userspermissionsuser_Lang>;
  lastName?: InputMaybe<Scalars['String']>;
  onboardingCreator?: InputMaybe<Scalars['Boolean']>;
  onboardingUser?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username: Scalars['String'];
  vehicles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: InputMaybe<Scalars['String']>;
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
  email: Scalars['String'];
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

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  events?: Maybe<Array<Maybe<Event>>>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  lastName?: Maybe<Scalars['String']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  passengers?: Maybe<Array<Maybe<Passenger>>>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  vehicles?: Maybe<Array<Maybe<Vehicle>>>;
};


export type UsersPermissionsUserEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type UsersPermissionsUserPassengersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type UsersPermissionsUserVehiclesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionFirstName = {
  __typename?: 'UsersPermissionsUserConnectionFirstName';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionLang = {
  __typename?: 'UsersPermissionsUserConnectionLang';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionLastName = {
  __typename?: 'UsersPermissionsUserConnectionLastName';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionOnboardingCreator = {
  __typename?: 'UsersPermissionsUserConnectionOnboardingCreator';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionOnboardingUser = {
  __typename?: 'UsersPermissionsUserConnectionOnboardingUser';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  firstName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstName>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  lang?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLang>>>;
  lastName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastName>>>;
  onboardingCreator?: Maybe<Array<Maybe<UsersPermissionsUserConnectionOnboardingCreator>>>;
  onboardingUser?: Maybe<Array<Maybe<UsersPermissionsUserConnectionOnboardingUser>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phone_number?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<UsersPermissionsUser>;
};

export type VehicleAggregator = {
  __typename?: 'VehicleAggregator';
  avg?: Maybe<VehicleAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<VehicleAggregatorMax>;
  min?: Maybe<VehicleAggregatorMin>;
  sum?: Maybe<VehicleAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type VehicleAggregatorAvg = {
  __typename?: 'VehicleAggregatorAvg';
  seats?: Maybe<Scalars['Float']>;
};

export type VehicleAggregatorMax = {
  __typename?: 'VehicleAggregatorMax';
  seats?: Maybe<Scalars['Float']>;
};

export type VehicleAggregatorMin = {
  __typename?: 'VehicleAggregatorMin';
  seats?: Maybe<Scalars['Float']>;
};

export type VehicleAggregatorSum = {
  __typename?: 'VehicleAggregatorSum';
  seats?: Maybe<Scalars['Float']>;
};

export type VehicleConnection = {
  __typename?: 'VehicleConnection';
  aggregate?: Maybe<VehicleAggregator>;
  groupBy?: Maybe<VehicleGroupBy>;
  values?: Maybe<Array<Maybe<Vehicle>>>;
};

export type VehicleConnectionCreated_At = {
  __typename?: 'VehicleConnectionCreated_at';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type VehicleConnectionId = {
  __typename?: 'VehicleConnectionId';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VehicleConnectionName = {
  __typename?: 'VehicleConnectionName';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type VehicleConnectionPhone_Number = {
  __typename?: 'VehicleConnectionPhone_number';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type VehicleConnectionSeats = {
  __typename?: 'VehicleConnectionSeats';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type VehicleConnectionUpdated_At = {
  __typename?: 'VehicleConnectionUpdated_at';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type VehicleConnectionUser = {
  __typename?: 'VehicleConnectionUser';
  connection?: Maybe<VehicleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VehicleGroupBy = {
  __typename?: 'VehicleGroupBy';
  created_at?: Maybe<Array<Maybe<VehicleConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<VehicleConnectionId>>>;
  name?: Maybe<Array<Maybe<VehicleConnectionName>>>;
  phone_number?: Maybe<Array<Maybe<VehicleConnectionPhone_Number>>>;
  seats?: Maybe<Array<Maybe<VehicleConnectionSeats>>>;
  updated_at?: Maybe<Array<Maybe<VehicleConnectionUpdated_At>>>;
  user?: Maybe<Array<Maybe<VehicleConnectionUser>>>;
};

export type VehicleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type CreateEventInput = {
  data?: InputMaybe<EventInput>;
};

export type CreateEventPayload = {
  __typename?: 'createEventPayload';
  event?: Maybe<Event>;
};

export type CreatePageInput = {
  data?: InputMaybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: 'createPagePayload';
  page?: Maybe<Page>;
};

export type CreatePassengerInput = {
  data?: InputMaybe<PassengerInput>;
};

export type CreatePassengerPayload = {
  __typename?: 'createPassengerPayload';
  passenger?: Maybe<Passenger>;
};

export type CreateRoleInput = {
  data?: InputMaybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateTravelInput = {
  data?: InputMaybe<TravelInput>;
};

export type CreateTravelPayload = {
  __typename?: 'createTravelPayload';
  travel?: Maybe<Travel>;
};

export type CreateUserInput = {
  data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type CreateVehicleInput = {
  data?: InputMaybe<VehicleInput>;
};

export type CreateVehiclePayload = {
  __typename?: 'createVehiclePayload';
  vehicle?: Maybe<Vehicle>;
};

export type DeleteEventInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteEventPayload = {
  __typename?: 'deleteEventPayload';
  event?: Maybe<Event>;
};

export type DeleteFileInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeletePageInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: 'deletePagePayload';
  page?: Maybe<Page>;
};

export type DeletePassengerInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePassengerPayload = {
  __typename?: 'deletePassengerPayload';
  passenger?: Maybe<Passenger>;
};

export type DeleteRoleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteSettingPayload = {
  __typename?: 'deleteSettingPayload';
  setting?: Maybe<Settings>;
};

export type DeleteTravelInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteTravelPayload = {
  __typename?: 'deleteTravelPayload';
  travel?: Maybe<Travel>;
};

export type DeleteUserInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteVehicleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteVehiclePayload = {
  __typename?: 'deleteVehiclePayload';
  vehicle?: Maybe<Vehicle>;
};

export type EditComponentPassengerPassengerInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type EditEmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sourceCodeToTemplateId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditEventInput = {
  address?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Scalars['JSON']>;
  travels?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  uuid?: InputMaybe<Scalars['String']>;
  waitingPassengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size?: InputMaybe<Scalars['Float']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type EditLocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditPageInput = {
  content?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Page_Type>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditPassengerInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  travel?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditSettingInput = {
  about_link?: InputMaybe<Scalars['String']>;
  announcement?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  faq_link?: InputMaybe<Scalars['String']>;
  gtm_id?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditTravelInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  departure?: InputMaybe<Scalars['DateTime']>;
  details?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  meeting?: InputMaybe<Scalars['String']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type EditUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  events?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  firstName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Enum_Userspermissionsuser_Lang>;
  lastName?: InputMaybe<Scalars['String']>;
  old_password?: InputMaybe<Scalars['String']>;
  onboardingCreator?: InputMaybe<Scalars['Boolean']>;
  onboardingUser?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
  vehicles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditVehicleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type UpdateEventByUuidInput = {
  data?: InputMaybe<EditEventInput>;
  where?: InputMaybe<InputUuid>;
};

export type UpdateEventInput = {
  data?: InputMaybe<EditEventInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateEventPayload = {
  __typename?: 'updateEventPayload';
  event?: Maybe<Event>;
};

export type UpdatePageInput = {
  data?: InputMaybe<EditPageInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePagePayload = {
  __typename?: 'updatePagePayload';
  page?: Maybe<Page>;
};

export type UpdatePassengerInput = {
  data?: InputMaybe<EditPassengerInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePassengerPayload = {
  __typename?: 'updatePassengerPayload';
  passenger?: Maybe<Passenger>;
};

export type UpdateRoleInput = {
  data?: InputMaybe<EditRoleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateSettingInput = {
  data?: InputMaybe<EditSettingInput>;
};

export type UpdateSettingPayload = {
  __typename?: 'updateSettingPayload';
  setting?: Maybe<Settings>;
};

export type UpdateTravelInput = {
  data?: InputMaybe<EditTravelInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateTravelPayload = {
  __typename?: 'updateTravelPayload';
  travel?: Maybe<Travel>;
};

export type UpdateUserInput = {
  data?: InputMaybe<EditUserInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type UpdateVehicleInput = {
  data?: InputMaybe<EditVehicleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateVehiclePayload = {
  __typename?: 'updateVehiclePayload';
  vehicle?: Maybe<Vehicle>;
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
    fragment EventFields on Event {
  id
  uuid
  name
  description
  email
  date
  address
  position
  waitingPassengers {
    id
    name
    email
    location
    user {
      id
      firstName
      lastName
    }
  }
  travels {
    id
    meeting
    departure
    details
    vehicleName
    phone_number
    seats
    passengers {
      id
      name
      location
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export const PassengerFieldsFragmentDoc = gql`
    fragment PassengerFields on Passenger {
  id
  name
  location
  email
  user {
    id
    firstName
    lastName
  }
}
    `;
export const TravelFieldsFragmentDoc = gql`
    fragment TravelFields on Travel {
  id
  meeting
  departure
  details
  vehicleName
  phone_number
  seats
  passengers {
    id
    name
    location
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on UsersPermissionsUser {
  id
  username
  email
  confirmed
  lastName
  firstName
  lang
  onboardingUser
  onboardingCreator
  events {
    id
    uuid
    name
    date
    address
  }
}
    `;
export const VehicleFieldsFragmentDoc = gql`
    fragment VehicleFields on Vehicle {
  id
  name
  seats
  phone_number
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
export const LoginDocument = gql`
    mutation login($identifier: String!, $password: String!) {
  login(input: {identifier: $identifier, password: $password}) {
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
    mutation createEvent($name: String!, $email: String!, $date: Date, $address: String, $description: String, $newsletter: Boolean) {
  createEvent(
    input: {data: {name: $name, email: $email, date: $date, address: $address, description: $description, newsletter: $newsletter}}
  ) {
    event {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
export const UpdateEventDocument = gql`
    mutation updateEvent($uuid: String!, $eventUpdate: editEventInput) {
  updateEventByUUID(input: {where: {uuid: $uuid}, data: $eventUpdate}) {
    event {
      ...EventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;
export const EventByUuidDocument = gql`
    query eventByUUID($uuid: String!) {
  eventByUUID(uuid: $uuid) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export const CreatePassengerDocument = gql`
    mutation createPassenger($passenger: PassengerInput) {
  createPassenger(input: {data: $passenger}) {
    passenger {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export const UpdatePassengerDocument = gql`
    mutation updatePassenger($id: ID!, $passengerUpdate: editPassengerInput!) {
  updatePassenger(input: {where: {id: $id}, data: $passengerUpdate}) {
    passenger {
      ...PassengerFields
    }
  }
}
    ${PassengerFieldsFragmentDoc}`;
export const DeletePassengerDocument = gql`
    mutation deletePassenger($id: ID!) {
  deletePassenger(input: {where: {id: $id}}) {
    passenger {
      id
    }
  }
}
    `;
export const SettingDocument = gql`
    query setting($locale: String!) {
  setting(locale: $locale) {
    id
    gtm_id
    about_link
    announcement
    faq_link
  }
}
    `;
export const CreateTravelDocument = gql`
    mutation createTravel($travel: TravelInput!) {
  createTravel(input: {data: $travel}) {
    travel {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export const UpdateTravelDocument = gql`
    mutation updateTravel($id: ID!, $travelUpdate: editTravelInput!) {
  updateTravel(input: {where: {id: $id}, data: $travelUpdate}) {
    travel {
      ...TravelFields
    }
  }
}
    ${TravelFieldsFragmentDoc}`;
export const DeleteTravelDocument = gql`
    mutation deleteTravel($id: ID!) {
  deleteTravel(input: {where: {id: $id}}) {
    travel {
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
    mutation updateMe($userUpdate: editUserInput!) {
  updateMe(input: $userUpdate) {
    user {
      ...UserFields
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
      vehicles {
        ...VehicleFields
      }
    }
  }
}
    ${VehicleFieldsFragmentDoc}`;
export const DeleteVehicleDocument = gql`
    mutation deleteVehicle($id: ID!) {
  deleteVehicle(input: {where: {id: $id}}) {
    vehicle {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register', 'mutation');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
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
    eventByUUID(variables: EventByUuidQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventByUuidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventByUuidQuery>(EventByUuidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'eventByUUID', 'query');
    },
    createPassenger(variables?: CreatePassengerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePassengerMutation> {
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
export type MeFieldsFragment = { __typename?: 'UsersPermissionsMe', id: string, username: string, email: string, confirmed?: boolean | null };

export type RegisterMutationVariables = Exact<{
  user: UsersPermissionsRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email: string, confirmed?: boolean | null } } };

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email: string, confirmed?: boolean | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UserPermissionsPasswordPayload', ok: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email: string, confirmed?: boolean | null } } | null };

export type EventFieldsFragment = { __typename?: 'Event', id: string, uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, position?: any | null, waitingPassengers?: Array<{ __typename?: 'Passenger', id: string, name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null, travels?: Array<{ __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null> | null };

export type CreateEventMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  date?: InputMaybe<Scalars['Date']>;
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'createEventPayload', event?: { __typename?: 'Event', id: string, uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, position?: any | null, waitingPassengers?: Array<{ __typename?: 'Passenger', id: string, name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null, travels?: Array<{ __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null> | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String'];
  eventUpdate?: InputMaybe<EditEventInput>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEventByUUID?: { __typename?: 'updateEventPayload', event?: { __typename?: 'Event', id: string, uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, position?: any | null, waitingPassengers?: Array<{ __typename?: 'Passenger', id: string, name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null, travels?: Array<{ __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null> | null } | null } | null };

export type EventByUuidQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EventByUuidQuery = { __typename?: 'Query', eventByUUID?: { __typename?: 'Event', id: string, uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, position?: any | null, waitingPassengers?: Array<{ __typename?: 'Passenger', id: string, name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null, travels?: Array<{ __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null> | null } | null };

export type PassengerFieldsFragment = { __typename?: 'Passenger', id: string, name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null };

export type CreatePassengerMutationVariables = Exact<{
  passenger?: InputMaybe<PassengerInput>;
}>;


export type CreatePassengerMutation = { __typename?: 'Mutation', createPassenger?: { __typename?: 'createPassengerPayload', passenger?: { __typename?: 'Passenger', id: string, name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null } | null };

export type UpdatePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
  passengerUpdate: EditPassengerInput;
}>;


export type UpdatePassengerMutation = { __typename?: 'Mutation', updatePassenger?: { __typename?: 'updatePassengerPayload', passenger?: { __typename?: 'Passenger', id: string, name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null } | null };

export type DeletePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePassengerMutation = { __typename?: 'Mutation', deletePassenger?: { __typename?: 'deletePassengerPayload', passenger?: { __typename?: 'Passenger', id: string } | null } | null };

export type SettingQueryVariables = Exact<{
  locale: Scalars['String'];
}>;


export type SettingQuery = { __typename?: 'Query', setting?: { __typename?: 'Settings', id: string, gtm_id?: string | null, about_link?: string | null, announcement?: string | null, faq_link?: string | null } | null };

export type TravelFieldsFragment = { __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null };

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
}>;


export type CreateTravelMutation = { __typename?: 'Mutation', createTravel?: { __typename?: 'createTravelPayload', travel?: { __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null } | null };

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID'];
  travelUpdate: EditTravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel?: { __typename?: 'updateTravelPayload', travel?: { __typename?: 'Travel', id: string, meeting?: string | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: Array<{ __typename?: 'Passenger', id: string, name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUser', id: string, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null } | null };

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTravelMutation = { __typename?: 'Mutation', deleteTravel?: { __typename?: 'deleteTravelPayload', travel?: { __typename?: 'Travel', id: string } | null } | null };

export type UserFieldsFragment = { __typename?: 'UsersPermissionsUser', id: string, username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, events?: Array<{ __typename?: 'Event', id: string, uuid?: string | null, name: string, date?: any | null, address?: string | null } | null> | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', id: string, username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, events?: Array<{ __typename?: 'Event', id: string, uuid?: string | null, name: string, date?: any | null, address?: string | null } | null> | null } | null } | null };

export type UpdateMeMutationVariables = Exact<{
  userUpdate: EditUserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'updateUserPayload', user?: { __typename?: 'UsersPermissionsUser', id: string, username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, events?: Array<{ __typename?: 'Event', id: string, uuid?: string | null, name: string, date?: any | null, address?: string | null } | null> | null } | null } };

export type VehicleFieldsFragment = { __typename?: 'Vehicle', id: string, name: string, seats?: number | null, phone_number?: string | null };

export type FindUserVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVehiclesQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', vehicles?: Array<{ __typename?: 'Vehicle', id: string, name: string, seats?: number | null, phone_number?: string | null } | null> | null } | null } | null };

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteVehicleMutation = { __typename?: 'Mutation', deleteVehicle?: { __typename?: 'deleteVehiclePayload', vehicle?: { __typename?: 'Vehicle', id: string, name: string } | null } | null };
