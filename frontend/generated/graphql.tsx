import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type ComponentPassengerPassenger = {
  __typename?: 'ComponentPassengerPassenger';
  id: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  user?: Maybe<UsersPermissionsUser>;
};

export type ComponentPassengerPassengerInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};



export type Dependency = {
  __typename?: 'Dependency';
  name: Scalars['String'];
  version: Scalars['String'];
};

export enum Enum_Page_Type {
  Tos = 'tos'
}

export enum Enum_Userspermissionsuser_Lang {
  Fr = 'FR',
  En = 'EN'
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  sourceCodeToTemplateId?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
};

export type EmailTemplateInput = {
  sourceCodeToTemplateId?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['JSON']>;
  uuid?: Maybe<Scalars['String']>;
  waitingList?: Maybe<Array<Maybe<ComponentPassengerPassenger>>>;
  description?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  travels?: Maybe<Array<Maybe<Travel>>>;
};


export type EventUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type EventTravelsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type EventAggregator = {
  __typename?: 'EventAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  values?: Maybe<Array<Maybe<Event>>>;
  groupBy?: Maybe<EventGroupBy>;
  aggregate?: Maybe<EventAggregator>;
};

export type EventConnectionAddress = {
  __typename?: 'EventConnectionAddress';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionCreated_At = {
  __typename?: 'EventConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionDate = {
  __typename?: 'EventConnectionDate';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionDescription = {
  __typename?: 'EventConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionEmail = {
  __typename?: 'EventConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionId = {
  __typename?: 'EventConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionName = {
  __typename?: 'EventConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPosition = {
  __typename?: 'EventConnectionPosition';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionUpdated_At = {
  __typename?: 'EventConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionUuid = {
  __typename?: 'EventConnectionUuid';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventGroupBy = {
  __typename?: 'EventGroupBy';
  id?: Maybe<Array<Maybe<EventConnectionId>>>;
  created_at?: Maybe<Array<Maybe<EventConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<EventConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<EventConnectionName>>>;
  email?: Maybe<Array<Maybe<EventConnectionEmail>>>;
  date?: Maybe<Array<Maybe<EventConnectionDate>>>;
  address?: Maybe<Array<Maybe<EventConnectionAddress>>>;
  position?: Maybe<Array<Maybe<EventConnectionPosition>>>;
  uuid?: Maybe<Array<Maybe<EventConnectionUuid>>>;
  description?: Maybe<Array<Maybe<EventConnectionDescription>>>;
};

export type EventInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['JSON']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  uuid?: Maybe<Scalars['String']>;
  waitingList?: Maybe<Array<Maybe<ComponentPassengerPassengerInput>>>;
  travels?: Maybe<Array<Maybe<Scalars['ID']>>>;
  description?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  newsletter?: Maybe<Scalars['Boolean']>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Info = {
  __typename?: 'Info';
  appVersion?: Maybe<Scalars['String']>;
  host: Scalars['String'];
  environment: Scalars['String'];
  uuid: Scalars['String'];
  launchedAt: Scalars['String'];
  cron?: Maybe<Scalars['Boolean']>;
  installedPlugins?: Maybe<Array<Maybe<Scalars['String']>>>;
  installedMiddlewares?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  npmVersion: Scalars['String'];
  description: Scalars['String'];
  strapiVersion: Scalars['String'];
  license: Scalars['String'];
  dependencies?: Maybe<Array<Maybe<Dependency>>>;
};

export type InputId = {
  id: Scalars['ID'];
};

export type InputUuid = {
  uuid: Scalars['String'];
};



export type Morph = Dependency | Info | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | Event | EventConnection | EventAggregator | EventGroupBy | EventConnectionId | EventConnectionCreated_At | EventConnectionUpdated_At | EventConnectionName | EventConnectionEmail | EventConnectionDate | EventConnectionAddress | EventConnectionPosition | EventConnectionUuid | EventConnectionDescription | CreateEventPayload | UpdateEventPayload | DeleteEventPayload | Page | PageConnection | PageAggregator | PageGroupBy | PageConnectionId | PageConnectionCreated_At | PageConnectionUpdated_At | PageConnectionName | PageConnectionContent | PageConnectionType | CreatePagePayload | UpdatePagePayload | DeletePagePayload | Settings | UpdateSettingPayload | DeleteSettingPayload | Travel | TravelConnection | TravelAggregator | TravelAggregatorSum | TravelAggregatorAvg | TravelAggregatorMin | TravelAggregatorMax | TravelGroupBy | TravelConnectionId | TravelConnectionCreated_At | TravelConnectionUpdated_At | TravelConnectionMeeting | TravelConnectionDeparture | TravelConnectionDetails | TravelConnectionEvent | TravelConnectionVehicleName | TravelConnectionSeats | TravelConnectionPhone_Number | CreateTravelPayload | UpdateTravelPayload | DeleteTravelPayload | Vehicle | VehicleConnection | VehicleAggregator | VehicleAggregatorSum | VehicleAggregatorAvg | VehicleAggregatorMin | VehicleAggregatorMax | VehicleGroupBy | VehicleConnectionId | VehicleConnectionCreated_At | VehicleConnectionUpdated_At | VehicleConnectionName | VehicleConnectionSeats | VehicleConnectionPhone_Number | VehicleConnectionUser | CreateVehiclePayload | UpdateVehiclePayload | DeleteVehiclePayload | EmailDesignerEmailTemplate | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionFirstName | UsersPermissionsUserConnectionLastName | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionOnboardingUser | UsersPermissionsUserConnectionOnboardingCreator | UsersPermissionsUserConnectionLang | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentPassengerPassenger;

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<CreateEventPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  createPage?: Maybe<CreatePagePayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  deletePage?: Maybe<DeletePagePayload>;
  updateSetting?: Maybe<UpdateSettingPayload>;
  deleteSetting?: Maybe<DeleteSettingPayload>;
  createTravel?: Maybe<CreateTravelPayload>;
  updateTravel?: Maybe<UpdateTravelPayload>;
  deleteTravel?: Maybe<DeleteTravelPayload>;
  createVehicle?: Maybe<CreateVehiclePayload>;
  updateVehicle?: Maybe<UpdateVehiclePayload>;
  deleteVehicle?: Maybe<DeleteVehiclePayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  updateMe: UpdateUserPayload;
  updateEventByUUID?: Maybe<UpdateEventPayload>;
};


export type MutationCreateEventArgs = {
  input?: Maybe<CreateEventInput>;
};


export type MutationUpdateEventArgs = {
  input?: Maybe<UpdateEventInput>;
};


export type MutationDeleteEventArgs = {
  input?: Maybe<DeleteEventInput>;
};


export type MutationCreatePageArgs = {
  input?: Maybe<CreatePageInput>;
};


export type MutationUpdatePageArgs = {
  input?: Maybe<UpdatePageInput>;
};


export type MutationDeletePageArgs = {
  input?: Maybe<DeletePageInput>;
};


export type MutationUpdateSettingArgs = {
  input?: Maybe<UpdateSettingInput>;
};


export type MutationCreateTravelArgs = {
  input?: Maybe<CreateTravelInput>;
};


export type MutationUpdateTravelArgs = {
  input?: Maybe<UpdateTravelInput>;
};


export type MutationDeleteTravelArgs = {
  input?: Maybe<DeleteTravelInput>;
};


export type MutationCreateVehicleArgs = {
  input?: Maybe<CreateVehicleInput>;
};


export type MutationUpdateVehicleArgs = {
  input?: Maybe<UpdateVehicleInput>;
};


export type MutationDeleteVehicleArgs = {
  input?: Maybe<DeleteVehicleInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationUpdateMeArgs = {
  input?: Maybe<EditUserInput>;
};


export type MutationUpdateEventByUuidArgs = {
  input?: Maybe<UpdateEventByUuidInput>;
};

export type Page = {
  __typename?: 'Page';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Page_Type>;
};

export type PageAggregator = {
  __typename?: 'PageAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageConnection = {
  __typename?: 'PageConnection';
  values?: Maybe<Array<Maybe<Page>>>;
  groupBy?: Maybe<PageGroupBy>;
  aggregate?: Maybe<PageAggregator>;
};

export type PageConnectionContent = {
  __typename?: 'PageConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PageConnection>;
};

export type PageConnectionCreated_At = {
  __typename?: 'PageConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PageConnection>;
};

export type PageConnectionId = {
  __typename?: 'PageConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PageConnection>;
};

export type PageConnectionName = {
  __typename?: 'PageConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PageConnection>;
};

export type PageConnectionType = {
  __typename?: 'PageConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PageConnection>;
};

export type PageConnectionUpdated_At = {
  __typename?: 'PageConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PageConnection>;
};

export type PageGroupBy = {
  __typename?: 'PageGroupBy';
  id?: Maybe<Array<Maybe<PageConnectionId>>>;
  created_at?: Maybe<Array<Maybe<PageConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<PageConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<PageConnectionName>>>;
  content?: Maybe<Array<Maybe<PageConnectionContent>>>;
  type?: Maybe<Array<Maybe<PageConnectionType>>>;
};

export type PageInput = {
  name: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Page_Type>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsConnection?: Maybe<EventConnection>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  setting?: Maybe<Settings>;
  travel?: Maybe<Travel>;
  travels?: Maybe<Array<Maybe<Travel>>>;
  travelsConnection?: Maybe<TravelConnection>;
  vehicle?: Maybe<Vehicle>;
  vehicles?: Maybe<Array<Maybe<Vehicle>>>;
  vehiclesConnection?: Maybe<VehicleConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  strapiInfo: Info;
  me?: Maybe<UsersPermissionsMe>;
  eventByUUID?: Maybe<Event>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryEventsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryEventsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPageArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryPagesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QuerySettingArgs = {
  publicationState?: Maybe<PublicationState>;
};


export type QueryTravelArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryTravelsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryTravelsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryVehicleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryVehiclesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryVehiclesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String'];
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type SettingInput = {
  gtm_id?: Maybe<Scalars['String']>;
  about_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  gtm_id?: Maybe<Scalars['String']>;
  about_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
};


export type Travel = {
  __typename?: 'Travel';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Maybe<ComponentPassengerPassenger>>>;
  event?: Maybe<Event>;
  vehicleName?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type TravelAggregator = {
  __typename?: 'TravelAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<TravelAggregatorSum>;
  avg?: Maybe<TravelAggregatorAvg>;
  min?: Maybe<TravelAggregatorMin>;
  max?: Maybe<TravelAggregatorMax>;
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
  values?: Maybe<Array<Maybe<Travel>>>;
  groupBy?: Maybe<TravelGroupBy>;
  aggregate?: Maybe<TravelAggregator>;
};

export type TravelConnectionCreated_At = {
  __typename?: 'TravelConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionDeparture = {
  __typename?: 'TravelConnectionDeparture';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionDetails = {
  __typename?: 'TravelConnectionDetails';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionEvent = {
  __typename?: 'TravelConnectionEvent';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionId = {
  __typename?: 'TravelConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionMeeting = {
  __typename?: 'TravelConnectionMeeting';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionPhone_Number = {
  __typename?: 'TravelConnectionPhone_number';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionSeats = {
  __typename?: 'TravelConnectionSeats';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionUpdated_At = {
  __typename?: 'TravelConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelConnectionVehicleName = {
  __typename?: 'TravelConnectionVehicleName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<TravelConnection>;
};

export type TravelGroupBy = {
  __typename?: 'TravelGroupBy';
  id?: Maybe<Array<Maybe<TravelConnectionId>>>;
  created_at?: Maybe<Array<Maybe<TravelConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<TravelConnectionUpdated_At>>>;
  meeting?: Maybe<Array<Maybe<TravelConnectionMeeting>>>;
  departure?: Maybe<Array<Maybe<TravelConnectionDeparture>>>;
  details?: Maybe<Array<Maybe<TravelConnectionDetails>>>;
  event?: Maybe<Array<Maybe<TravelConnectionEvent>>>;
  vehicleName?: Maybe<Array<Maybe<TravelConnectionVehicleName>>>;
  seats?: Maybe<Array<Maybe<TravelConnectionSeats>>>;
  phone_number?: Maybe<Array<Maybe<TravelConnectionPhone_Number>>>;
};

export type TravelInput = {
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Maybe<ComponentPassengerPassengerInput>>>;
  event?: Maybe<Scalars['ID']>;
  vehicleName?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  createVehicle?: Maybe<Scalars['Boolean']>;
};


export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
};

export type UserInput = {
  username: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  confirmationToken?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  vehicles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
  profile?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  id: Scalars['ID'];
  type: Scalars['String'];
  controller: Scalars['String'];
  action: Scalars['String'];
  enabled: Scalars['Boolean'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRole>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  events?: Maybe<Array<Maybe<Event>>>;
  vehicles?: Maybe<Array<Maybe<Vehicle>>>;
};


export type UsersPermissionsUserEventsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsUserVehiclesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionFirstName = {
  __typename?: 'UsersPermissionsUserConnectionFirstName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionLang = {
  __typename?: 'UsersPermissionsUserConnectionLang';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionLastName = {
  __typename?: 'UsersPermissionsUserConnectionLastName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionOnboardingCreator = {
  __typename?: 'UsersPermissionsUserConnectionOnboardingCreator';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionOnboardingUser = {
  __typename?: 'UsersPermissionsUserConnectionOnboardingUser';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  firstName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstName>>>;
  lastName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastName>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  onboardingUser?: Maybe<Array<Maybe<UsersPermissionsUserConnectionOnboardingUser>>>;
  onboardingCreator?: Maybe<Array<Maybe<UsersPermissionsUserConnectionOnboardingCreator>>>;
  lang?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLang>>>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  user?: Maybe<UsersPermissionsUser>;
};

export type VehicleAggregator = {
  __typename?: 'VehicleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<VehicleAggregatorSum>;
  avg?: Maybe<VehicleAggregatorAvg>;
  min?: Maybe<VehicleAggregatorMin>;
  max?: Maybe<VehicleAggregatorMax>;
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
  values?: Maybe<Array<Maybe<Vehicle>>>;
  groupBy?: Maybe<VehicleGroupBy>;
  aggregate?: Maybe<VehicleAggregator>;
};

export type VehicleConnectionCreated_At = {
  __typename?: 'VehicleConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionId = {
  __typename?: 'VehicleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionName = {
  __typename?: 'VehicleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionPhone_Number = {
  __typename?: 'VehicleConnectionPhone_number';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionSeats = {
  __typename?: 'VehicleConnectionSeats';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionUpdated_At = {
  __typename?: 'VehicleConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleConnectionUser = {
  __typename?: 'VehicleConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<VehicleConnection>;
};

export type VehicleGroupBy = {
  __typename?: 'VehicleGroupBy';
  id?: Maybe<Array<Maybe<VehicleConnectionId>>>;
  created_at?: Maybe<Array<Maybe<VehicleConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<VehicleConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<VehicleConnectionName>>>;
  seats?: Maybe<Array<Maybe<VehicleConnectionSeats>>>;
  phone_number?: Maybe<Array<Maybe<VehicleConnectionPhone_Number>>>;
  user?: Maybe<Array<Maybe<VehicleConnectionUser>>>;
};

export type VehicleInput = {
  name: Scalars['String'];
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateEventInput = {
  data?: Maybe<EventInput>;
};

export type CreateEventPayload = {
  __typename?: 'createEventPayload';
  event?: Maybe<Event>;
};

export type CreatePageInput = {
  data?: Maybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: 'createPagePayload';
  page?: Maybe<Page>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateTravelInput = {
  data?: Maybe<TravelInput>;
};

export type CreateTravelPayload = {
  __typename?: 'createTravelPayload';
  travel?: Maybe<Travel>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type CreateVehicleInput = {
  data?: Maybe<VehicleInput>;
};

export type CreateVehiclePayload = {
  __typename?: 'createVehiclePayload';
  vehicle?: Maybe<Vehicle>;
};

export type DeleteEventInput = {
  where?: Maybe<InputId>;
};

export type DeleteEventPayload = {
  __typename?: 'deleteEventPayload';
  event?: Maybe<Event>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeletePageInput = {
  where?: Maybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: 'deletePagePayload';
  page?: Maybe<Page>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
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
  where?: Maybe<InputId>;
};

export type DeleteTravelPayload = {
  __typename?: 'deleteTravelPayload';
  travel?: Maybe<Travel>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteVehicleInput = {
  where?: Maybe<InputId>;
};

export type DeleteVehiclePayload = {
  __typename?: 'deleteVehiclePayload';
  vehicle?: Maybe<Vehicle>;
};

export type EditComponentPassengerPassengerInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};

export type EditEmailTemplateInput = {
  sourceCodeToTemplateId?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditEventInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['JSON']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  uuid?: Maybe<Scalars['String']>;
  waitingList?: Maybe<Array<Maybe<EditComponentPassengerPassengerInput>>>;
  travels?: Maybe<Array<Maybe<Scalars['ID']>>>;
  description?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPageInput = {
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Page_Type>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditSettingInput = {
  gtm_id?: Maybe<Scalars['String']>;
  about_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditTravelInput = {
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Maybe<EditComponentPassengerPassengerInput>>>;
  event?: Maybe<Scalars['ID']>;
  vehicleName?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  confirmationToken?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  vehicles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  old_password?: Maybe<Scalars['String']>;
};

export type EditVehicleInput = {
  name?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateEventByUuidInput = {
  where?: Maybe<InputUuid>;
  data?: Maybe<EditEventInput>;
};

export type UpdateEventInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditEventInput>;
};

export type UpdateEventPayload = {
  __typename?: 'updateEventPayload';
  event?: Maybe<Event>;
};

export type UpdatePageInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPageInput>;
};

export type UpdatePagePayload = {
  __typename?: 'updatePagePayload';
  page?: Maybe<Page>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateSettingInput = {
  data?: Maybe<EditSettingInput>;
};

export type UpdateSettingPayload = {
  __typename?: 'updateSettingPayload';
  setting?: Maybe<Settings>;
};

export type UpdateTravelInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditTravelInput>;
};

export type UpdateTravelPayload = {
  __typename?: 'updateTravelPayload';
  travel?: Maybe<Travel>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type UpdateVehicleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditVehicleInput>;
};

export type UpdateVehiclePayload = {
  __typename?: 'updateVehiclePayload';
  vehicle?: Maybe<Vehicle>;
};

export type MeFieldsFragment = (
  { __typename?: 'UsersPermissionsMe' }
  & Pick<UsersPermissionsMe, 'id' | 'username' | 'email' | 'confirmed'>
);

export type RegisterMutationVariables = Exact<{
  user: UsersPermissionsRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UsersPermissionsLoginPayload' }
    & Pick<UsersPermissionsLoginPayload, 'jwt'>
    & { user: (
      { __typename?: 'UsersPermissionsMe' }
      & MeFieldsFragment
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UsersPermissionsLoginPayload' }
    & Pick<UsersPermissionsLoginPayload, 'jwt'>
    & { user: (
      { __typename?: 'UsersPermissionsMe' }
      & MeFieldsFragment
    ) }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'UserPermissionsPasswordPayload' }
    & Pick<UserPermissionsPasswordPayload, 'ok'>
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'UsersPermissionsLoginPayload' }
    & Pick<UsersPermissionsLoginPayload, 'jwt'>
    & { user: (
      { __typename?: 'UsersPermissionsMe' }
      & MeFieldsFragment
    ) }
  )> }
);

export type EventFieldsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'uuid' | 'name' | 'description' | 'email' | 'date' | 'address' | 'position'>
  & { waitingList?: Maybe<Array<Maybe<(
    { __typename?: 'ComponentPassengerPassenger' }
    & Pick<ComponentPassengerPassenger, 'id' | 'name' | 'location'>
    & { user?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & Pick<UsersPermissionsUser, 'id' | 'firstName' | 'lastName'>
    )> }
  )>>>, travels?: Maybe<Array<Maybe<(
    { __typename?: 'Travel' }
    & Pick<Travel, 'id' | 'meeting' | 'departure' | 'details' | 'vehicleName' | 'phone_number' | 'seats'>
    & { passengers?: Maybe<Array<Maybe<(
      { __typename?: 'ComponentPassengerPassenger' }
      & Pick<ComponentPassengerPassenger, 'id' | 'name' | 'location'>
      & { user?: Maybe<(
        { __typename?: 'UsersPermissionsUser' }
        & Pick<UsersPermissionsUser, 'id' | 'firstName' | 'lastName'>
      )> }
    )>>> }
  )>>> }
);

export type CreateEventMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  newsletter?: Maybe<Scalars['Boolean']>;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent?: Maybe<(
    { __typename?: 'createEventPayload' }
    & { event?: Maybe<(
      { __typename?: 'Event' }
      & EventFieldsFragment
    )> }
  )> }
);

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String'];
  eventUpdate?: Maybe<EditEventInput>;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEventByUUID?: Maybe<(
    { __typename?: 'updateEventPayload' }
    & { event?: Maybe<(
      { __typename?: 'Event' }
      & EventFieldsFragment
    )> }
  )> }
);

export type EventByUuidQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EventByUuidQuery = (
  { __typename?: 'Query' }
  & { eventByUUID?: Maybe<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type SettingQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQuery = (
  { __typename?: 'Query' }
  & { setting?: Maybe<(
    { __typename?: 'Settings' }
    & Pick<Settings, 'id' | 'gtm_id' | 'about_link' | 'announcement'>
  )> }
);

export type TravelFieldsFragment = (
  { __typename?: 'Travel' }
  & Pick<Travel, 'id' | 'meeting' | 'departure' | 'details' | 'vehicleName' | 'phone_number' | 'seats'>
  & { passengers?: Maybe<Array<Maybe<(
    { __typename?: 'ComponentPassengerPassenger' }
    & Pick<ComponentPassengerPassenger, 'id' | 'name' | 'location'>
    & { user?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & Pick<UsersPermissionsUser, 'id' | 'firstName' | 'lastName'>
    )> }
  )>>> }
);

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
}>;


export type CreateTravelMutation = (
  { __typename?: 'Mutation' }
  & { createTravel?: Maybe<(
    { __typename?: 'createTravelPayload' }
    & { travel?: Maybe<(
      { __typename?: 'Travel' }
      & TravelFieldsFragment
    )> }
  )> }
);

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID'];
  travelUpdate: EditTravelInput;
}>;


export type UpdateTravelMutation = (
  { __typename?: 'Mutation' }
  & { updateTravel?: Maybe<(
    { __typename?: 'updateTravelPayload' }
    & { travel?: Maybe<(
      { __typename?: 'Travel' }
      & TravelFieldsFragment
    )> }
  )> }
);

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTravelMutation = (
  { __typename?: 'Mutation' }
  & { deleteTravel?: Maybe<(
    { __typename?: 'deleteTravelPayload' }
    & { travel?: Maybe<(
      { __typename?: 'Travel' }
      & Pick<Travel, 'id'>
    )> }
  )> }
);

export type UserFieldsFragment = (
  { __typename?: 'UsersPermissionsUser' }
  & Pick<UsersPermissionsUser, 'id' | 'username' | 'email' | 'confirmed' | 'lastName' | 'firstName' | 'lang' | 'onboardingUser' | 'onboardingCreator'>
  & { events?: Maybe<Array<Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'uuid' | 'name' | 'date' | 'address'>
  )>>> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UsersPermissionsMe' }
    & Pick<UsersPermissionsMe, 'id' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & UserFieldsFragment
    )> }
  )> }
);

export type UpdateMeMutationVariables = Exact<{
  userUpdate: EditUserInput;
}>;


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe: (
    { __typename?: 'updateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & UserFieldsFragment
    )> }
  ) }
);

export type VehicleFieldsFragment = (
  { __typename?: 'Vehicle' }
  & Pick<Vehicle, 'id' | 'name' | 'seats' | 'phone_number'>
);

export type FindUserVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVehiclesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UsersPermissionsMe' }
    & Pick<UsersPermissionsMe, 'id' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & { vehicles?: Maybe<Array<Maybe<(
        { __typename?: 'Vehicle' }
        & VehicleFieldsFragment
      )>>> }
    )> }
  )> }
);

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteVehicleMutation = (
  { __typename?: 'Mutation' }
  & { deleteVehicle?: Maybe<(
    { __typename?: 'deleteVehiclePayload' }
    & { vehicle?: Maybe<(
      { __typename?: 'Vehicle' }
      & Pick<Vehicle, 'id' | 'name'>
    )> }
  )> }
);

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
  waitingList {
    id
    name
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
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
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
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      date: // value for 'date'
 *      address: // value for 'address'
 *      description: // value for 'description'
 *      newsletter: // value for 'newsletter'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation updateEvent($uuid: String!, $eventUpdate: editEventInput) {
  updateEventByUUID(input: {where: {uuid: $uuid}, data: $eventUpdate}) {
    event {
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
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const EventByUuidDocument = gql`
    query eventByUUID($uuid: String!) {
  eventByUUID(uuid: $uuid) {
    ...EventFields
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
export function useEventByUuidQuery(baseOptions: Apollo.QueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
        return Apollo.useQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, baseOptions);
      }
export function useEventByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
          return Apollo.useLazyQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, baseOptions);
        }
export type EventByUuidQueryHookResult = ReturnType<typeof useEventByUuidQuery>;
export type EventByUuidLazyQueryHookResult = ReturnType<typeof useEventByUuidLazyQuery>;
export type EventByUuidQueryResult = Apollo.QueryResult<EventByUuidQuery, EventByUuidQueryVariables>;
export const SettingDocument = gql`
    query setting {
  setting {
    id
    gtm_id
    about_link
    announcement
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
 *   },
 * });
 */
export function useSettingQuery(baseOptions?: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;
export const CreateTravelDocument = gql`
    mutation createTravel($travel: TravelInput!) {
  createTravel(input: {data: $travel}) {
    travel {
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
 *   },
 * });
 */
export function useCreateTravelMutation(baseOptions?: Apollo.MutationHookOptions<CreateTravelMutation, CreateTravelMutationVariables>) {
        return Apollo.useMutation<CreateTravelMutation, CreateTravelMutationVariables>(CreateTravelDocument, baseOptions);
      }
export type CreateTravelMutationHookResult = ReturnType<typeof useCreateTravelMutation>;
export type CreateTravelMutationResult = Apollo.MutationResult<CreateTravelMutation>;
export type CreateTravelMutationOptions = Apollo.BaseMutationOptions<CreateTravelMutation, CreateTravelMutationVariables>;
export const UpdateTravelDocument = gql`
    mutation updateTravel($id: ID!, $travelUpdate: editTravelInput!) {
  updateTravel(input: {where: {id: $id}, data: $travelUpdate}) {
    travel {
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
        return Apollo.useMutation<UpdateTravelMutation, UpdateTravelMutationVariables>(UpdateTravelDocument, baseOptions);
      }
export type UpdateTravelMutationHookResult = ReturnType<typeof useUpdateTravelMutation>;
export type UpdateTravelMutationResult = Apollo.MutationResult<UpdateTravelMutation>;
export type UpdateTravelMutationOptions = Apollo.BaseMutationOptions<UpdateTravelMutation, UpdateTravelMutationVariables>;
export const DeleteTravelDocument = gql`
    mutation deleteTravel($id: ID!) {
  deleteTravel(input: {where: {id: $id}}) {
    travel {
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
        return Apollo.useMutation<DeleteTravelMutation, DeleteTravelMutationVariables>(DeleteTravelDocument, baseOptions);
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
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($userUpdate: editUserInput!) {
  updateMe(input: $userUpdate) {
    user {
      ...UserFields
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
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, baseOptions);
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
      vehicles {
        ...VehicleFields
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
        return Apollo.useQuery<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>(FindUserVehiclesDocument, baseOptions);
      }
export function useFindUserVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>) {
          return Apollo.useLazyQuery<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>(FindUserVehiclesDocument, baseOptions);
        }
export type FindUserVehiclesQueryHookResult = ReturnType<typeof useFindUserVehiclesQuery>;
export type FindUserVehiclesLazyQueryHookResult = ReturnType<typeof useFindUserVehiclesLazyQuery>;
export type FindUserVehiclesQueryResult = Apollo.QueryResult<FindUserVehiclesQuery, FindUserVehiclesQueryVariables>;
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
        return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(DeleteVehicleDocument, baseOptions);
      }
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>;
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>;