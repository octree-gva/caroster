import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Page_Type {
  tos = 'tos'
}

export enum Enum_Userspermissionsuser_Lang {
  en = 'en',
  fr = 'fr'
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  design?: Maybe<Scalars['JSON']>;
  enabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  templateReferenceId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailDesignerEmailTemplateEntity = {
  __typename?: 'EmailDesignerEmailTemplateEntity';
  attributes?: Maybe<EmailDesignerEmailTemplate>;
  id?: Maybe<Scalars['ID']>;
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
  and?: InputMaybe<Array<InputMaybe<EmailDesignerEmailTemplateFiltersInput>>>;
  bodyHtml?: InputMaybe<StringFilterInput>;
  bodyText?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  design?: InputMaybe<JsonFilterInput>;
  enabled?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EmailDesignerEmailTemplateFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EmailDesignerEmailTemplateFiltersInput>>>;
  subject?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<JsonFilterInput>;
  templateReferenceId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EmailDesignerEmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  templateReferenceId?: InputMaybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  passengers?: Maybe<PassengerRelationResponseCollection>;
  position?: Maybe<Scalars['JSON']>;
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
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date?: InputMaybe<DateFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  newsletter?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  position?: InputMaybe<JsonFilterInput>;
  travels?: InputMaybe<TravelFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
  uuid?: InputMaybe<StringFilterInput>;
};

export type EventInput = {
  address?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  position?: InputMaybe<Scalars['JSON']>;
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
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = EmailDesignerEmailTemplate | Event | I18NLocale | Page | Passenger | Setting | Travel | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Vehicle;

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
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  /** Create a passenger */
  createPassenger?: Maybe<PassengerEntityResponse>;
  createSettingLocalization?: Maybe<SettingEntityResponse>;
  createTravel?: Maybe<TravelEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVehicle?: Maybe<VehicleEntityResponse>;
  deleteEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePassenger?: Maybe<PassengerEntityResponse>;
  deleteSetting?: Maybe<SettingEntityResponse>;
  deleteTravel?: Maybe<TravelEntityResponse>;
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
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  /** Update an event using its UUID */
  updateEventByUUID?: Maybe<EventEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateMe: UsersPermissionsUserEntityResponse;
  updatePage?: Maybe<PageEntityResponse>;
  updatePassenger?: Maybe<PassengerEntityResponse>;
  updateSetting?: Maybe<SettingEntityResponse>;
  updateTravel?: Maybe<TravelEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVehicle?: Maybe<VehicleEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateEmailDesignerEmailTemplateArgs = {
  data: EmailDesignerEmailTemplateInput;
};


export type MutationCreateEventArgs = {
  data: EventInput;
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


export type MutationDeleteEmailDesignerEmailTemplateArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEventArgs = {
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


export type MutationUpdateEmailDesignerEmailTemplateArgs = {
  data: EmailDesignerEmailTemplateInput;
  id: Scalars['ID'];
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
  travel?: InputMaybe<TravelFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type PassengerInput = {
  email?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  travel?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type PassengerRelationResponseCollection = {
  __typename?: 'PassengerRelationResponseCollection';
  data: Array<PassengerEntity>;
};

export type Query = {
  __typename?: 'Query';
  emailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  emailDesignerEmailTemplates?: Maybe<EmailDesignerEmailTemplateEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  /** Retrieve an event using its UUID */
  eventByUUID?: Maybe<EventEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  passenger?: Maybe<PassengerEntityResponse>;
  setting?: Maybe<SettingEntityResponse>;
  travel?: Maybe<TravelEntityResponse>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  vehicle?: Maybe<VehicleEntityResponse>;
};


export type QueryEmailDesignerEmailTemplateArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEmailDesignerEmailTemplatesArgs = {
  filters?: InputMaybe<EmailDesignerEmailTemplateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEventByUuidArgs = {
  uuid: Scalars['String'];
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
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


export type QuerySettingArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryTravelArgs = {
  id?: InputMaybe<Scalars['ID']>;
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
  faq_link?: Maybe<Scalars['String']>;
  gtm_id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SettingRelationResponseCollection>;
  matomo_script_url?: Maybe<Scalars['String']>;
  opencollective_link?: Maybe<Scalars['String']>;
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
  faq_link?: InputMaybe<Scalars['String']>;
  gtm_id?: InputMaybe<Scalars['String']>;
  matomo_script_url?: InputMaybe<Scalars['String']>;
  opencollective_link?: InputMaybe<Scalars['String']>;
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
  departure?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  event?: Maybe<EventEntityResponse>;
  meeting?: Maybe<Scalars['String']>;
  meeting_latitude?: Maybe<Scalars['Float']>;
  meeting_longitude?: Maybe<Scalars['Float']>;
  passengers?: Maybe<PassengerRelationResponseCollection>;
  phone_number?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
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

export type TravelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TravelFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  departure?: InputMaybe<DateTimeFilterInput>;
  details?: InputMaybe<StringFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  meeting?: InputMaybe<StringFilterInput>;
  meeting_latitude?: InputMaybe<FloatFilterInput>;
  meeting_longitude?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<TravelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TravelFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  phone_number?: InputMaybe<StringFilterInput>;
  seats?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vehicleName?: InputMaybe<StringFilterInput>;
};

export type TravelInput = {
  departure?: InputMaybe<Scalars['DateTime']>;
  details?: InputMaybe<Scalars['String']>;
  event?: InputMaybe<Scalars['ID']>;
  meeting?: InputMaybe<Scalars['String']>;
  meeting_latitude?: InputMaybe<Scalars['Float']>;
  meeting_longitude?: InputMaybe<Scalars['Float']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type TravelRelationResponseCollection = {
  __typename?: 'TravelRelationResponseCollection';
  data: Array<TravelEntity>;
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
  onboardingCreator?: Maybe<Scalars['Boolean']>;
  onboardingUser?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  vehicles?: Maybe<VehicleRelationResponseCollection>;
};


export type UsersPermissionsUserEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
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
  onboardingCreator?: InputMaybe<BooleanFilterInput>;
  onboardingUser?: InputMaybe<BooleanFilterInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  passengers?: InputMaybe<PassengerFiltersInput>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
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
  oldPassword?: InputMaybe<Scalars['String']>;
  onboardingCreator?: InputMaybe<Scalars['Boolean']>;
  onboardingUser?: InputMaybe<Scalars['Boolean']>;
  passengers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
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

export type VehicleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VehicleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<VehicleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VehicleFiltersInput>>>;
  phone_number?: InputMaybe<StringFilterInput>;
  seats?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type VehicleInput = {
  name?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type VehicleRelationResponseCollection = {
  __typename?: 'VehicleRelationResponseCollection';
  data: Array<VehicleEntity>;
};

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

export type EventFieldsFragment = { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, position?: any | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null };

export type CreateEventMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  date?: InputMaybe<Scalars['Date']>;
  address?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  newsletter?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, position?: any | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  uuid: Scalars['String'];
  eventUpdate: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, position?: any | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type EventByUuidQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type EventByUuidQuery = { __typename?: 'Query', eventByUUID?: { __typename?: 'EventEntityResponse', data?: { __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, description?: string | null, email: string, date?: any | null, address?: string | null, latitude?: number | null, longitude?: number | null, position?: any | null, waitingPassengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, email?: string | null, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null, travels?: { __typename?: 'TravelRelationResponseCollection', data: Array<{ __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null }> } | null } | null } | null } | null };

export type PassengerFieldsFragment = { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null };

export type CreatePassengerMutationVariables = Exact<{
  passenger: PassengerInput;
}>;


export type CreatePassengerMutation = { __typename?: 'Mutation', createPassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null } | null } | null };

export type UpdatePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
  passengerUpdate: PassengerInput;
}>;


export type UpdatePassengerMutation = { __typename?: 'Mutation', updatePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, email?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null } | null } | null };

export type DeletePassengerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePassengerMutation = { __typename?: 'Mutation', deletePassenger?: { __typename?: 'PassengerEntityResponse', data?: { __typename?: 'PassengerEntity', id?: string | null } | null } | null };

export type SettingQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type SettingQuery = { __typename?: 'Query', setting?: { __typename?: 'SettingEntityResponse', data?: { __typename?: 'SettingEntity', id?: string | null, attributes?: { __typename?: 'Setting', gtm_id?: string | null, about_link?: string | null, faq_link?: string | null, announcement?: string | null, matomo_script_url?: string | null, opencollective_link?: string | null } | null } | null } | null };

export type TravelFieldsFragment = { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null };

export type CreateTravelMutationVariables = Exact<{
  travel: TravelInput;
  createVehicle?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateTravelMutation = { __typename?: 'Mutation', createTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type UpdateTravelMutationVariables = Exact<{
  id: Scalars['ID'];
  travelUpdate: TravelInput;
}>;


export type UpdateTravelMutation = { __typename?: 'Mutation', updateTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null, attributes?: { __typename?: 'Travel', meeting?: string | null, meeting_latitude?: number | null, meeting_longitude?: number | null, departure?: any | null, details?: string | null, vehicleName?: string | null, phone_number?: string | null, seats?: number | null, passengers?: { __typename?: 'PassengerRelationResponseCollection', data: Array<{ __typename?: 'PassengerEntity', id?: string | null, attributes?: { __typename?: 'Passenger', name: string, location?: string | null, user?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', firstName?: string | null, lastName?: string | null } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type DeleteTravelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTravelMutation = { __typename?: 'Mutation', deleteTravel?: { __typename?: 'TravelEntityResponse', data?: { __typename?: 'TravelEntity', id?: string | null } | null } | null };

export type UserFieldsFragment = { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null } | null }> } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null } | null }> } | null } | null } | null };

export type UpdateMeMutationVariables = Exact<{
  userUpdate: UsersPermissionsUserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, email: string, confirmed?: boolean | null, lastName?: string | null, firstName?: string | null, lang?: Enum_Userspermissionsuser_Lang | null, onboardingUser?: boolean | null, onboardingCreator?: boolean | null, provider?: string | null, events?: { __typename?: 'EventRelationResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', uuid?: string | null, name: string, date?: any | null, address?: string | null } | null }> } | null } | null } | null } };

export type VehicleFieldsFragment = { __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string, seats?: number | null, phone_number?: string | null } | null };

export type FindUserVehiclesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserVehiclesQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, profile?: { __typename?: 'UsersPermissionsUser', vehicles?: { __typename?: 'VehicleRelationResponseCollection', data: Array<{ __typename?: 'VehicleEntity', id?: string | null, attributes?: { __typename?: 'Vehicle', name: string, seats?: number | null, phone_number?: string | null } | null }> } | null } | null } | null };

export type DeleteVehicleMutationVariables = Exact<{
  id: Scalars['ID'];
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
    email
    date
    address
    latitude
    longitude
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
    travels(pagination: {limit: 500}) {
      data {
        id
        attributes {
          meeting
          meeting_latitude
          meeting_longitude
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
    meeting_latitude
    meeting_longitude
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
  events(pagination: {limit: 500}) {
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
    mutation createEvent($name: String!, $email: String!, $date: Date, $address: String, $latitude: Float, $longitude: Float, $description: String, $newsletter: Boolean) {
  createEvent(
    data: {name: $name, email: $email, date: $date, latitude: $latitude, longitude: $longitude, address: $address, description: $description, newsletter: $newsletter}
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
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      description: // value for 'description'
 *      newsletter: // value for 'newsletter'
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, options);
      }
export function useEventByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByUuidQuery, EventByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventByUuidQuery, EventByUuidQueryVariables>(EventByUuidDocument, options);
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
        faq_link
        announcement
        matomo_script_url
        opencollective_link
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVehicleMutation, DeleteVehicleMutationVariables>(DeleteVehicleDocument, options);
      }
export type DeleteVehicleMutationHookResult = ReturnType<typeof useDeleteVehicleMutation>;
export type DeleteVehicleMutationResult = Apollo.MutationResult<DeleteVehicleMutation>;
export type DeleteVehicleMutationOptions = Apollo.BaseMutationOptions<DeleteVehicleMutation, DeleteVehicleMutationVariables>;