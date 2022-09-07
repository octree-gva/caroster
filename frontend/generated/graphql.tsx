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
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BooleanFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  or?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  not?: Maybe<BooleanFilterInput>;
  eq?: Maybe<Scalars['Boolean']>;
  eqi?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
  startsWith?: Maybe<Scalars['Boolean']>;
  endsWith?: Maybe<Scalars['Boolean']>;
  contains?: Maybe<Scalars['Boolean']>;
  notContains?: Maybe<Scalars['Boolean']>;
  containsi?: Maybe<Scalars['Boolean']>;
  notContainsi?: Maybe<Scalars['Boolean']>;
  gt?: Maybe<Scalars['Boolean']>;
  gte?: Maybe<Scalars['Boolean']>;
  lt?: Maybe<Scalars['Boolean']>;
  lte?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  between?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};


export type DateFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Date']>>>;
  or?: Maybe<Array<Maybe<Scalars['Date']>>>;
  not?: Maybe<DateFilterInput>;
  eq?: Maybe<Scalars['Date']>;
  eqi?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  startsWith?: Maybe<Scalars['Date']>;
  endsWith?: Maybe<Scalars['Date']>;
  contains?: Maybe<Scalars['Date']>;
  notContains?: Maybe<Scalars['Date']>;
  containsi?: Maybe<Scalars['Date']>;
  notContainsi?: Maybe<Scalars['Date']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Date']>>>;
  between?: Maybe<Array<Maybe<Scalars['Date']>>>;
};


export type DateTimeFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  or?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  not?: Maybe<DateTimeFilterInput>;
  eq?: Maybe<Scalars['DateTime']>;
  eqi?: Maybe<Scalars['DateTime']>;
  ne?: Maybe<Scalars['DateTime']>;
  startsWith?: Maybe<Scalars['DateTime']>;
  endsWith?: Maybe<Scalars['DateTime']>;
  contains?: Maybe<Scalars['DateTime']>;
  notContains?: Maybe<Scalars['DateTime']>;
  containsi?: Maybe<Scalars['DateTime']>;
  notContainsi?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  between?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
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
  templateReferenceId?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailDesignerEmailTemplateEntity = {
  __typename?: 'EmailDesignerEmailTemplateEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<EmailDesignerEmailTemplate>;
};

export type EmailDesignerEmailTemplateEntityResponse = {
  __typename?: 'EmailDesignerEmailTemplateEntityResponse';
  data?: Maybe<EmailDesignerEmailTemplateEntity>;
};

export type EmailDesignerEmailTemplateEntityResponseCollection = {
  __typename?: 'EmailDesignerEmailTemplateEntityResponseCollection';
  data: Array<EmailDesignerEmailTemplateEntity>;
  meta: ResponseCollectionMeta;
};

export type EmailDesignerEmailTemplateFiltersInput = {
  id?: Maybe<IdFilterInput>;
  templateReferenceId?: Maybe<IntFilterInput>;
  design?: Maybe<JsonFilterInput>;
  name?: Maybe<StringFilterInput>;
  subject?: Maybe<StringFilterInput>;
  bodyHtml?: Maybe<StringFilterInput>;
  bodyText?: Maybe<StringFilterInput>;
  enabled?: Maybe<BooleanFilterInput>;
  tags?: Maybe<JsonFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<EmailDesignerEmailTemplateFiltersInput>>>;
  or?: Maybe<Array<Maybe<EmailDesignerEmailTemplateFiltersInput>>>;
  not?: Maybe<EmailDesignerEmailTemplateFiltersInput>;
};

export type EmailDesignerEmailTemplateInput = {
  templateReferenceId?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
};

export type Event = {
  __typename?: 'Event';
  name: Scalars['String'];
  email: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['JSON']>;
  uuid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  travels?: Maybe<TravelRelationResponseCollection>;
  waitingPassengers?: Maybe<PassengerRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventTravelsArgs = {
  filters?: Maybe<TravelFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type EventWaitingPassengersArgs = {
  filters?: Maybe<PassengerFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Event>;
};

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse';
  data?: Maybe<EventEntity>;
};

export type EventFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  email?: Maybe<StringFilterInput>;
  date?: Maybe<DateFilterInput>;
  address?: Maybe<StringFilterInput>;
  position?: Maybe<JsonFilterInput>;
  uuid?: Maybe<StringFilterInput>;
  description?: Maybe<StringFilterInput>;
  newsletter?: Maybe<BooleanFilterInput>;
  users?: Maybe<UsersPermissionsUserFiltersInput>;
  travels?: Maybe<TravelFiltersInput>;
  waitingPassengers?: Maybe<PassengerFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<EventFiltersInput>>>;
  or?: Maybe<Array<Maybe<EventFiltersInput>>>;
  not?: Maybe<EventFiltersInput>;
};

export type EventInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  address?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['JSON']>;
  uuid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  newsletter?: Maybe<Scalars['Boolean']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  travels?: Maybe<Array<Maybe<Scalars['ID']>>>;
  waitingPassengers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Float']>>>;
  or?: Maybe<Array<Maybe<Scalars['Float']>>>;
  not?: Maybe<FloatFilterInput>;
  eq?: Maybe<Scalars['Float']>;
  eqi?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  startsWith?: Maybe<Scalars['Float']>;
  endsWith?: Maybe<Scalars['Float']>;
  contains?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['Float']>;
  containsi?: Maybe<Scalars['Float']>;
  notContainsi?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Float']>>>;
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type GenericMorph = UploadFile | UploadFolder | I18NLocale | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | EmailDesignerEmailTemplate | Event | Page | Passenger | Setting | Travel | Vehicle;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<I18NLocale>;
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
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  code?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  or?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  not?: Maybe<I18NLocaleFiltersInput>;
};

export type IdFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['ID']>>>;
  or?: Maybe<Array<Maybe<Scalars['ID']>>>;
  not?: Maybe<IdFilterInput>;
  eq?: Maybe<Scalars['ID']>;
  eqi?: Maybe<Scalars['ID']>;
  ne?: Maybe<Scalars['ID']>;
  startsWith?: Maybe<Scalars['ID']>;
  endsWith?: Maybe<Scalars['ID']>;
  contains?: Maybe<Scalars['ID']>;
  notContains?: Maybe<Scalars['ID']>;
  containsi?: Maybe<Scalars['ID']>;
  notContainsi?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type IntFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Int']>>>;
  or?: Maybe<Array<Maybe<Scalars['Int']>>>;
  not?: Maybe<IntFilterInput>;
  eq?: Maybe<Scalars['Int']>;
  eqi?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  startsWith?: Maybe<Scalars['Int']>;
  endsWith?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['Int']>;
  notContains?: Maybe<Scalars['Int']>;
  containsi?: Maybe<Scalars['Int']>;
  notContainsi?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type JsonFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  or?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  not?: Maybe<JsonFilterInput>;
  eq?: Maybe<Scalars['JSON']>;
  eqi?: Maybe<Scalars['JSON']>;
  ne?: Maybe<Scalars['JSON']>;
  startsWith?: Maybe<Scalars['JSON']>;
  endsWith?: Maybe<Scalars['JSON']>;
  contains?: Maybe<Scalars['JSON']>;
  notContains?: Maybe<Scalars['JSON']>;
  containsi?: Maybe<Scalars['JSON']>;
  notContainsi?: Maybe<Scalars['JSON']>;
  gt?: Maybe<Scalars['JSON']>;
  gte?: Maybe<Scalars['JSON']>;
  lt?: Maybe<Scalars['JSON']>;
  lte?: Maybe<Scalars['JSON']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  between?: Maybe<Array<Maybe<Scalars['JSON']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  createEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  updateEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  deleteEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  createPassenger?: Maybe<PassengerEntityResponse>;
  updatePassenger?: Maybe<PassengerEntityResponse>;
  deletePassenger?: Maybe<PassengerEntityResponse>;
  updateSetting?: Maybe<SettingEntityResponse>;
  deleteSetting?: Maybe<SettingEntityResponse>;
  createTravel?: Maybe<TravelEntityResponse>;
  updateTravel?: Maybe<TravelEntityResponse>;
  deleteTravel?: Maybe<TravelEntityResponse>;
  createVehicle?: Maybe<VehicleEntityResponse>;
  updateVehicle?: Maybe<VehicleEntityResponse>;
  deleteVehicle?: Maybe<VehicleEntityResponse>;
  upload: UploadFileEntityResponse;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  updateFileInfo: UploadFileEntityResponse;
  removeFile?: Maybe<UploadFileEntityResponse>;
  createSettingLocalization?: Maybe<SettingEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Update an event using its UUID */
  updateEventByUUID?: Maybe<EventEntityResponse>;
  updateMe: UsersPermissionsUserEntityResponse;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID'];
  data: UploadFileInput;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationUpdateUploadFolderArgs = {
  id: Scalars['ID'];
  data: UploadFolderInput;
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEmailDesignerEmailTemplateArgs = {
  data: EmailDesignerEmailTemplateInput;
};


export type MutationUpdateEmailDesignerEmailTemplateArgs = {
  id: Scalars['ID'];
  data: EmailDesignerEmailTemplateInput;
};


export type MutationDeleteEmailDesignerEmailTemplateArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID'];
  data: EventInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePageArgs = {
  data: PageInput;
};


export type MutationUpdatePageArgs = {
  id: Scalars['ID'];
  data: PageInput;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePassengerArgs = {
  data: PassengerInput;
};


export type MutationUpdatePassengerArgs = {
  id: Scalars['ID'];
  data: PassengerInput;
};


export type MutationDeletePassengerArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSettingArgs = {
  data: SettingInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteSettingArgs = {
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateTravelArgs = {
  data: TravelInput;
  createVehicle?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateTravelArgs = {
  id: Scalars['ID'];
  data: TravelInput;
};


export type MutationDeleteTravelArgs = {
  id: Scalars['ID'];
};


export type MutationCreateVehicleArgs = {
  data: VehicleInput;
};


export type MutationUpdateVehicleArgs = {
  id: Scalars['ID'];
  data: VehicleInput;
};


export type MutationDeleteVehicleArgs = {
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: Maybe<FileInfoInput>;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateSettingLocalizationArgs = {
  id?: Maybe<Scalars['ID']>;
  data?: Maybe<SettingInput>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
  data: UsersPermissionsRoleInput;
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationUpdateUsersPermissionsUserArgs = {
  id: Scalars['ID'];
  data: UsersPermissionsUserInput;
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
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


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationUpdateEventByUuidArgs = {
  uuid: Scalars['String'];
  data: EventInput;
};


export type MutationUpdateMeArgs = {
  data: UsersPermissionsUserInput;
};

export type Page = {
  __typename?: 'Page';
  name: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Page_Type>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Page>;
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
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  content?: Maybe<StringFilterInput>;
  type?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<PageFiltersInput>>>;
  or?: Maybe<Array<Maybe<PageFiltersInput>>>;
  not?: Maybe<PageFiltersInput>;
};

export type PageInput = {
  name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Page_Type>;
};

export type Pagination = {
  __typename?: 'Pagination';
  total: Scalars['Int'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pageCount: Scalars['Int'];
};

export type PaginationArg = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Passenger = {
  __typename?: 'Passenger';
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  event?: Maybe<EventEntityResponse>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
  travel?: Maybe<TravelEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PassengerEntity = {
  __typename?: 'PassengerEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Passenger>;
};

export type PassengerEntityResponse = {
  __typename?: 'PassengerEntityResponse';
  data?: Maybe<PassengerEntity>;
};

export type PassengerFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  email?: Maybe<StringFilterInput>;
  location?: Maybe<StringFilterInput>;
  event?: Maybe<EventFiltersInput>;
  user?: Maybe<UsersPermissionsUserFiltersInput>;
  travel?: Maybe<TravelFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<PassengerFiltersInput>>>;
  or?: Maybe<Array<Maybe<PassengerFiltersInput>>>;
  not?: Maybe<PassengerFiltersInput>;
};

export type PassengerInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  travel?: Maybe<Scalars['ID']>;
};

export type PassengerRelationResponseCollection = {
  __typename?: 'PassengerRelationResponseCollection';
  data: Array<PassengerEntity>;
};

export type Query = {
  __typename?: 'Query';
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  emailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  emailDesignerEmailTemplates?: Maybe<EmailDesignerEmailTemplateEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  passenger?: Maybe<PassengerEntityResponse>;
  setting?: Maybe<SettingEntityResponse>;
  travel?: Maybe<TravelEntityResponse>;
  vehicle?: Maybe<VehicleEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  /** Retrieve an event using its UUID */
  eventByUUID?: Maybe<EventEntityResponse>;
};


export type QueryUploadFileArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: Maybe<UploadFileFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: Maybe<UploadFolderFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: Maybe<I18NLocaleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: Maybe<UsersPermissionsRoleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryEmailDesignerEmailTemplateArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryEmailDesignerEmailTemplatesArgs = {
  filters?: Maybe<EmailDesignerEmailTemplateFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryEventArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPagesArgs = {
  filters?: Maybe<PageFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPassengerArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySettingArgs = {
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type QueryTravelArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryVehicleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String'];
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Setting = {
  __typename?: 'Setting';
  gtm_id?: Maybe<Scalars['String']>;
  about_link?: Maybe<Scalars['String']>;
  faq_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  matomo_script_url?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<SettingRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
};

export type SettingEntity = {
  __typename?: 'SettingEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Setting>;
};

export type SettingEntityResponse = {
  __typename?: 'SettingEntityResponse';
  data?: Maybe<SettingEntity>;
};

export type SettingInput = {
  gtm_id?: Maybe<Scalars['String']>;
  about_link?: Maybe<Scalars['String']>;
  faq_link?: Maybe<Scalars['String']>;
  announcement?: Maybe<Scalars['String']>;
  matomo_script_url?: Maybe<Scalars['String']>;
};

export type SettingRelationResponseCollection = {
  __typename?: 'SettingRelationResponseCollection';
  data: Array<SettingEntity>;
};

export type StringFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['String']>>>;
  or?: Maybe<Array<Maybe<Scalars['String']>>>;
  not?: Maybe<StringFilterInput>;
  eq?: Maybe<Scalars['String']>;
  eqi?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  containsi?: Maybe<Scalars['String']>;
  notContainsi?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Travel = {
  __typename?: 'Travel';
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  vehicleName?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  event?: Maybe<EventEntityResponse>;
  passengers?: Maybe<PassengerRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type TravelPassengersArgs = {
  filters?: Maybe<PassengerFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type TravelEntity = {
  __typename?: 'TravelEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Travel>;
};

export type TravelEntityResponse = {
  __typename?: 'TravelEntityResponse';
  data?: Maybe<TravelEntity>;
};

export type TravelFiltersInput = {
  id?: Maybe<IdFilterInput>;
  meeting?: Maybe<StringFilterInput>;
  departure?: Maybe<DateTimeFilterInput>;
  details?: Maybe<StringFilterInput>;
  vehicleName?: Maybe<StringFilterInput>;
  seats?: Maybe<IntFilterInput>;
  phone_number?: Maybe<StringFilterInput>;
  event?: Maybe<EventFiltersInput>;
  passengers?: Maybe<PassengerFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<TravelFiltersInput>>>;
  or?: Maybe<Array<Maybe<TravelFiltersInput>>>;
  not?: Maybe<TravelFiltersInput>;
};

export type TravelInput = {
  meeting?: Maybe<Scalars['String']>;
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  vehicleName?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['ID']>;
  passengers?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TravelRelationResponseCollection = {
  __typename?: 'TravelRelationResponseCollection';
  data: Array<TravelEntity>;
};


export type UploadFile = {
  __typename?: 'UploadFile';
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
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UploadFile>;
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
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  alternativeText?: Maybe<StringFilterInput>;
  caption?: Maybe<StringFilterInput>;
  width?: Maybe<IntFilterInput>;
  height?: Maybe<IntFilterInput>;
  formats?: Maybe<JsonFilterInput>;
  hash?: Maybe<StringFilterInput>;
  ext?: Maybe<StringFilterInput>;
  mime?: Maybe<StringFilterInput>;
  size?: Maybe<FloatFilterInput>;
  url?: Maybe<StringFilterInput>;
  previewUrl?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  provider_metadata?: Maybe<JsonFilterInput>;
  folder?: Maybe<UploadFolderFiltersInput>;
  folderPath?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  or?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  not?: Maybe<UploadFileFiltersInput>;
};

export type UploadFileInput = {
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
  folder?: Maybe<Scalars['ID']>;
  folderPath?: Maybe<Scalars['String']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  name: Scalars['String'];
  pathId: Scalars['Int'];
  parent?: Maybe<UploadFolderEntityResponse>;
  children?: Maybe<UploadFolderRelationResponseCollection>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  path: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: Maybe<UploadFolderFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: Maybe<UploadFileFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UploadFolder>;
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
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  pathId?: Maybe<IntFilterInput>;
  parent?: Maybe<UploadFolderFiltersInput>;
  children?: Maybe<UploadFolderFiltersInput>;
  files?: Maybe<UploadFileFiltersInput>;
  path?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UploadFolderFiltersInput>>>;
  or?: Maybe<Array<Maybe<UploadFolderFiltersInput>>>;
  not?: Maybe<UploadFolderFiltersInput>;
};

export type UploadFolderInput = {
  name?: Maybe<Scalars['String']>;
  pathId?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['ID']>;
  children?: Maybe<Array<Maybe<Scalars['ID']>>>;
  files?: Maybe<Array<Maybe<Scalars['ID']>>>;
  path?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
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

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsPermission>;
};

export type UsersPermissionsPermissionFiltersInput = {
  id?: Maybe<IdFilterInput>;
  action?: Maybe<StringFilterInput>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  not?: Maybe<UsersPermissionsPermissionFiltersInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
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
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: Maybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: Maybe<UsersPermissionsUserFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsRole>;
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
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  description?: Maybe<StringFilterInput>;
  type?: Maybe<StringFilterInput>;
  permissions?: Maybe<UsersPermissionsPermissionFiltersInput>;
  users?: Maybe<UsersPermissionsUserFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  not?: Maybe<UsersPermissionsRoleFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  events?: Maybe<EventRelationResponseCollection>;
  vehicles?: Maybe<VehicleRelationResponseCollection>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UsersPermissionsUserEventsArgs = {
  filters?: Maybe<EventFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type UsersPermissionsUserVehiclesArgs = {
  filters?: Maybe<VehicleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserFiltersInput = {
  id?: Maybe<IdFilterInput>;
  username?: Maybe<StringFilterInput>;
  email?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  password?: Maybe<StringFilterInput>;
  resetPasswordToken?: Maybe<StringFilterInput>;
  confirmationToken?: Maybe<StringFilterInput>;
  confirmed?: Maybe<BooleanFilterInput>;
  blocked?: Maybe<BooleanFilterInput>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  events?: Maybe<EventFiltersInput>;
  passengers?: Maybe<PassengerFiltersInput>;
  vehicles?: Maybe<VehicleFiltersInput>;
  firstName?: Maybe<StringFilterInput>;
  lastName?: Maybe<StringFilterInput>;
  onboardingUser?: Maybe<BooleanFilterInput>;
  onboardingCreator?: Maybe<BooleanFilterInput>;
  lang?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  not?: Maybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  passengers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  vehicles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Enum_Userspermissionsuser_Lang>;
  oldPassword?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  name: Scalars['String'];
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VehicleEntity = {
  __typename?: 'VehicleEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Vehicle>;
};

export type VehicleEntityResponse = {
  __typename?: 'VehicleEntityResponse';
  data?: Maybe<VehicleEntity>;
};

export type VehicleFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  seats?: Maybe<IntFilterInput>;
  phone_number?: Maybe<StringFilterInput>;
  user?: Maybe<UsersPermissionsUserFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<VehicleFiltersInput>>>;
  or?: Maybe<Array<Maybe<VehicleFiltersInput>>>;
  not?: Maybe<VehicleFiltersInput>;
};

export type VehicleInput = {
  name?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  phone_number?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
};

export type VehicleRelationResponseCollection = {
  __typename?: 'VehicleRelationResponseCollection';
  data: Array<VehicleEntity>;
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
    { __typename?: 'UsersPermissionsPasswordPayload' }
    & Pick<UsersPermissionsPasswordPayload, 'ok'>
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
  { __typename?: 'EventEntity' }
  & Pick<EventEntity, 'id'>
  & { attributes?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'uuid' | 'name' | 'description' | 'email' | 'date' | 'address' | 'position'>
    & { waitingPassengers?: Maybe<(
      { __typename?: 'PassengerRelationResponseCollection' }
      & { data: Array<(
        { __typename?: 'PassengerEntity' }
        & Pick<PassengerEntity, 'id'>
        & { attributes?: Maybe<(
          { __typename?: 'Passenger' }
          & Pick<Passenger, 'name' | 'email' | 'location'>
          & { user?: Maybe<(
            { __typename?: 'UsersPermissionsUserEntityResponse' }
            & { data?: Maybe<(
              { __typename?: 'UsersPermissionsUserEntity' }
              & Pick<UsersPermissionsUserEntity, 'id'>
              & { attributes?: Maybe<(
                { __typename?: 'UsersPermissionsUser' }
                & Pick<UsersPermissionsUser, 'firstName' | 'lastName'>
              )> }
            )> }
          )> }
        )> }
      )> }
    )>, travels?: Maybe<(
      { __typename?: 'TravelRelationResponseCollection' }
      & { data: Array<(
        { __typename?: 'TravelEntity' }
        & Pick<TravelEntity, 'id'>
        & { attributes?: Maybe<(
          { __typename?: 'Travel' }
          & Pick<Travel, 'meeting' | 'departure' | 'details' | 'vehicleName' | 'phone_number' | 'seats'>
          & { passengers?: Maybe<(
            { __typename?: 'PassengerRelationResponseCollection' }
            & { data: Array<(
              { __typename?: 'PassengerEntity' }
              & Pick<PassengerEntity, 'id'>
              & { attributes?: Maybe<(
                { __typename?: 'Passenger' }
                & Pick<Passenger, 'name' | 'location'>
                & { user?: Maybe<(
                  { __typename?: 'UsersPermissionsUserEntityResponse' }
                  & { data?: Maybe<(
                    { __typename?: 'UsersPermissionsUserEntity' }
                    & Pick<UsersPermissionsUserEntity, 'id'>
                    & { attributes?: Maybe<(
                      { __typename?: 'UsersPermissionsUser' }
                      & Pick<UsersPermissionsUser, 'firstName' | 'lastName'>
                    )> }
                  )> }
                )> }
              )> }
            )> }
          )> }
        )> }
      )> }
    )> }
  )> }
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
    { __typename?: 'EventEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'EventEntity' }
      & EventFieldsFragment
    )> }
  )> }
);

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String'];
  eventUpdate: EventInput;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEventByUUID?: Maybe<(
    { __typename?: 'EventEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'EventEntity' }
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
    { __typename?: 'EventEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'EventEntity' }
      & EventFieldsFragment
    )> }
  )> }
);

export type PassengerFieldsFragment = (
  { __typename?: 'PassengerEntity' }
  & Pick<PassengerEntity, 'id'>
  & { attributes?: Maybe<(
    { __typename?: 'Passenger' }
    & Pick<Passenger, 'name' | 'location' | 'email'>
    & { user?: Maybe<(
      { __typename?: 'UsersPermissionsUserEntityResponse' }
      & { data?: Maybe<(
        { __typename?: 'UsersPermissionsUserEntity' }
        & Pick<UsersPermissionsUserEntity, 'id'>
        & { attributes?: Maybe<(
          { __typename?: 'UsersPermissionsUser' }
          & Pick<UsersPermissionsUser, 'firstName' | 'lastName'>
        )> }
      )> }
    )> }
  )> }
);

export type CreatePassengerMutationVariables = Exact<{
  passenger: PassengerInput;
}>;


export type CreatePassengerMutation = (
  { __typename?: 'Mutation' }
  & { createPassenger?: Maybe<(
    { __typename?: 'PassengerEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'PassengerEntity' }
      & PassengerFieldsFragment
    )> }
  )> }
);

export type UpdatePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
  passengerUpdate: PassengerInput;
}>;


export type UpdatePassengerMutation = (
  { __typename?: 'Mutation' }
  & { updatePassenger?: Maybe<(
    { __typename?: 'PassengerEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'PassengerEntity' }
      & PassengerFieldsFragment
    )> }
  )> }
);

export type DeletePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePassengerMutation = (
  { __typename?: 'Mutation' }
  & { deletePassenger?: Maybe<(
    { __typename?: 'PassengerEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'PassengerEntity' }
      & Pick<PassengerEntity, 'id'>
    )> }
  )> }
);

export type SettingQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type SettingQuery = (
  { __typename?: 'Query' }
  & { setting?: Maybe<(
    { __typename?: 'SettingEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'SettingEntity' }
      & Pick<SettingEntity, 'id'>
      & { attributes?: Maybe<(
        { __typename?: 'Setting' }
        & Pick<Setting, 'gtm_id' | 'about_link' | 'faq_link' | 'announcement' | 'matomo_script_url'>
      )> }
    )> }
  )> }
);

export type TravelFieldsFragment = (
  { __typename?: 'TravelEntity' }
  & Pick<TravelEntity, 'id'>
  & { attributes?: Maybe<(
    { __typename?: 'Travel' }
    & Pick<Travel, 'meeting' | 'departure' | 'details' | 'vehicleName' | 'phone_number' | 'seats'>
    & { passengers?: Maybe<(
      { __typename?: 'PassengerRelationResponseCollection' }
      & { data: Array<(
        { __typename?: 'PassengerEntity' }
        & Pick<PassengerEntity, 'id'>
        & { attributes?: Maybe<(
          { __typename?: 'Passenger' }
          & Pick<Passenger, 'name' | 'location'>
          & { user?: Maybe<(
            { __typename?: 'UsersPermissionsUserEntityResponse' }
            & { data?: Maybe<(
              { __typename?: 'UsersPermissionsUserEntity' }
              & Pick<UsersPermissionsUserEntity, 'id'>
              & { attributes?: Maybe<(
                { __typename?: 'UsersPermissionsUser' }
                & Pick<UsersPermissionsUser, 'firstName' | 'lastName'>
              )> }
            )> }
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
  createVehicle?: Maybe<Scalars['Boolean']>;
}>;


export type CreateTravelMutation = (
  { __typename?: 'Mutation' }
  & { createTravel?: Maybe<(
    { __typename?: 'TravelEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'TravelEntity' }
      & TravelFieldsFragment
    )> }
  )> }
);

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID'];
  travelUpdate: TravelInput;
}>;


export type UpdateTravelMutation = (
  { __typename?: 'Mutation' }
  & { updateTravel?: Maybe<(
    { __typename?: 'TravelEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'TravelEntity' }
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
    { __typename?: 'TravelEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'TravelEntity' }
      & Pick<TravelEntity, 'id'>
    )> }
  )> }
);

export type UserFieldsFragment = (
  { __typename?: 'UsersPermissionsUser' }
  & Pick<UsersPermissionsUser, 'username' | 'email' | 'confirmed' | 'lastName' | 'firstName' | 'lang' | 'onboardingUser' | 'onboardingCreator' | 'provider'>
  & { events?: Maybe<(
    { __typename?: 'EventRelationResponseCollection' }
    & { data: Array<(
      { __typename?: 'EventEntity' }
      & Pick<EventEntity, 'id'>
      & { attributes?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'uuid' | 'name' | 'date' | 'address'>
      )> }
    )> }
  )> }
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
  userUpdate: UsersPermissionsUserInput;
}>;


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe: (
    { __typename?: 'UsersPermissionsUserEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'UsersPermissionsUserEntity' }
      & Pick<UsersPermissionsUserEntity, 'id'>
      & { attributes?: Maybe<(
        { __typename?: 'UsersPermissionsUser' }
        & UserFieldsFragment
      )> }
    )> }
  ) }
);

export type VehicleFieldsFragment = (
  { __typename?: 'VehicleEntity' }
  & Pick<VehicleEntity, 'id'>
  & { attributes?: Maybe<(
    { __typename?: 'Vehicle' }
    & Pick<Vehicle, 'name' | 'seats' | 'phone_number'>
  )> }
);

export type FindUserVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVehiclesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UsersPermissionsMe' }
    & Pick<UsersPermissionsMe, 'id' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'UsersPermissionsUser' }
      & { vehicles?: Maybe<(
        { __typename?: 'VehicleRelationResponseCollection' }
        & { data: Array<(
          { __typename?: 'VehicleEntity' }
          & VehicleFieldsFragment
        )> }
      )> }
    )> }
  )> }
);

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteVehicleMutation = (
  { __typename?: 'Mutation' }
  & { deleteVehicle?: Maybe<(
    { __typename?: 'VehicleEntityResponse' }
    & { data?: Maybe<(
      { __typename?: 'VehicleEntity' }
      & Pick<VehicleEntity, 'id'>
      & { attributes?: Maybe<(
        { __typename?: 'Vehicle' }
        & Pick<Vehicle, 'name'>
      )> }
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
    fragment EventFields on EventEntity {
  id
  attributes {
    uuid
    name
    description
    email
    date
    address
    position
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
    travels {
      data {
        id
        attributes {
          meeting
          departure
          details
          vehicleName
          phone_number
          seats
          passengers {
            data {
              id
              attributes {
                name
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
    email
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
    `;
export const TravelFieldsFragmentDoc = gql`
    fragment TravelFields on TravelEntity {
  id
  attributes {
    meeting
    departure
    details
    vehicleName
    phone_number
    seats
    passengers {
      data {
        id
        attributes {
          name
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
  provider
  events {
    data {
      id
      attributes {
        uuid
        name
        date
        address
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
export const CreateEventDocument = gql`
    mutation createEvent($name: String!, $email: String!, $date: Date, $address: String, $description: String, $newsletter: Boolean) {
  createEvent(
    data: {name: $name, email: $email, date: $date, address: $address, description: $description, newsletter: $newsletter}
  ) {
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
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
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
export function useEventByUuidQuery(baseOptions: Apollo.QueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
        return Apollo.useQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, baseOptions);
      }
export function useEventByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
          return Apollo.useLazyQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, baseOptions);
        }
export type EventByUuidQueryHookResult = ReturnType<typeof useEventByUuidQuery>;
export type EventByUuidLazyQueryHookResult = ReturnType<typeof useEventByUuidLazyQuery>;
export type EventByUuidQueryResult = Apollo.QueryResult<EventByUuidQuery, EventByUuidQueryVariables>;
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
        return Apollo.useMutation<CreatePassengerMutation, CreatePassengerMutationVariables>(CreatePassengerDocument, baseOptions);
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
        return Apollo.useMutation<UpdatePassengerMutation, UpdatePassengerMutationVariables>(UpdatePassengerDocument, baseOptions);
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
        return Apollo.useMutation<DeletePassengerMutation, DeletePassengerMutationVariables>(DeletePassengerDocument, baseOptions);
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
        faq_link
        announcement
        matomo_script_url
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
export function useSettingQuery(baseOptions: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, baseOptions);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
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
        return Apollo.useMutation<CreateTravelMutation, CreateTravelMutationVariables>(CreateTravelDocument, baseOptions);
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
        return Apollo.useMutation<UpdateTravelMutation, UpdateTravelMutationVariables>(UpdateTravelDocument, baseOptions);
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
        return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(DeleteVehicleDocument, baseOptions);
      }
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>;
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>;