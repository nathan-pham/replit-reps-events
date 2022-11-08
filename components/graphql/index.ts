import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export type Event = {
  __typename?: 'Event';
  _createdAt: Scalars['DateTime'];
  author: Scalars['ID'];
  blocks: Array<EventBlock>;
  description: Scalars['String'];
  hero: Scalars['URL'];
  heroY: Scalars['Float'];
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  submissions: Array<Scalars['ID']>;
  title: Scalars['String'];
  users: Array<Scalars['ID']>;
};

export type EventBlock = {
  __typename?: 'EventBlock';
  children: Array<Maybe<EventBlock>>;
  content: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type EventBlockInput = {
  children: Array<InputMaybe<EventBlockInput>>;
  content: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserRole: User;
  createEvent: Event;
  createUser: User;
  deleteEvent: Event;
  loginUser: User;
  moveEventBlock: Event;
  removeEventBlock: Event;
  removeUserRole: User;
  updateEventBlock: Event;
  updateEventDetails: Event;
  updateEventHero: Event;
};


export type MutationAddUserRoleArgs = {
  role: UserRoles;
};


export type MutationCreateEventArgs = {
  published: Scalars['Boolean'];
  tagline: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationMoveEventBlockArgs = {
  blockId: Scalars['ID'];
  eventId: Scalars['ID'];
  newIndex: Scalars['Int'];
};


export type MutationRemoveEventBlockArgs = {
  blockId: Scalars['ID'];
  eventId: Scalars['ID'];
};


export type MutationRemoveUserRoleArgs = {
  role: UserRoles;
};


export type MutationUpdateEventBlockArgs = {
  block: EventBlockInput;
  blockId: Scalars['ID'];
  eventId: Scalars['ID'];
};


export type MutationUpdateEventDetailsArgs = {
  id: Scalars['ID'];
  published: Scalars['Boolean'];
  tagline: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateEventHeroArgs = {
  hero?: InputMaybe<Scalars['String']>;
  heroY?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  event: Event;
  eventImages: Array<Scalars['String']>;
  user: User;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type Submission = {
  __typename?: 'Submission';
  _createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  summary: Scalars['String'];
  title: Scalars['String'];
  video: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _createdAt: Scalars['DateTime'];
  avatar: Scalars['URL'];
  email: Scalars['String'];
  events: Array<Scalars['ID']>;
  id: Scalars['ID'];
  password: Scalars['String'];
  roles: Array<Maybe<UserRoles>>;
  submissions: Array<Scalars['ID']>;
  token?: Maybe<Scalars['JWT']>;
  username: Scalars['String'];
};

export enum UserRoles {
  Admin = 'ADMIN',
  EarlyBird = 'EARLY_BIRD',
  ReplitRep = 'REPLIT_REP'
}

export type Unnamed_1_MutationVariables = Exact<{
  title: Scalars['String'];
  tagline: Scalars['String'];
  published: Scalars['Boolean'];
}>;


export type Unnamed_1_Mutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, title: string } };

export type Unnamed_2_MutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type Unnamed_2_Mutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', token?: any | null } };

export type EventImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventImagesQuery = { __typename?: 'Query', eventImages: Array<string> };

export type Unnamed_3_MutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type Unnamed_3_Mutation = { __typename?: 'Mutation', loginUser: { __typename?: 'User', token?: any | null } };


export const Document = gql`
    mutation ($title: String!, $tagline: String!, $published: Boolean!) {
  createEvent(title: $title, tagline: $tagline, published: $published) {
    id
    title
  }
}
    `;

export function useMutation() {
  return Urql.useMutation<Mutation, MutationVariables>(Document);
};
export const Document = gql`
    mutation ($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email) {
    token
  }
}
    `;

export function useMutation() {
  return Urql.useMutation<Mutation, MutationVariables>(Document);
};
export const EventImagesDocument = gql`
    query EventImages {
  eventImages
}
    `;

export function useEventImagesQuery(options?: Omit<Urql.UseQueryArgs<EventImagesQueryVariables>, 'query'>) {
  return Urql.useQuery<EventImagesQuery, EventImagesQueryVariables>({ query: EventImagesDocument, ...options });
};
export const Document = gql`
    mutation ($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    token
  }
}
    `;

export function useMutation() {
  return Urql.useMutation<Mutation, MutationVariables>(Document);
};