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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  currentUser: UserClass;
  user: UserClass;
  page?: Maybe<PageClass>;
  pages: Array<PageClass>;
  searchPages: Array<PageClass>;
  variable?: Maybe<VariableClass>;
  searchVariables: Array<VariableClass>;
  question?: Maybe<QuestionClass>;
  questions: Array<QuestionClass>;
  searchQuestions: Array<QuestionClass>;
  statement?: Maybe<StatementClass>;
  statementsFromQuestion: Array<StatementClass>;
  paragraphEditProposal: ParagraphEditProposalClass;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QuerySearchPagesArgs = {
  searchString: Scalars['String'];
};


export type QueryVariableArgs = {
  id: Scalars['ID'];
};


export type QuerySearchVariablesArgs = {
  searchString: Scalars['String'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID'];
};


export type QuerySearchQuestionsArgs = {
  searchString: Scalars['String'];
};


export type QueryStatementArgs = {
  id: Scalars['ID'];
};


export type QueryStatementsFromQuestionArgs = {
  options?: Maybe<StatementsFromQuestionOptions>;
  questionId: Scalars['ID'];
};


export type QueryParagraphEditProposalArgs = {
  id: Scalars['String'];
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  verified: Scalars['Boolean'];
  admin: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};


export type PageClass = {
  __typename?: 'PageClass';
  _id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  paragraphs: Array<ParagraphClass>;
  currentParagraph: ParagraphClass;
  relatedPages: Array<PageClass>;
  referencedCount: Scalars['Float'];
};

export type ParagraphClass = {
  __typename?: 'ParagraphClass';
  _id: Scalars['ID'];
  page: PageClass;
  statements: Array<ParagraphStatementClass>;
  mostRecent: Scalars['Boolean'];
  sourceEditProposal?: Maybe<ParagraphEditProposalClass>;
  editProposals: Array<ParagraphEditProposalClass>;
};

export type ParagraphStatementClass = {
  __typename?: 'ParagraphStatementClass';
  versionIndex: Scalars['Float'];
  statement: StatementClass;
};

export type StatementClass = {
  __typename?: 'StatementClass';
  _id: Scalars['ID'];
  page: PageClass;
  versions: Array<StatementVersionClass>;
  current: Scalars['Boolean'];
  originalAuthor: UserClass;
};

export type StatementVersionClass = {
  __typename?: 'StatementVersionClass';
  stringArray: Array<StringArrayClass>;
  questions: Array<QuestionClass>;
  quotedStatement?: Maybe<StatementClass>;
  sourceEditProposal?: Maybe<ParagraphEditProposalClass>;
  createdAt: Scalars['DateTime'];
};

export type StringArrayClass = {
  __typename?: 'StringArrayClass';
  string?: Maybe<Scalars['String']>;
  styles: Array<StatementStyleClass>;
};

export type StatementStyleClass = {
  __typename?: 'StatementStyleClass';
  type: Scalars['String'];
  variant?: Maybe<Scalars['String']>;
  value: StatementValueClass;
};

export type StatementValueClass = {
  __typename?: 'StatementValueClass';
  url?: Maybe<Scalars['String']>;
  page?: Maybe<PageClass>;
  statement?: Maybe<StatementClass>;
  variable?: Maybe<VariableClass>;
  image?: Maybe<StatementImageClass>;
};

export type VariableClass = {
  __typename?: 'VariableClass';
  _id: Scalars['ID'];
  title: Scalars['String'];
  versions: Array<VariableVersionClass>;
  finalValue: Scalars['Float'];
  relatedPages: Array<PageClass>;
};

export type VariableVersionClass = {
  __typename?: 'VariableVersionClass';
  type: Scalars['String'];
  number: Scalars['Float'];
  equation: Array<VariableEquationClass>;
  sourceUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  finalValue: Scalars['Float'];
};

export type VariableEquationClass = {
  __typename?: 'VariableEquationClass';
  type: Scalars['String'];
  operator?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Float']>;
  variable?: Maybe<VariableClass>;
};

export type StatementImageClass = {
  __typename?: 'StatementImageClass';
  file: FileClass;
  sourceUrl?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileClass = {
  __typename?: 'FileClass';
  _id: Scalars['ID'];
  mimetype: Scalars['String'];
  createdAt: Scalars['DateTime'];
  buffer: Scalars['String'];
};

export type QuestionClass = {
  __typename?: 'QuestionClass';
  _id: Scalars['ID'];
  question: Scalars['String'];
  referencedCount: Scalars['Float'];
  relatedPages: Array<PageClass>;
};

export type ParagraphEditProposalClass = {
  __typename?: 'ParagraphEditProposalClass';
  _id: Scalars['ID'];
  paragraph: ParagraphClass;
  author: UserClass;
  description: Scalars['String'];
  statementItems: Array<ParagraphEditProposalStatementClass>;
  createdAt: Scalars['DateTime'];
};

export type ParagraphEditProposalStatementClass = {
  __typename?: 'ParagraphEditProposalStatementClass';
  _id: Scalars['ID'];
  changeType: Scalars['String'];
  paragraphStatement?: Maybe<ParagraphStatementClass>;
  stringArray: Array<StringArrayClass>;
  quotedStatement?: Maybe<StatementClass>;
  questions: Array<QuestionClass>;
  newQuestions: Array<Scalars['String']>;
};

export type StatementsFromQuestionOptions = {
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  avoidPage?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
  createUser: Scalars['String'];
  newPage: PageClass;
  createParagraphEditProposal: ParagraphEditProposalClass;
};


export type MutationLoginArgs = {
  data: LoginData;
};


export type MutationCreateUserArgs = {
  data: CreateUserData;
};


export type MutationNewPageArgs = {
  data: NewPageData;
};


export type MutationCreateParagraphEditProposalArgs = {
  data: ParagraphEditProposalData;
};

export type LoginData = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserData = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  confirmationPassword?: Maybe<Scalars['String']>;
};

export type NewPageData = {
  title: Scalars['String'];
  paragraph: NewPageParagraphData;
};

export type NewPageParagraphData = {
  statements: Array<NewStatementData>;
};

export type NewStatementData = {
  stringArray: Array<StringArrayData>;
  questions: Array<Scalars['ID']>;
  newQuestions: Array<Scalars['String']>;
  quotedStatement?: Maybe<Scalars['ID']>;
};

export type StringArrayData = {
  string?: Maybe<Scalars['String']>;
  styles: Array<StringArrayStyleData>;
};

export type StringArrayStyleData = {
  type: Scalars['String'];
  variant?: Maybe<Scalars['String']>;
  value?: Maybe<StyleValueData>;
};

export type StyleValueData = {
  url?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
  statement?: Maybe<Scalars['String']>;
  variable?: Maybe<Scalars['String']>;
  image?: Maybe<StyleValueImageData>;
};

export type StyleValueImageData = {
  sourceUrl?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};


export type ParagraphEditProposalData = {
  paragraph: Scalars['String'];
  description: Scalars['String'];
  statementItems: Array<ParagraphEditProposalStatementData>;
};

export type ParagraphEditProposalStatementData = {
  changeType: Scalars['String'];
  paragraphStatement?: Maybe<ParagraphStatementData>;
  questions?: Maybe<Array<Scalars['String']>>;
  newQuestions?: Maybe<Array<Scalars['String']>>;
  quotedStatement?: Maybe<Scalars['ID']>;
  stringArray?: Maybe<Array<StringArrayData>>;
};

export type ParagraphStatementData = {
  statement: Scalars['String'];
  versionIndex: Scalars['Float'];
};

export type DisplayParagraphSnippetFragment = (
  { __typename?: 'ParagraphClass' }
  & Pick<ParagraphClass, '_id'>
  & { statements: Array<(
    { __typename?: 'ParagraphStatementClass' }
    & FullParagraphStatementSnippetFragment
  )>, page: (
    { __typename?: 'PageClass' }
    & Pick<PageClass, '_id'>
  ), editProposals: Array<(
    { __typename?: 'ParagraphEditProposalClass' }
    & Pick<ParagraphEditProposalClass, '_id'>
  )> }
);

export type DisplayStatementSnippetFragment = (
  { __typename?: 'StatementClass' }
  & Pick<StatementClass, '_id'>
  & { versions: Array<(
    { __typename?: 'StatementVersionClass' }
    & { stringArray: Array<(
      { __typename?: 'StringArrayClass' }
      & FullStringArraySnippetFragment
    )>, quotedStatement?: Maybe<(
      { __typename?: 'StatementClass' }
      & Pick<StatementClass, '_id'>
    )>, questions: Array<(
      { __typename?: 'QuestionClass' }
      & Pick<QuestionClass, '_id' | 'question'>
    )>, sourceEditProposal?: Maybe<(
      { __typename?: 'ParagraphEditProposalClass' }
      & Pick<ParagraphEditProposalClass, '_id'>
    )> }
  )> }
);

export type DisplayStyleSnippetFragment = (
  { __typename?: 'StatementStyleClass' }
  & Pick<StatementStyleClass, 'type' | 'variant'>
  & { value: (
    { __typename?: 'StatementValueClass' }
    & Pick<StatementValueClass, 'url'>
    & { page?: Maybe<(
      { __typename?: 'PageClass' }
      & Pick<PageClass, '_id' | 'slug' | 'title'>
    )>, statement?: Maybe<(
      { __typename?: 'StatementClass' }
      & Pick<StatementClass, '_id'>
    )>, variable?: Maybe<(
      { __typename?: 'VariableClass' }
      & Pick<VariableClass, '_id' | 'title' | 'finalValue'>
    )>, image?: Maybe<(
      { __typename?: 'StatementImageClass' }
      & ImageSnippetFragment
    )> }
  ) }
);

export type DisplayUserSnippetFragmentFragment = (
  { __typename?: 'UserClass' }
  & Pick<UserClass, 'firstName' | 'lastName' | 'middleName' | 'verified'>
);

export type FullParagraphEditProposalSnippetFragment = (
  { __typename?: 'ParagraphEditProposalClass' }
  & { statementItems: Array<(
    { __typename?: 'ParagraphEditProposalStatementClass' }
    & ParagraphEditProposalStatementSnippetFragment
  )> }
  & PreviewParagraphEditProposalSnippetFragment
);

export type FullParagraphStatementSnippetFragment = (
  { __typename?: 'ParagraphStatementClass' }
  & Pick<ParagraphStatementClass, 'versionIndex'>
  & { statement: (
    { __typename?: 'StatementClass' }
    & DisplayStatementSnippetFragment
  ) }
);

export type FullStringArraySnippetFragment = (
  { __typename?: 'StringArrayClass' }
  & Pick<StringArrayClass, 'string'>
  & { styles: Array<(
    { __typename?: 'StatementStyleClass' }
    & DisplayStyleSnippetFragment
  )> }
);

export type FullUserSnippetFragment = (
  { __typename?: 'UserClass' }
  & Pick<UserClass, '_id' | 'firstName' | 'middleName' | 'lastName' | 'verified' | 'createdAt'>
);

export type ImageSnippetFragment = (
  { __typename?: 'StatementImageClass' }
  & Pick<StatementImageClass, 'sourceUrl' | 'caption'>
  & { file: (
    { __typename?: 'FileClass' }
    & Pick<FileClass, '_id' | 'buffer' | 'mimetype'>
  ) }
);

export type LinkFormPageSnippetFragment = (
  { __typename?: 'PageClass' }
  & Pick<PageClass, '_id' | 'title' | 'slug'>
);

export type PageCardSnippetFragment = (
  { __typename?: 'PageClass' }
  & Pick<PageClass, '_id' | 'title' | 'slug' | 'referencedCount'>
  & { currentParagraph: (
    { __typename?: 'ParagraphClass' }
    & DisplayParagraphSnippetFragment
  ) }
);

export type PageSnippetFragment = (
  { __typename?: 'PageClass' }
  & Pick<PageClass, '_id' | 'title' | 'slug'>
  & { currentParagraph: (
    { __typename?: 'ParagraphClass' }
    & DisplayParagraphSnippetFragment
  ), relatedPages: Array<(
    { __typename?: 'PageClass' }
    & PageCardSnippetFragment
  )> }
);

export type ParagraphEditProposalStatementSnippetFragment = (
  { __typename?: 'ParagraphEditProposalStatementClass' }
  & Pick<ParagraphEditProposalStatementClass, '_id' | 'changeType' | 'newQuestions'>
  & { paragraphStatement?: Maybe<(
    { __typename?: 'ParagraphStatementClass' }
    & FullParagraphStatementSnippetFragment
  )>, stringArray: Array<(
    { __typename?: 'StringArrayClass' }
    & FullStringArraySnippetFragment
  )>, quotedStatement?: Maybe<(
    { __typename?: 'StatementClass' }
    & Pick<StatementClass, '_id'>
  )>, questions: Array<(
    { __typename?: 'QuestionClass' }
    & Pick<QuestionClass, '_id' | 'question'>
  )> }
);

export type PreviewParagraphEditProposalSnippetFragment = (
  { __typename?: 'ParagraphEditProposalClass' }
  & Pick<ParagraphEditProposalClass, '_id' | 'description' | 'createdAt'>
  & { author: (
    { __typename?: 'UserClass' }
    & Pick<UserClass, '_id' | 'firstName' | 'lastName'>
  ), paragraph: (
    { __typename?: 'ParagraphClass' }
    & { page: (
      { __typename?: 'PageClass' }
      & Pick<PageClass, 'slug'>
    ) }
  ) }
);

export type QuestionCardSnippetFragment = (
  { __typename?: 'QuestionClass' }
  & Pick<QuestionClass, '_id' | 'question' | 'referencedCount'>
);

export type QuestionSearchSnippetFragment = (
  { __typename?: 'QuestionClass' }
  & Pick<QuestionClass, '_id' | 'question'>
);

export type QuestionSnippetFragment = (
  { __typename?: 'QuestionClass' }
  & Pick<QuestionClass, '_id' | 'question' | 'referencedCount'>
  & { relatedPages: Array<(
    { __typename?: 'PageClass' }
    & PageCardSnippetFragment
  )> }
);

export type VariableSearchSnippetFragment = (
  { __typename?: 'VariableClass' }
  & Pick<VariableClass, '_id' | 'title' | 'finalValue'>
);

export type VariableSnippetFragment = (
  { __typename?: 'VariableClass' }
  & Pick<VariableClass, '_id' | 'title'>
  & { versions: Array<(
    { __typename?: 'VariableVersionClass' }
    & Pick<VariableVersionClass, 'finalValue' | 'createdAt' | 'sourceUrl'>
  )>, relatedPages: Array<(
    { __typename?: 'PageClass' }
    & PageCardSnippetFragment
  )> }
);

export type CreateParagraphEditProposalMutationVariables = Exact<{
  data: ParagraphEditProposalData;
}>;


export type CreateParagraphEditProposalMutation = (
  { __typename?: 'Mutation' }
  & { createParagraphEditProposal: (
    { __typename?: 'ParagraphEditProposalClass' }
    & FullParagraphEditProposalSnippetFragment
  ) }
);

export type CreateUserMutationVariables = Exact<{
  data: CreateUserData;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export type NewPageMutationVariables = Exact<{
  data: NewPageData;
}>;


export type NewPageMutation = (
  { __typename?: 'Mutation' }
  & { newPage: (
    { __typename?: 'PageClass' }
    & Pick<PageClass, 'slug'>
  ) }
);

export type UserLoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type UserLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'UserClass' }
    & FullUserSnippetFragment
  ) }
);

export type FullParagraphEditProposalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FullParagraphEditProposalQuery = (
  { __typename?: 'Query' }
  & { paragraphEditProposal: (
    { __typename?: 'ParagraphEditProposalClass' }
    & FullParagraphEditProposalSnippetFragment
  ) }
);

export type LinkFormPageSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type LinkFormPageSearchQuery = (
  { __typename?: 'Query' }
  & { searchPages: Array<(
    { __typename?: 'PageClass' }
    & LinkFormPageSnippetFragment
  )> }
);

export type PageQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
}>;


export type PageQuery = (
  { __typename?: 'Query' }
  & { page?: Maybe<(
    { __typename?: 'PageClass' }
    & PageSnippetFragment
  )> }
);

export type PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQuery = (
  { __typename?: 'Query' }
  & { pages: Array<(
    { __typename?: 'PageClass' }
    & PageCardSnippetFragment
  )> }
);

export type PreviewParagraphEditProposalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PreviewParagraphEditProposalQuery = (
  { __typename?: 'Query' }
  & { paragraphEditProposal: (
    { __typename?: 'ParagraphEditProposalClass' }
    & PreviewParagraphEditProposalSnippetFragment
  ) }
);

export type QuestionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuestionQuery = (
  { __typename?: 'Query' }
  & { question?: Maybe<(
    { __typename?: 'QuestionClass' }
    & QuestionSnippetFragment
  )> }
);

export type QuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { questions: Array<(
    { __typename?: 'QuestionClass' }
    & QuestionCardSnippetFragment
  )> }
);

export type SearchQuestionsQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type SearchQuestionsQuery = (
  { __typename?: 'Query' }
  & { searchQuestions: Array<(
    { __typename?: 'QuestionClass' }
    & QuestionSearchSnippetFragment
  )> }
);

export type SearchVariablesQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type SearchVariablesQuery = (
  { __typename?: 'Query' }
  & { searchVariables: Array<(
    { __typename?: 'VariableClass' }
    & VariableSearchSnippetFragment
  )> }
);

export type StatementQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StatementQuery = (
  { __typename?: 'Query' }
  & { statement?: Maybe<(
    { __typename?: 'StatementClass' }
    & { page: (
      { __typename?: 'PageClass' }
      & Pick<PageClass, 'slug' | 'title'>
    ) }
    & DisplayStatementSnippetFragment
  )> }
);

export type StatementsFromQuestionQueryVariables = Exact<{
  questionId: Scalars['ID'];
  options?: Maybe<StatementsFromQuestionOptions>;
}>;


export type StatementsFromQuestionQuery = (
  { __typename?: 'Query' }
  & { statementsFromQuestion: Array<(
    { __typename?: 'StatementClass' }
    & { page: (
      { __typename?: 'PageClass' }
      & Pick<PageClass, 'title' | 'slug' | '_id'>
    ) }
    & DisplayStatementSnippetFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserClass' }
    & DisplayUserSnippetFragmentFragment
  ) }
);

export type VariableQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VariableQuery = (
  { __typename?: 'Query' }
  & { variable?: Maybe<(
    { __typename?: 'VariableClass' }
    & VariableSnippetFragment
  )> }
);

export const DisplayUserSnippetFragmentFragmentDoc = gql`
    fragment DisplayUserSnippetFragment on UserClass {
  firstName
  lastName
  middleName
  verified
}
    `;
export const PreviewParagraphEditProposalSnippetFragmentDoc = gql`
    fragment PreviewParagraphEditProposalSnippet on ParagraphEditProposalClass {
  _id
  author {
    _id
    firstName
    lastName
  }
  description
  createdAt
  paragraph {
    page {
      slug
    }
  }
}
    `;
export const ImageSnippetFragmentDoc = gql`
    fragment ImageSnippet on StatementImageClass {
  file {
    _id
    buffer
    mimetype
  }
  sourceUrl
  caption
}
    `;
export const DisplayStyleSnippetFragmentDoc = gql`
    fragment DisplayStyleSnippet on StatementStyleClass {
  type
  variant
  value {
    url
    page {
      _id
      slug
      title
    }
    statement {
      _id
    }
    variable {
      _id
      title
      finalValue
    }
    image {
      ...ImageSnippet
    }
  }
}
    ${ImageSnippetFragmentDoc}`;
export const FullStringArraySnippetFragmentDoc = gql`
    fragment FullStringArraySnippet on StringArrayClass {
  string
  styles {
    ...DisplayStyleSnippet
  }
}
    ${DisplayStyleSnippetFragmentDoc}`;
export const DisplayStatementSnippetFragmentDoc = gql`
    fragment DisplayStatementSnippet on StatementClass {
  _id
  versions {
    stringArray {
      ...FullStringArraySnippet
    }
    quotedStatement {
      _id
    }
    questions {
      _id
      question
    }
    sourceEditProposal {
      _id
    }
  }
}
    ${FullStringArraySnippetFragmentDoc}`;
export const FullParagraphStatementSnippetFragmentDoc = gql`
    fragment FullParagraphStatementSnippet on ParagraphStatementClass {
  versionIndex
  statement {
    ...DisplayStatementSnippet
  }
}
    ${DisplayStatementSnippetFragmentDoc}`;
export const ParagraphEditProposalStatementSnippetFragmentDoc = gql`
    fragment ParagraphEditProposalStatementSnippet on ParagraphEditProposalStatementClass {
  _id
  changeType
  paragraphStatement {
    ...FullParagraphStatementSnippet
  }
  stringArray {
    ...FullStringArraySnippet
  }
  quotedStatement {
    _id
  }
  questions {
    _id
    question
  }
  newQuestions
}
    ${FullParagraphStatementSnippetFragmentDoc}
${FullStringArraySnippetFragmentDoc}`;
export const FullParagraphEditProposalSnippetFragmentDoc = gql`
    fragment FullParagraphEditProposalSnippet on ParagraphEditProposalClass {
  ...PreviewParagraphEditProposalSnippet
  statementItems {
    ...ParagraphEditProposalStatementSnippet
  }
}
    ${PreviewParagraphEditProposalSnippetFragmentDoc}
${ParagraphEditProposalStatementSnippetFragmentDoc}`;
export const FullUserSnippetFragmentDoc = gql`
    fragment FullUserSnippet on UserClass {
  _id
  firstName
  middleName
  lastName
  verified
  createdAt
}
    `;
export const LinkFormPageSnippetFragmentDoc = gql`
    fragment LinkFormPageSnippet on PageClass {
  _id
  title
  slug
}
    `;
export const DisplayParagraphSnippetFragmentDoc = gql`
    fragment DisplayParagraphSnippet on ParagraphClass {
  _id
  statements {
    ...FullParagraphStatementSnippet
  }
  page {
    _id
  }
  editProposals {
    _id
  }
}
    ${FullParagraphStatementSnippetFragmentDoc}`;
export const PageCardSnippetFragmentDoc = gql`
    fragment PageCardSnippet on PageClass {
  _id
  title
  slug
  referencedCount
  currentParagraph {
    ...DisplayParagraphSnippet
  }
}
    ${DisplayParagraphSnippetFragmentDoc}`;
export const PageSnippetFragmentDoc = gql`
    fragment PageSnippet on PageClass {
  _id
  title
  slug
  currentParagraph {
    ...DisplayParagraphSnippet
  }
  relatedPages {
    ...PageCardSnippet
  }
}
    ${DisplayParagraphSnippetFragmentDoc}
${PageCardSnippetFragmentDoc}`;
export const QuestionCardSnippetFragmentDoc = gql`
    fragment QuestionCardSnippet on QuestionClass {
  _id
  question
  referencedCount
}
    `;
export const QuestionSearchSnippetFragmentDoc = gql`
    fragment QuestionSearchSnippet on QuestionClass {
  _id
  question
}
    `;
export const QuestionSnippetFragmentDoc = gql`
    fragment QuestionSnippet on QuestionClass {
  _id
  question
  relatedPages {
    ...PageCardSnippet
  }
  referencedCount
}
    ${PageCardSnippetFragmentDoc}`;
export const VariableSearchSnippetFragmentDoc = gql`
    fragment VariableSearchSnippet on VariableClass {
  _id
  title
  finalValue
}
    `;
export const VariableSnippetFragmentDoc = gql`
    fragment VariableSnippet on VariableClass {
  _id
  title
  versions {
    finalValue
    createdAt
    sourceUrl
    finalValue
  }
  relatedPages {
    ...PageCardSnippet
  }
}
    ${PageCardSnippetFragmentDoc}`;
export const CreateParagraphEditProposalDocument = gql`
    mutation CreateParagraphEditProposal($data: ParagraphEditProposalData!) {
  createParagraphEditProposal(data: $data) {
    ...FullParagraphEditProposalSnippet
  }
}
    ${FullParagraphEditProposalSnippetFragmentDoc}`;
export type CreateParagraphEditProposalMutationFn = Apollo.MutationFunction<CreateParagraphEditProposalMutation, CreateParagraphEditProposalMutationVariables>;

/**
 * __useCreateParagraphEditProposalMutation__
 *
 * To run a mutation, you first call `useCreateParagraphEditProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParagraphEditProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParagraphEditProposalMutation, { data, loading, error }] = useCreateParagraphEditProposalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateParagraphEditProposalMutation(baseOptions?: Apollo.MutationHookOptions<CreateParagraphEditProposalMutation, CreateParagraphEditProposalMutationVariables>) {
        return Apollo.useMutation<CreateParagraphEditProposalMutation, CreateParagraphEditProposalMutationVariables>(CreateParagraphEditProposalDocument, baseOptions);
      }
export type CreateParagraphEditProposalMutationHookResult = ReturnType<typeof useCreateParagraphEditProposalMutation>;
export type CreateParagraphEditProposalMutationResult = Apollo.MutationResult<CreateParagraphEditProposalMutation>;
export type CreateParagraphEditProposalMutationOptions = Apollo.BaseMutationOptions<CreateParagraphEditProposalMutation, CreateParagraphEditProposalMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserData!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const NewPageDocument = gql`
    mutation NewPage($data: NewPageData!) {
  newPage(data: $data) {
    slug
  }
}
    `;
export type NewPageMutationFn = Apollo.MutationFunction<NewPageMutation, NewPageMutationVariables>;

/**
 * __useNewPageMutation__
 *
 * To run a mutation, you first call `useNewPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPageMutation, { data, loading, error }] = useNewPageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPageMutation(baseOptions?: Apollo.MutationHookOptions<NewPageMutation, NewPageMutationVariables>) {
        return Apollo.useMutation<NewPageMutation, NewPageMutationVariables>(NewPageDocument, baseOptions);
      }
export type NewPageMutationHookResult = ReturnType<typeof useNewPageMutation>;
export type NewPageMutationResult = Apollo.MutationResult<NewPageMutation>;
export type NewPageMutationOptions = Apollo.BaseMutationOptions<NewPageMutation, NewPageMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($data: LoginData!) {
  login(data: $data)
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, baseOptions);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...FullUserSnippet
  }
}
    ${FullUserSnippetFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const FullParagraphEditProposalDocument = gql`
    query FullParagraphEditProposal($id: String!) {
  paragraphEditProposal(id: $id) {
    ...FullParagraphEditProposalSnippet
  }
}
    ${FullParagraphEditProposalSnippetFragmentDoc}`;

/**
 * __useFullParagraphEditProposalQuery__
 *
 * To run a query within a React component, call `useFullParagraphEditProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullParagraphEditProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullParagraphEditProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFullParagraphEditProposalQuery(baseOptions: Apollo.QueryHookOptions<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>) {
        return Apollo.useQuery<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>(FullParagraphEditProposalDocument, baseOptions);
      }
export function useFullParagraphEditProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>) {
          return Apollo.useLazyQuery<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>(FullParagraphEditProposalDocument, baseOptions);
        }
export type FullParagraphEditProposalQueryHookResult = ReturnType<typeof useFullParagraphEditProposalQuery>;
export type FullParagraphEditProposalLazyQueryHookResult = ReturnType<typeof useFullParagraphEditProposalLazyQuery>;
export type FullParagraphEditProposalQueryResult = Apollo.QueryResult<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>;
export const LinkFormPageSearchDocument = gql`
    query LinkFormPageSearch($searchString: String!) {
  searchPages(searchString: $searchString) {
    ...LinkFormPageSnippet
  }
}
    ${LinkFormPageSnippetFragmentDoc}`;

/**
 * __useLinkFormPageSearchQuery__
 *
 * To run a query within a React component, call `useLinkFormPageSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkFormPageSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkFormPageSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useLinkFormPageSearchQuery(baseOptions: Apollo.QueryHookOptions<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>) {
        return Apollo.useQuery<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>(LinkFormPageSearchDocument, baseOptions);
      }
export function useLinkFormPageSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>) {
          return Apollo.useLazyQuery<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>(LinkFormPageSearchDocument, baseOptions);
        }
export type LinkFormPageSearchQueryHookResult = ReturnType<typeof useLinkFormPageSearchQuery>;
export type LinkFormPageSearchLazyQueryHookResult = ReturnType<typeof useLinkFormPageSearchLazyQuery>;
export type LinkFormPageSearchQueryResult = Apollo.QueryResult<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>;
export const PageDocument = gql`
    query Page($slug: String, $id: ID) {
  page(slug: $slug, id: $id) {
    ...PageSnippet
  }
}
    ${PageSnippetFragmentDoc}`;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageQuery(baseOptions?: Apollo.QueryHookOptions<PageQuery, PageQueryVariables>) {
        return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, baseOptions);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
          return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, baseOptions);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PagesDocument = gql`
    query Pages {
  pages {
    ...PageCardSnippet
  }
}
    ${PageCardSnippetFragmentDoc}`;

/**
 * __usePagesQuery__
 *
 * To run a query within a React component, call `usePagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePagesQuery(baseOptions?: Apollo.QueryHookOptions<PagesQuery, PagesQueryVariables>) {
        return Apollo.useQuery<PagesQuery, PagesQueryVariables>(PagesDocument, baseOptions);
      }
export function usePagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PagesQuery, PagesQueryVariables>) {
          return Apollo.useLazyQuery<PagesQuery, PagesQueryVariables>(PagesDocument, baseOptions);
        }
export type PagesQueryHookResult = ReturnType<typeof usePagesQuery>;
export type PagesLazyQueryHookResult = ReturnType<typeof usePagesLazyQuery>;
export type PagesQueryResult = Apollo.QueryResult<PagesQuery, PagesQueryVariables>;
export const PreviewParagraphEditProposalDocument = gql`
    query PreviewParagraphEditProposal($id: String!) {
  paragraphEditProposal(id: $id) {
    ...PreviewParagraphEditProposalSnippet
  }
}
    ${PreviewParagraphEditProposalSnippetFragmentDoc}`;

/**
 * __usePreviewParagraphEditProposalQuery__
 *
 * To run a query within a React component, call `usePreviewParagraphEditProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewParagraphEditProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewParagraphEditProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePreviewParagraphEditProposalQuery(baseOptions: Apollo.QueryHookOptions<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>) {
        return Apollo.useQuery<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>(PreviewParagraphEditProposalDocument, baseOptions);
      }
export function usePreviewParagraphEditProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>) {
          return Apollo.useLazyQuery<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>(PreviewParagraphEditProposalDocument, baseOptions);
        }
export type PreviewParagraphEditProposalQueryHookResult = ReturnType<typeof usePreviewParagraphEditProposalQuery>;
export type PreviewParagraphEditProposalLazyQueryHookResult = ReturnType<typeof usePreviewParagraphEditProposalLazyQuery>;
export type PreviewParagraphEditProposalQueryResult = Apollo.QueryResult<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>;
export const QuestionDocument = gql`
    query Question($id: ID!) {
  question(id: $id) {
    ...QuestionSnippet
  }
}
    ${QuestionSnippetFragmentDoc}`;

/**
 * __useQuestionQuery__
 *
 * To run a query within a React component, call `useQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuestionQuery(baseOptions: Apollo.QueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
        return Apollo.useQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, baseOptions);
      }
export function useQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
          return Apollo.useLazyQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, baseOptions);
        }
export type QuestionQueryHookResult = ReturnType<typeof useQuestionQuery>;
export type QuestionLazyQueryHookResult = ReturnType<typeof useQuestionLazyQuery>;
export type QuestionQueryResult = Apollo.QueryResult<QuestionQuery, QuestionQueryVariables>;
export const QuestionsDocument = gql`
    query Questions {
  questions {
    ...QuestionCardSnippet
  }
}
    ${QuestionCardSnippetFragmentDoc}`;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const SearchQuestionsDocument = gql`
    query SearchQuestions($searchString: String!) {
  searchQuestions(searchString: $searchString) {
    ...QuestionSearchSnippet
  }
}
    ${QuestionSearchSnippetFragmentDoc}`;

/**
 * __useSearchQuestionsQuery__
 *
 * To run a query within a React component, call `useSearchQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuestionsQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useSearchQuestionsQuery(baseOptions: Apollo.QueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
        return Apollo.useQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, baseOptions);
      }
export function useSearchQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
          return Apollo.useLazyQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, baseOptions);
        }
export type SearchQuestionsQueryHookResult = ReturnType<typeof useSearchQuestionsQuery>;
export type SearchQuestionsLazyQueryHookResult = ReturnType<typeof useSearchQuestionsLazyQuery>;
export type SearchQuestionsQueryResult = Apollo.QueryResult<SearchQuestionsQuery, SearchQuestionsQueryVariables>;
export const SearchVariablesDocument = gql`
    query SearchVariables($searchString: String!) {
  searchVariables(searchString: $searchString) {
    ...VariableSearchSnippet
  }
}
    ${VariableSearchSnippetFragmentDoc}`;

/**
 * __useSearchVariablesQuery__
 *
 * To run a query within a React component, call `useSearchVariablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVariablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVariablesQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useSearchVariablesQuery(baseOptions: Apollo.QueryHookOptions<SearchVariablesQuery, SearchVariablesQueryVariables>) {
        return Apollo.useQuery<SearchVariablesQuery, SearchVariablesQueryVariables>(SearchVariablesDocument, baseOptions);
      }
export function useSearchVariablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVariablesQuery, SearchVariablesQueryVariables>) {
          return Apollo.useLazyQuery<SearchVariablesQuery, SearchVariablesQueryVariables>(SearchVariablesDocument, baseOptions);
        }
export type SearchVariablesQueryHookResult = ReturnType<typeof useSearchVariablesQuery>;
export type SearchVariablesLazyQueryHookResult = ReturnType<typeof useSearchVariablesLazyQuery>;
export type SearchVariablesQueryResult = Apollo.QueryResult<SearchVariablesQuery, SearchVariablesQueryVariables>;
export const StatementDocument = gql`
    query Statement($id: ID!) {
  statement(id: $id) {
    ...DisplayStatementSnippet
    page {
      slug
      title
    }
  }
}
    ${DisplayStatementSnippetFragmentDoc}`;

/**
 * __useStatementQuery__
 *
 * To run a query within a React component, call `useStatementQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatementQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStatementQuery(baseOptions: Apollo.QueryHookOptions<StatementQuery, StatementQueryVariables>) {
        return Apollo.useQuery<StatementQuery, StatementQueryVariables>(StatementDocument, baseOptions);
      }
export function useStatementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatementQuery, StatementQueryVariables>) {
          return Apollo.useLazyQuery<StatementQuery, StatementQueryVariables>(StatementDocument, baseOptions);
        }
export type StatementQueryHookResult = ReturnType<typeof useStatementQuery>;
export type StatementLazyQueryHookResult = ReturnType<typeof useStatementLazyQuery>;
export type StatementQueryResult = Apollo.QueryResult<StatementQuery, StatementQueryVariables>;
export const StatementsFromQuestionDocument = gql`
    query StatementsFromQuestion($questionId: ID!, $options: StatementsFromQuestionOptions) {
  statementsFromQuestion(questionId: $questionId, options: $options) {
    ...DisplayStatementSnippet
    page {
      title
      slug
      _id
    }
  }
}
    ${DisplayStatementSnippetFragmentDoc}`;

/**
 * __useStatementsFromQuestionQuery__
 *
 * To run a query within a React component, call `useStatementsFromQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatementsFromQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatementsFromQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useStatementsFromQuestionQuery(baseOptions: Apollo.QueryHookOptions<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>) {
        return Apollo.useQuery<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>(StatementsFromQuestionDocument, baseOptions);
      }
export function useStatementsFromQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>) {
          return Apollo.useLazyQuery<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>(StatementsFromQuestionDocument, baseOptions);
        }
export type StatementsFromQuestionQueryHookResult = ReturnType<typeof useStatementsFromQuestionQuery>;
export type StatementsFromQuestionLazyQueryHookResult = ReturnType<typeof useStatementsFromQuestionLazyQuery>;
export type StatementsFromQuestionQueryResult = Apollo.QueryResult<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...DisplayUserSnippetFragment
  }
}
    ${DisplayUserSnippetFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const VariableDocument = gql`
    query Variable($id: ID!) {
  variable(id: $id) {
    ...VariableSnippet
  }
}
    ${VariableSnippetFragmentDoc}`;

/**
 * __useVariableQuery__
 *
 * To run a query within a React component, call `useVariableQuery` and pass it any options that fit your needs.
 * When your component renders, `useVariableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVariableQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVariableQuery(baseOptions: Apollo.QueryHookOptions<VariableQuery, VariableQueryVariables>) {
        return Apollo.useQuery<VariableQuery, VariableQueryVariables>(VariableDocument, baseOptions);
      }
export function useVariableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VariableQuery, VariableQueryVariables>) {
          return Apollo.useLazyQuery<VariableQuery, VariableQueryVariables>(VariableDocument, baseOptions);
        }
export type VariableQueryHookResult = ReturnType<typeof useVariableQuery>;
export type VariableLazyQueryHookResult = ReturnType<typeof useVariableLazyQuery>;
export type VariableQueryResult = Apollo.QueryResult<VariableQuery, VariableQueryVariables>;