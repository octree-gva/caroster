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

export type Car = {
  __typename?: 'Car';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  seats: Scalars['Int'];
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  phone_number?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  passengers?: Maybe<Array<Maybe<ComponentPassengerPassenger>>>;
};

export type CarAggregator = {
  __typename?: 'CarAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<CarAggregatorSum>;
  avg?: Maybe<CarAggregatorAvg>;
  min?: Maybe<CarAggregatorMin>;
  max?: Maybe<CarAggregatorMax>;
};

export type CarAggregatorAvg = {
  __typename?: 'CarAggregatorAvg';
  seats?: Maybe<Scalars['Float']>;
};

export type CarAggregatorMax = {
  __typename?: 'CarAggregatorMax';
  seats?: Maybe<Scalars['Float']>;
};

export type CarAggregatorMin = {
  __typename?: 'CarAggregatorMin';
  seats?: Maybe<Scalars['Float']>;
};

export type CarAggregatorSum = {
  __typename?: 'CarAggregatorSum';
  seats?: Maybe<Scalars['Float']>;
};

export type CarConnection = {
  __typename?: 'CarConnection';
  values?: Maybe<Array<Maybe<Car>>>;
  groupBy?: Maybe<CarGroupBy>;
  aggregate?: Maybe<CarAggregator>;
};

export type CarConnectionCreated_At = {
  __typename?: 'CarConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionDeparture = {
  __typename?: 'CarConnectionDeparture';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionDetails = {
  __typename?: 'CarConnectionDetails';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionEvent = {
  __typename?: 'CarConnectionEvent';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionId = {
  __typename?: 'CarConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionMeeting = {
  __typename?: 'CarConnectionMeeting';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionName = {
  __typename?: 'CarConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionPhone_Number = {
  __typename?: 'CarConnectionPhone_number';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionSeats = {
  __typename?: 'CarConnectionSeats';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<CarConnection>;
};

export type CarConnectionUpdated_At = {
  __typename?: 'CarConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CarConnection>;
};

export type CarGroupBy = {
  __typename?: 'CarGroupBy';
  id?: Maybe<Array<Maybe<CarConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CarConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CarConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<CarConnectionName>>>;
  seats?: Maybe<Array<Maybe<CarConnectionSeats>>>;
  meeting?: Maybe<Array<Maybe<CarConnectionMeeting>>>;
  departure?: Maybe<Array<Maybe<CarConnectionDeparture>>>;
  phone_number?: Maybe<Array<Maybe<CarConnectionPhone_Number>>>;
  details?: Maybe<Array<Maybe<CarConnectionDetails>>>;
  event?: Maybe<Array<Maybe<CarConnectionEvent>>>;
};

export type CarInput = {
  name: Scalars['String'];
  seats: Scalars['Int'];
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  phone_number?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['ID']>;
  passengers?: Maybe<Array<Maybe<ComponentPassengerPassengerInput>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentPassengerPassenger = {
  __typename?: 'ComponentPassengerPassenger';
  id: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type ComponentPassengerPassengerInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
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
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
};

export type EmailTemplateInput = {
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
  cars?: Maybe<Array<Maybe<Car>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type EventCarsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type EventUsersArgs = {
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
};

export type EventInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  cars?: Maybe<Array<Maybe<Scalars['ID']>>>;
  position?: Maybe<Scalars['JSON']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  uuid?: Maybe<Scalars['String']>;
  waitingList?: Maybe<Array<Maybe<ComponentPassengerPassengerInput>>>;
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



export type Morph = Dependency | Info | UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | Car | CarConnection | CarAggregator | CarAggregatorSum | CarAggregatorAvg | CarAggregatorMin | CarAggregatorMax | CarGroupBy | CarConnectionId | CarConnectionCreated_At | CarConnectionUpdated_At | CarConnectionName | CarConnectionSeats | CarConnectionMeeting | CarConnectionDeparture | CarConnectionPhone_Number | CarConnectionDetails | CarConnectionEvent | CreateCarPayload | UpdateCarPayload | DeleteCarPayload | Event | EventConnection | EventAggregator | EventGroupBy | EventConnectionId | EventConnectionCreated_At | EventConnectionUpdated_At | EventConnectionName | EventConnectionEmail | EventConnectionDate | EventConnectionAddress | EventConnectionPosition | EventConnectionUuid | CreateEventPayload | UpdateEventPayload | DeleteEventPayload | Page | PageConnection | PageAggregator | PageGroupBy | PageConnectionId | PageConnectionCreated_At | PageConnectionUpdated_At | PageConnectionName | PageConnectionContent | PageConnectionType | CreatePagePayload | UpdatePagePayload | DeletePagePayload | Settings | UpdateSettingPayload | DeleteSettingPayload | EmailDesignerEmailTemplate | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionFirstName | UsersPermissionsUserConnectionLastName | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionOnboardingUser | UsersPermissionsUserConnectionOnboardingCreator | UsersPermissionsUserConnectionLang | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentPassengerPassenger;

export type Mutation = {
  __typename?: 'Mutation';
  createCar?: Maybe<CreateCarPayload>;
  updateCar?: Maybe<UpdateCarPayload>;
  deleteCar?: Maybe<DeleteCarPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  createPage?: Maybe<CreatePagePayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  deletePage?: Maybe<DeletePagePayload>;
  updateSetting?: Maybe<UpdateSettingPayload>;
  deleteSetting?: Maybe<DeleteSettingPayload>;
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


export type MutationCreateCarArgs = {
  input?: Maybe<CreateCarInput>;
};


export type MutationUpdateCarArgs = {
  input?: Maybe<UpdateCarInput>;
};


export type MutationDeleteCarArgs = {
  input?: Maybe<DeleteCarInput>;
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
  car?: Maybe<Car>;
  cars?: Maybe<Array<Maybe<Car>>>;
  carsConnection?: Maybe<CarConnection>;
  event?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsConnection?: Maybe<EventConnection>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  setting?: Maybe<Settings>;
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


export type QueryCarArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCarsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryCarsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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
};


export type UsersPermissionsUserEventsArgs = {
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

export type CreateCarInput = {
  data?: Maybe<CarInput>;
};

export type CreateCarPayload = {
  __typename?: 'createCarPayload';
  car?: Maybe<Car>;
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

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteCarInput = {
  where?: Maybe<InputId>;
};

export type DeleteCarPayload = {
  __typename?: 'deleteCarPayload';
  car?: Maybe<Car>;
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

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditCarInput = {
  name?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  phone_number?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['ID']>;
  passengers?: Maybe<Array<Maybe<EditComponentPassengerPassengerInput>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentPassengerPassengerInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type EditEmailTemplateInput = {
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
  cars?: Maybe<Array<Maybe<Scalars['ID']>>>;
  position?: Maybe<Scalars['JSON']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  uuid?: Maybe<Scalars['String']>;
  waitingList?: Maybe<Array<Maybe<EditComponentPassengerPassengerInput>>>;
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
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
  old_password?: Maybe<Scalars['String']>;
};

export type UpdateCarInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCarInput>;
};

export type UpdateCarPayload = {
  __typename?: 'updateCarPayload';
  car?: Maybe<Car>;
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

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
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

export type CarFieldsFragment = (
  { __typename?: 'Car' }
  & Pick<Car, 'id' | 'name' | 'seats' | 'meeting' | 'departure' | 'phone_number' | 'details'>
  & { passengers?: Maybe<Array<Maybe<(
    { __typename?: 'ComponentPassengerPassenger' }
    & Pick<ComponentPassengerPassenger, 'id' | 'name'>
  )>>>, event?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name'>
  )> }
);

export type CreateCarMutationVariables = Exact<{
  car: CarInput;
}>;


export type CreateCarMutation = (
  { __typename?: 'Mutation' }
  & { createCar?: Maybe<(
    { __typename?: 'createCarPayload' }
    & { car?: Maybe<(
      { __typename?: 'Car' }
      & CarFieldsFragment
    )> }
  )> }
);

export type UpdateCarMutationVariables = Exact<{
  id: Scalars['ID'];
  carUpdate: EditCarInput;
}>;


export type UpdateCarMutation = (
  { __typename?: 'Mutation' }
  & { updateCar?: Maybe<(
    { __typename?: 'updateCarPayload' }
    & { car?: Maybe<(
      { __typename?: 'Car' }
      & CarFieldsFragment
    )> }
  )> }
);

export type DeleteCarMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCarMutation = (
  { __typename?: 'Mutation' }
  & { deleteCar?: Maybe<(
    { __typename?: 'deleteCarPayload' }
    & { car?: Maybe<(
      { __typename?: 'Car' }
      & Pick<Car, 'id' | 'name'>
    )> }
  )> }
);

export type EventFieldsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'uuid' | 'name' | 'email' | 'date' | 'address' | 'position'>
  & { waitingList?: Maybe<Array<Maybe<(
    { __typename?: 'ComponentPassengerPassenger' }
    & Pick<ComponentPassengerPassenger, 'id' | 'name'>
  )>>>, cars?: Maybe<Array<Maybe<(
    { __typename?: 'Car' }
    & Pick<Car, 'id' | 'name' | 'seats' | 'meeting' | 'departure' | 'details' | 'phone_number'>
    & { passengers?: Maybe<Array<Maybe<(
      { __typename?: 'ComponentPassengerPassenger' }
      & Pick<ComponentPassengerPassenger, 'id' | 'name'>
    )>>> }
  )>>> }
);

export type CreateEventMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
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
    & Pick<Settings, 'id' | 'gtm_id' | 'about_link'>
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

export const MeFieldsFragmentDoc = gql`
    fragment MeFields on UsersPermissionsMe {
  id
  username
  email
  confirmed
}
    `;
export const CarFieldsFragmentDoc = gql`
    fragment CarFields on Car {
  id
  name
  seats
  meeting
  departure
  phone_number
  details
  passengers {
    id
    name
  }
  event {
    id
    name
  }
}
    `;
export const EventFieldsFragmentDoc = gql`
    fragment EventFields on Event {
  id
  uuid
  name
  email
  date
  address
  position
  waitingList {
    id
    name
  }
  cars {
    id
    name
    seats
    meeting
    departure
    details
    phone_number
    passengers {
      id
      name
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
export const CreateCarDocument = gql`
    mutation createCar($car: CarInput!) {
  createCar(input: {data: $car}) {
    car {
      ...CarFields
    }
  }
}
    ${CarFieldsFragmentDoc}`;
export type CreateCarMutationFn = Apollo.MutationFunction<CreateCarMutation, CreateCarMutationVariables>;

/**
 * __useCreateCarMutation__
 *
 * To run a mutation, you first call `useCreateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarMutation, { data, loading, error }] = useCreateCarMutation({
 *   variables: {
 *      car: // value for 'car'
 *   },
 * });
 */
export function useCreateCarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarMutation, CreateCarMutationVariables>) {
        return Apollo.useMutation<CreateCarMutation, CreateCarMutationVariables>(CreateCarDocument, baseOptions);
      }
export type CreateCarMutationHookResult = ReturnType<typeof useCreateCarMutation>;
export type CreateCarMutationResult = Apollo.MutationResult<CreateCarMutation>;
export type CreateCarMutationOptions = Apollo.BaseMutationOptions<CreateCarMutation, CreateCarMutationVariables>;
export const UpdateCarDocument = gql`
    mutation updateCar($id: ID!, $carUpdate: editCarInput!) {
  updateCar(input: {where: {id: $id}, data: $carUpdate}) {
    car {
      ...CarFields
    }
  }
}
    ${CarFieldsFragmentDoc}`;
export type UpdateCarMutationFn = Apollo.MutationFunction<UpdateCarMutation, UpdateCarMutationVariables>;

/**
 * __useUpdateCarMutation__
 *
 * To run a mutation, you first call `useUpdateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarMutation, { data, loading, error }] = useUpdateCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *      carUpdate: // value for 'carUpdate'
 *   },
 * });
 */
export function useUpdateCarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarMutation, UpdateCarMutationVariables>) {
        return Apollo.useMutation<UpdateCarMutation, UpdateCarMutationVariables>(UpdateCarDocument, baseOptions);
      }
export type UpdateCarMutationHookResult = ReturnType<typeof useUpdateCarMutation>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCarMutation>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<UpdateCarMutation, UpdateCarMutationVariables>;
export const DeleteCarDocument = gql`
    mutation deleteCar($id: ID!) {
  deleteCar(input: {where: {id: $id}}) {
    car {
      id
      name
    }
  }
}
    `;
export type DeleteCarMutationFn = Apollo.MutationFunction<DeleteCarMutation, DeleteCarMutationVariables>;

/**
 * __useDeleteCarMutation__
 *
 * To run a mutation, you first call `useDeleteCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarMutation, { data, loading, error }] = useDeleteCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCarMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarMutation, DeleteCarMutationVariables>) {
        return Apollo.useMutation<DeleteCarMutation, DeleteCarMutationVariables>(DeleteCarDocument, baseOptions);
      }
export type DeleteCarMutationHookResult = ReturnType<typeof useDeleteCarMutation>;
export type DeleteCarMutationResult = Apollo.MutationResult<DeleteCarMutation>;
export type DeleteCarMutationOptions = Apollo.BaseMutationOptions<DeleteCarMutation, DeleteCarMutationVariables>;
export const CreateEventDocument = gql`
    mutation createEvent($name: String!, $email: String!, $date: Date, $address: String, $newsletter: Boolean) {
  createEvent(
    input: {data: {name: $name, email: $email, date: $date, address: $address, newsletter: $newsletter}}
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