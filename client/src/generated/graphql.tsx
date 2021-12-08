import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type CreateUserData = {
  confirmationPassword?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type FileClass = {
  __typename?: 'FileClass';
  _id: Scalars['ID'];
  buffer: Scalars['String'];
  createdAt: Scalars['DateTime'];
  mimetype: Scalars['String'];
  schemaVersion: Scalars['Float'];
};

export type ListOptionData = {
  offset?: InputMaybe<Scalars['Float']>;
  pageLimit?: InputMaybe<Scalars['Float']>;
};

export type LoginData = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveParagraphEditProposal: PageClass;
  approveVariableEditProposal: VariableClass;
  createParagraphEditProposal: ParagraphEditProposalClass;
  createUser: Scalars['String'];
  login: Scalars['String'];
  newPage: PageClass;
  newVariable: VariableClass;
  newVariableEditProposal: VariableEditProposalClass;
  requestVerification: UserClass;
  scrapeTest: Scalars['String'];
};


export type MutationApproveParagraphEditProposalArgs = {
  id: Scalars['String'];
};


export type MutationApproveVariableEditProposalArgs = {
  id: Scalars['String'];
};


export type MutationCreateParagraphEditProposalArgs = {
  data: ParagraphEditProposalData;
};


export type MutationCreateUserArgs = {
  data: CreateUserData;
};


export type MutationLoginArgs = {
  data: LoginData;
};


export type MutationNewPageArgs = {
  data: NewPageData;
};


export type MutationNewVariableArgs = {
  data: NewVariableData;
};


export type MutationNewVariableEditProposalArgs = {
  data: NewVariableEditProposalData;
};


export type MutationScrapeTestArgs = {
  id: Scalars['String'];
  url: Scalars['String'];
};

export type NewPageData = {
  paragraph: NewPageParagraphData;
  title: Scalars['String'];
};

export type NewPageParagraphData = {
  statements: Array<NewStatementData>;
};

export type NewStatementData = {
  newQuestions: Array<Scalars['String']>;
  questions: Array<Scalars['ID']>;
  quotedStatement?: InputMaybe<Scalars['ID']>;
  stringArray: Array<StringArrayData>;
};

export type NewVariableData = {
  title: Scalars['String'];
  version: VariableVersionData;
};

export type NewVariableEditProposalData = {
  description: Scalars['String'];
  value: VariableVersionData;
  variable: Scalars['ID'];
};

export type PageClass = {
  __typename?: 'PageClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  currentParagraph: ParagraphClass;
  description: Scalars['String'];
  originalAuthor: UserClass;
  paragraphs: Array<ParagraphClass>;
  referencedCount: Scalars['Float'];
  relatedPages: Array<PageClass>;
  schemaVersion: Scalars['Float'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type ParagraphClass = {
  __typename?: 'ParagraphClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  editProposals: Array<ParagraphEditProposalClass>;
  mostRecent: Scalars['Boolean'];
  page: PageClass;
  schemaVersion: Scalars['Float'];
  sourceEditProposal?: Maybe<ParagraphEditProposalClass>;
  statements: Array<ParagraphStatementClass>;
};

export type ParagraphEditProposalClass = {
  __typename?: 'ParagraphEditProposalClass';
  _id: Scalars['ID'];
  author: UserClass;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  paragraph: ParagraphClass;
  schemaVersion: Scalars['Float'];
  statementItems: Array<ParagraphEditProposalStatementClass>;
};

export type ParagraphEditProposalData = {
  description: Scalars['String'];
  paragraph: Scalars['String'];
  statementItems: Array<ParagraphEditProposalStatementData>;
};

export type ParagraphEditProposalStatementClass = {
  __typename?: 'ParagraphEditProposalStatementClass';
  _id: Scalars['ID'];
  changeType: Scalars['String'];
  newQuestions: Array<Scalars['String']>;
  paragraphStatement?: Maybe<ParagraphStatementClass>;
  questions: Array<QuestionClass>;
  quotedStatement?: Maybe<StatementClass>;
  stringArray: Array<StringArrayClass>;
};

export type ParagraphEditProposalStatementData = {
  changeType: Scalars['String'];
  newQuestions?: InputMaybe<Array<Scalars['String']>>;
  paragraphStatement?: InputMaybe<ParagraphStatementData>;
  questions?: InputMaybe<Array<Scalars['String']>>;
  quotedStatement?: InputMaybe<Scalars['ID']>;
  stringArray?: InputMaybe<Array<StringArrayData>>;
};

export type ParagraphStatementClass = {
  __typename?: 'ParagraphStatementClass';
  statement: StatementClass;
  versionIndex: Scalars['Float'];
};

export type ParagraphStatementData = {
  statement: Scalars['String'];
  versionIndex: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: UserClass;
  page?: Maybe<PageClass>;
  pages: Array<PageClass>;
  paragraph: ParagraphClass;
  paragraphEditProposal: ParagraphEditProposalClass;
  question?: Maybe<QuestionClass>;
  questions: Array<QuestionClass>;
  searchPages: Array<PageClass>;
  searchQuestions: Array<QuestionClass>;
  searchVariables: Array<VariableClass>;
  statement?: Maybe<StatementClass>;
  statementsFromQuestion: Array<StatementClass>;
  user: UserClass;
  variable?: Maybe<VariableClass>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryPagesArgs = {
  options?: InputMaybe<ListOptionData>;
};


export type QueryParagraphArgs = {
  id: Scalars['String'];
};


export type QueryParagraphEditProposalArgs = {
  id: Scalars['String'];
};


export type QueryQuestionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryQuestionsArgs = {
  options?: InputMaybe<ListOptionData>;
};


export type QuerySearchPagesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  searchString: Scalars['String'];
};


export type QuerySearchQuestionsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  searchString: Scalars['String'];
};


export type QuerySearchVariablesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  searchString: Scalars['String'];
};


export type QueryStatementArgs = {
  id: Scalars['ID'];
};


export type QueryStatementsFromQuestionArgs = {
  options?: InputMaybe<StatementsFromQuestionOptions>;
  questionId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryVariableArgs = {
  id: Scalars['ID'];
};

export type QuestionClass = {
  __typename?: 'QuestionClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  question: Scalars['String'];
  referencedCount: Scalars['Float'];
  relatedPages: Array<PageClass>;
  schemaVersion: Scalars['Float'];
  slug: Scalars['String'];
};

export type StatementClass = {
  __typename?: 'StatementClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  current: Scalars['Boolean'];
  originalAuthor: UserClass;
  page: PageClass;
  schemaVersion: Scalars['Float'];
  versions: Array<StatementVersionClass>;
};

export type StatementImageClass = {
  __typename?: 'StatementImageClass';
  caption?: Maybe<Scalars['String']>;
  file: FileClass;
  sourceUrl?: Maybe<Scalars['String']>;
};

export type StatementsFromQuestionOptions = {
  avoidPage?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type StatementStyleClass = {
  __typename?: 'StatementStyleClass';
  type: Scalars['String'];
  value: StatementValueClass;
  variant?: Maybe<Scalars['String']>;
};

export type StatementValueClass = {
  __typename?: 'StatementValueClass';
  image?: Maybe<StatementImageClass>;
  page?: Maybe<PageClass>;
  statement?: Maybe<StatementClass>;
  url?: Maybe<Scalars['String']>;
  variable?: Maybe<VariableClass>;
};

export type StatementVersionClass = {
  __typename?: 'StatementVersionClass';
  createdAt: Scalars['DateTime'];
  questions: Array<QuestionClass>;
  quotedStatement?: Maybe<StatementClass>;
  sourceEditProposal?: Maybe<ParagraphEditProposalClass>;
  stringArray: Array<StringArrayClass>;
};

export type StringArrayClass = {
  __typename?: 'StringArrayClass';
  string?: Maybe<Scalars['String']>;
  styles: Array<StatementStyleClass>;
};

export type StringArrayData = {
  string?: InputMaybe<Scalars['String']>;
  styles: Array<StringArrayStyleData>;
};

export type StringArrayStyleData = {
  type: Scalars['String'];
  value?: InputMaybe<StyleValueData>;
  variant?: InputMaybe<Scalars['String']>;
};

export type StyleValueData = {
  image?: InputMaybe<StyleValueImageData>;
  page?: InputMaybe<Scalars['String']>;
  statement?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  variable?: InputMaybe<Scalars['String']>;
};

export type StyleValueImageData = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  sourceUrl?: InputMaybe<Scalars['String']>;
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['ID'];
  admin: Scalars['Boolean'];
  authoredPages: Array<PageClass>;
  authoredParagraphEditProposals: Array<ParagraphEditProposalClass>;
  authoredVariableEditProposals: Array<VariableEditProposalClass>;
  authoredVariables: Array<VariableClass>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  schemaVersion: Scalars['Float'];
  verificationRequested?: Maybe<UserVerificationRequestClass>;
  verified: Scalars['Boolean'];
};

export type UserVerificationRequestClass = {
  __typename?: 'UserVerificationRequestClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  schemaVersion: Scalars['Float'];
  user: UserClass;
};

export type VariableClass = {
  __typename?: 'VariableClass';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  editProposals: Array<VariableEditProposalClass>;
  finalValue: Scalars['Float'];
  originalAuthor: UserClass;
  relatedPages: Array<PageClass>;
  schemaVersion: Scalars['Float'];
  title: Scalars['String'];
  versions: Array<VariableVersionClass>;
};

export type VariableEditProposalClass = {
  __typename?: 'VariableEditProposalClass';
  _id: Scalars['ID'];
  author: UserClass;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  finalValue: Scalars['Float'];
  schemaVersion: Scalars['Float'];
  value: Version;
  variable: VariableClass;
  variableVersionIndex: Scalars['Float'];
};

export type VariableEquationClass = {
  __typename?: 'VariableEquationClass';
  number?: Maybe<Scalars['Float']>;
  operator?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  variable?: Maybe<VariableClass>;
};

export type VariableEquationItemData = {
  number?: InputMaybe<Scalars['Float']>;
  operator?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  variable?: InputMaybe<Scalars['ID']>;
};

export type VariableVersionClass = {
  __typename?: 'VariableVersionClass';
  createdAt: Scalars['DateTime'];
  equation: Array<VariableEquationClass>;
  finalValue: Scalars['Float'];
  number?: Maybe<Scalars['Float']>;
  sourceEditProposal?: Maybe<VariableEditProposalClass>;
  sourceUrl?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type VariableVersionData = {
  equation?: InputMaybe<Array<VariableEquationItemData>>;
  number?: InputMaybe<Scalars['Float']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  equation: Array<VariableEquationClass>;
  number?: Maybe<Scalars['Float']>;
  sourceUrl?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type DisplayParagraphSnippetFragment = { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined };

export type DisplayStatementSnippetFragment = { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> };

export type DisplayStyleSnippetFragment = { __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } };

export type DisplayUserSnippetFragmentFragment = { __typename?: 'UserClass', firstName: string, lastName: string, middleName?: string | null | undefined, verified: boolean };

export type FullParagraphEditProposalSnippetFragment = { __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, statementItems: Array<{ __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> }>, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } };

export type FullParagraphStatementSnippetFragment = { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } };

export type FullStringArraySnippetFragment = { __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> };

export type FullUserSnippetFragment = { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string, verified: boolean, createdAt: any, verificationRequested?: { __typename?: 'UserVerificationRequestClass', _id: string, createdAt: any } | null | undefined };

export type ImageSnippetFragment = { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } };

export type LinkFormPageSnippetFragment = { __typename?: 'PageClass', _id: string, title: string, slug: string };

export type PageCardSnippetFragment = { __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } };

export type PageSnippetFragment = { __typename?: 'PageClass', _id: string, title: string, slug: string, paragraphs: Array<{ __typename?: 'ParagraphClass', _id: string }>, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> };

export type ParagraphEditProposalStatementSnippetFragment = { __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> };

export type PreviewParagraphEditProposalSnippetFragment = { __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } };

export type QuestionCardSnippetFragment = { __typename?: 'QuestionClass', _id: string, slug: string, question: string, referencedCount: number };

export type QuestionSearchSnippetFragment = { __typename?: 'QuestionClass', _id: string, slug: string, question: string };

export type QuestionSnippetFragment = { __typename?: 'QuestionClass', _id: string, slug: string, question: string, referencedCount: number, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> };

export type RestSsrVariableSnippetFragment = { __typename?: 'VariableClass', _id: string, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }> };

export type SsrPageSnippetFragment = { __typename?: 'PageClass', _id: string, title: string, slug: string, description: string };

export type SsrQuestionSnippetFragment = { __typename?: 'QuestionClass', _id: string, slug: string, question: string };

export type SsrUserSnippetFragment = { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string, verified: boolean, createdAt: any, verificationRequested?: { __typename?: 'UserVerificationRequestClass', _id: string, createdAt: any } | null | undefined };

export type SsrVariableSnippetFragment = { __typename?: 'VariableClass', _id: string, title: string, finalValue: number, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } };

export type UserContributionsSnippetFragment = { __typename?: 'UserClass', authoredPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, authoredParagraphEditProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, statementItems: Array<{ __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> }>, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } }>, authoredVariables: Array<{ __typename?: 'VariableClass', _id: string, title: string, finalValue: number, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } }>, authoredVariableEditProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }> };

export type UserSnippetFragment = { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string };

export type VariableEditProposalSnippetFragment = { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } };

export type VariableSearchSnippetFragment = { __typename?: 'VariableClass', _id: string, title: string, finalValue: number };

export type VariableSnippetFragment = { __typename?: 'VariableClass', _id: string, title: string, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } };

export type ApproveParagraphEditProposalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApproveParagraphEditProposalMutation = { __typename?: 'Mutation', approveParagraphEditProposal: { __typename?: 'PageClass', _id: string, title: string, slug: string, paragraphs: Array<{ __typename?: 'ParagraphClass', _id: string }>, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> } };

export type ApproveVariableEditProposalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApproveVariableEditProposalMutation = { __typename?: 'Mutation', approveVariableEditProposal: { __typename?: 'VariableClass', _id: string, title: string, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } } };

export type CreateParagraphEditProposalMutationVariables = Exact<{
  data: ParagraphEditProposalData;
}>;


export type CreateParagraphEditProposalMutation = { __typename?: 'Mutation', createParagraphEditProposal: { __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, statementItems: Array<{ __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> }>, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserData;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };

export type NewPageMutationVariables = Exact<{
  data: NewPageData;
}>;


export type NewPageMutation = { __typename?: 'Mutation', newPage: { __typename?: 'PageClass', slug: string } };

export type NewVariableMutationVariables = Exact<{
  data: NewVariableData;
}>;


export type NewVariableMutation = { __typename?: 'Mutation', newVariable: { __typename?: 'VariableClass', _id: string, title: string, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } } };

export type NewVariableEditProposalMutationVariables = Exact<{
  data: NewVariableEditProposalData;
}>;


export type NewVariableEditProposalMutation = { __typename?: 'Mutation', newVariableEditProposal: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } };

export type RequestVerificationMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestVerificationMutation = { __typename?: 'Mutation', requestVerification: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string, verified: boolean, createdAt: any, verificationRequested?: { __typename?: 'UserVerificationRequestClass', _id: string, createdAt: any } | null | undefined } };

export type UserLoginMutationVariables = Exact<{
  data: LoginData;
}>;


export type UserLoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string, verified: boolean, createdAt: any, verificationRequested?: { __typename?: 'UserVerificationRequestClass', _id: string, createdAt: any } | null | undefined } };

export type FullParagraphEditProposalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FullParagraphEditProposalQuery = { __typename?: 'Query', paragraphEditProposal: { __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, statementItems: Array<{ __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> }>, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } } };

export type LinkFormPageSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type LinkFormPageSearchQuery = { __typename?: 'Query', searchPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string }> };

export type PageQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type PageQuery = { __typename?: 'Query', page?: { __typename?: 'PageClass', _id: string, title: string, slug: string, paragraphs: Array<{ __typename?: 'ParagraphClass', _id: string }>, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> } | null | undefined };

export type PagesQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type PagesQuery = { __typename?: 'Query', pages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> };

export type ParagraphQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ParagraphQuery = { __typename?: 'Query', paragraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } };

export type PreviewPageSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type PreviewPageSearchQuery = { __typename?: 'Query', searchPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> };

export type PreviewParagraphEditProposalQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PreviewParagraphEditProposalQuery = { __typename?: 'Query', paragraphEditProposal: { __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } } };

export type PreviewQuestionSearchQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type PreviewQuestionSearchQuery = { __typename?: 'Query', searchQuestions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string, referencedCount: number }> };

export type QuestionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type QuestionQuery = { __typename?: 'Query', question?: { __typename?: 'QuestionClass', _id: string, slug: string, question: string, referencedCount: number, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }> } | null | undefined };

export type QuestionsQueryVariables = Exact<{
  options?: InputMaybe<ListOptionData>;
}>;


export type QuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string, referencedCount: number }> };

export type RestSsrVariableQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RestSsrVariableQuery = { __typename?: 'Query', variable?: { __typename?: 'VariableClass', _id: string, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }> } | null | undefined };

export type SearchQuestionsQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type SearchQuestionsQuery = { __typename?: 'Query', searchQuestions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }> };

export type SearchVariablesQueryVariables = Exact<{
  searchString: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type SearchVariablesQuery = { __typename?: 'Query', searchVariables: Array<{ __typename?: 'VariableClass', _id: string, title: string, finalValue: number }> };

export type SsrPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type SsrPageQuery = { __typename?: 'Query', page?: { __typename?: 'PageClass', _id: string, title: string, slug: string, description: string } | null | undefined };

export type SsrQuestionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type SsrQuestionQuery = { __typename?: 'Query', question?: { __typename?: 'QuestionClass', _id: string, slug: string, question: string } | null | undefined };

export type SsrUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type SsrUserQuery = { __typename?: 'Query', user: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string, verified: boolean, createdAt: any, verificationRequested?: { __typename?: 'UserVerificationRequestClass', _id: string, createdAt: any } | null | undefined } };

export type SsrVariableQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SsrVariableQuery = { __typename?: 'Query', variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } } | null | undefined };

export type StatementQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StatementQuery = { __typename?: 'Query', statement?: { __typename?: 'StatementClass', _id: string, page: { __typename?: 'PageClass', slug: string, title: string }, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } | null | undefined };

export type StatementsFromQuestionQueryVariables = Exact<{
  questionId: Scalars['ID'];
  options?: InputMaybe<StatementsFromQuestionOptions>;
}>;


export type StatementsFromQuestionQuery = { __typename?: 'Query', statementsFromQuestion: Array<{ __typename?: 'StatementClass', _id: string, page: { __typename?: 'PageClass', title: string, slug: string, _id: string }, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> }> };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserClass', firstName: string, lastName: string, middleName?: string | null | undefined, verified: boolean } };

export type UserContributionsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserContributionsQuery = { __typename?: 'Query', user: { __typename?: 'UserClass', authoredPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, authoredParagraphEditProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string, description: string, createdAt: any, statementItems: Array<{ __typename?: 'ParagraphEditProposalStatementClass', _id: string, changeType: string, newQuestions: Array<string>, paragraphStatement?: { __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } } | null | undefined, stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, question: string }> }>, author: { __typename?: 'UserClass', _id: string, firstName: string, lastName: string }, paragraph: { __typename?: 'ParagraphClass', page: { __typename?: 'PageClass', _id: string, slug: string } } }>, authoredVariables: Array<{ __typename?: 'VariableClass', _id: string, title: string, finalValue: number, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } }>, authoredVariableEditProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }> } };

export type VariableQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VariableQuery = { __typename?: 'Query', variable?: { __typename?: 'VariableClass', _id: string, title: string, versions: Array<{ __typename?: 'VariableVersionClass', finalValue: number, createdAt: any, sourceUrl?: string | null | undefined, sourceEditProposal?: { __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } } | null | undefined }>, relatedPages: Array<{ __typename?: 'PageClass', _id: string, title: string, slug: string, referencedCount: number, currentParagraph: { __typename?: 'ParagraphClass', _id: string, statements: Array<{ __typename?: 'ParagraphStatementClass', versionIndex: number, statement: { __typename?: 'StatementClass', _id: string, versions: Array<{ __typename?: 'StatementVersionClass', stringArray: Array<{ __typename?: 'StringArrayClass', string?: string | null | undefined, styles: Array<{ __typename?: 'StatementStyleClass', type: string, variant?: string | null | undefined, value: { __typename?: 'StatementValueClass', url?: string | null | undefined, page?: { __typename?: 'PageClass', _id: string, slug: string, title: string } | null | undefined, statement?: { __typename?: 'StatementClass', _id: string } | null | undefined, variable?: { __typename?: 'VariableClass', _id: string, title: string, finalValue: number } | null | undefined, image?: { __typename?: 'StatementImageClass', sourceUrl?: string | null | undefined, caption?: string | null | undefined, file: { __typename?: 'FileClass', _id: string, buffer: string, mimetype: string } } | null | undefined } }> }>, quotedStatement?: { __typename?: 'StatementClass', _id: string } | null | undefined, questions: Array<{ __typename?: 'QuestionClass', _id: string, slug: string, question: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined }> } }>, page: { __typename?: 'PageClass', _id: string }, editProposals: Array<{ __typename?: 'ParagraphEditProposalClass', _id: string }>, sourceEditProposal?: { __typename?: 'ParagraphEditProposalClass', _id: string } | null | undefined } }>, editProposals: Array<{ __typename?: 'VariableEditProposalClass', _id: string, finalValue: number, description: string, author: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string }, value: { __typename?: 'Version', sourceUrl?: string | null | undefined } }>, originalAuthor: { __typename?: 'UserClass', _id: string, firstName: string, middleName?: string | null | undefined, lastName: string } } | null | undefined };

export const DisplayUserSnippetFragmentFragmentDoc = gql`
    fragment DisplayUserSnippetFragment on UserClass {
  firstName
  lastName
  middleName
  verified
}
    `;
export const FullUserSnippetFragmentDoc = gql`
    fragment FullUserSnippet on UserClass {
  _id
  firstName
  middleName
  lastName
  verified
  createdAt
  verificationRequested {
    _id
    createdAt
  }
}
    `;
export const LinkFormPageSnippetFragmentDoc = gql`
    fragment LinkFormPageSnippet on PageClass {
  _id
  title
  slug
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
      slug
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
  sourceEditProposal {
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
  paragraphs {
    _id
  }
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
  slug
  question
  referencedCount
}
    `;
export const QuestionSearchSnippetFragmentDoc = gql`
    fragment QuestionSearchSnippet on QuestionClass {
  _id
  slug
  question
}
    `;
export const QuestionSnippetFragmentDoc = gql`
    fragment QuestionSnippet on QuestionClass {
  _id
  slug
  question
  relatedPages {
    ...PageCardSnippet
  }
  referencedCount
}
    ${PageCardSnippetFragmentDoc}`;
export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on UserClass {
  _id
  firstName
  middleName
  lastName
}
    `;
export const VariableEditProposalSnippetFragmentDoc = gql`
    fragment VariableEditProposalSnippet on VariableEditProposalClass {
  _id
  author {
    ...UserSnippet
  }
  finalValue
  description
  value {
    sourceUrl
  }
}
    ${UserSnippetFragmentDoc}`;
export const RestSsrVariableSnippetFragmentDoc = gql`
    fragment RestSSRVariableSnippet on VariableClass {
  _id
  relatedPages {
    ...PageCardSnippet
  }
  editProposals {
    ...VariableEditProposalSnippet
  }
}
    ${PageCardSnippetFragmentDoc}
${VariableEditProposalSnippetFragmentDoc}`;
export const SsrPageSnippetFragmentDoc = gql`
    fragment SSRPageSnippet on PageClass {
  _id
  title
  slug
  description
}
    `;
export const SsrQuestionSnippetFragmentDoc = gql`
    fragment SSRQuestionSnippet on QuestionClass {
  _id
  slug
  question
}
    `;
export const SsrUserSnippetFragmentDoc = gql`
    fragment SSRUserSnippet on UserClass {
  _id
  firstName
  middleName
  lastName
  verified
  createdAt
  verificationRequested {
    _id
    createdAt
  }
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
      _id
      slug
    }
  }
}
    `;
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
export const SsrVariableSnippetFragmentDoc = gql`
    fragment SSRVariableSnippet on VariableClass {
  _id
  title
  finalValue
  versions {
    finalValue
    createdAt
    sourceUrl
    finalValue
    sourceEditProposal {
      ...VariableEditProposalSnippet
    }
  }
  originalAuthor {
    ...UserSnippet
  }
}
    ${VariableEditProposalSnippetFragmentDoc}
${UserSnippetFragmentDoc}`;
export const UserContributionsSnippetFragmentDoc = gql`
    fragment UserContributionsSnippet on UserClass {
  authoredPages {
    ...PageCardSnippet
  }
  authoredParagraphEditProposals {
    ...FullParagraphEditProposalSnippet
  }
  authoredVariables {
    ...SSRVariableSnippet
  }
  authoredVariableEditProposals {
    ...VariableEditProposalSnippet
  }
}
    ${PageCardSnippetFragmentDoc}
${FullParagraphEditProposalSnippetFragmentDoc}
${SsrVariableSnippetFragmentDoc}
${VariableEditProposalSnippetFragmentDoc}`;
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
    sourceEditProposal {
      ...VariableEditProposalSnippet
    }
  }
  relatedPages {
    ...PageCardSnippet
  }
  editProposals {
    ...VariableEditProposalSnippet
  }
  originalAuthor {
    ...UserSnippet
  }
}
    ${VariableEditProposalSnippetFragmentDoc}
${PageCardSnippetFragmentDoc}
${UserSnippetFragmentDoc}`;
export const ApproveParagraphEditProposalDocument = gql`
    mutation ApproveParagraphEditProposal($id: String!) {
  approveParagraphEditProposal(id: $id) {
    ...PageSnippet
  }
}
    ${PageSnippetFragmentDoc}`;
export type ApproveParagraphEditProposalMutationFn = Apollo.MutationFunction<ApproveParagraphEditProposalMutation, ApproveParagraphEditProposalMutationVariables>;

/**
 * __useApproveParagraphEditProposalMutation__
 *
 * To run a mutation, you first call `useApproveParagraphEditProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveParagraphEditProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveParagraphEditProposalMutation, { data, loading, error }] = useApproveParagraphEditProposalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveParagraphEditProposalMutation(baseOptions?: Apollo.MutationHookOptions<ApproveParagraphEditProposalMutation, ApproveParagraphEditProposalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveParagraphEditProposalMutation, ApproveParagraphEditProposalMutationVariables>(ApproveParagraphEditProposalDocument, options);
      }
export type ApproveParagraphEditProposalMutationHookResult = ReturnType<typeof useApproveParagraphEditProposalMutation>;
export type ApproveParagraphEditProposalMutationResult = Apollo.MutationResult<ApproveParagraphEditProposalMutation>;
export type ApproveParagraphEditProposalMutationOptions = Apollo.BaseMutationOptions<ApproveParagraphEditProposalMutation, ApproveParagraphEditProposalMutationVariables>;
export const ApproveVariableEditProposalDocument = gql`
    mutation ApproveVariableEditProposal($id: String!) {
  approveVariableEditProposal(id: $id) {
    ...VariableSnippet
  }
}
    ${VariableSnippetFragmentDoc}`;
export type ApproveVariableEditProposalMutationFn = Apollo.MutationFunction<ApproveVariableEditProposalMutation, ApproveVariableEditProposalMutationVariables>;

/**
 * __useApproveVariableEditProposalMutation__
 *
 * To run a mutation, you first call `useApproveVariableEditProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveVariableEditProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveVariableEditProposalMutation, { data, loading, error }] = useApproveVariableEditProposalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveVariableEditProposalMutation(baseOptions?: Apollo.MutationHookOptions<ApproveVariableEditProposalMutation, ApproveVariableEditProposalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveVariableEditProposalMutation, ApproveVariableEditProposalMutationVariables>(ApproveVariableEditProposalDocument, options);
      }
export type ApproveVariableEditProposalMutationHookResult = ReturnType<typeof useApproveVariableEditProposalMutation>;
export type ApproveVariableEditProposalMutationResult = Apollo.MutationResult<ApproveVariableEditProposalMutation>;
export type ApproveVariableEditProposalMutationOptions = Apollo.BaseMutationOptions<ApproveVariableEditProposalMutation, ApproveVariableEditProposalMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParagraphEditProposalMutation, CreateParagraphEditProposalMutationVariables>(CreateParagraphEditProposalDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPageMutation, NewPageMutationVariables>(NewPageDocument, options);
      }
export type NewPageMutationHookResult = ReturnType<typeof useNewPageMutation>;
export type NewPageMutationResult = Apollo.MutationResult<NewPageMutation>;
export type NewPageMutationOptions = Apollo.BaseMutationOptions<NewPageMutation, NewPageMutationVariables>;
export const NewVariableDocument = gql`
    mutation NewVariable($data: NewVariableData!) {
  newVariable(data: $data) {
    ...VariableSnippet
  }
}
    ${VariableSnippetFragmentDoc}`;
export type NewVariableMutationFn = Apollo.MutationFunction<NewVariableMutation, NewVariableMutationVariables>;

/**
 * __useNewVariableMutation__
 *
 * To run a mutation, you first call `useNewVariableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewVariableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newVariableMutation, { data, loading, error }] = useNewVariableMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewVariableMutation(baseOptions?: Apollo.MutationHookOptions<NewVariableMutation, NewVariableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewVariableMutation, NewVariableMutationVariables>(NewVariableDocument, options);
      }
export type NewVariableMutationHookResult = ReturnType<typeof useNewVariableMutation>;
export type NewVariableMutationResult = Apollo.MutationResult<NewVariableMutation>;
export type NewVariableMutationOptions = Apollo.BaseMutationOptions<NewVariableMutation, NewVariableMutationVariables>;
export const NewVariableEditProposalDocument = gql`
    mutation NewVariableEditProposal($data: NewVariableEditProposalData!) {
  newVariableEditProposal(data: $data) {
    ...VariableEditProposalSnippet
  }
}
    ${VariableEditProposalSnippetFragmentDoc}`;
export type NewVariableEditProposalMutationFn = Apollo.MutationFunction<NewVariableEditProposalMutation, NewVariableEditProposalMutationVariables>;

/**
 * __useNewVariableEditProposalMutation__
 *
 * To run a mutation, you first call `useNewVariableEditProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewVariableEditProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newVariableEditProposalMutation, { data, loading, error }] = useNewVariableEditProposalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewVariableEditProposalMutation(baseOptions?: Apollo.MutationHookOptions<NewVariableEditProposalMutation, NewVariableEditProposalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewVariableEditProposalMutation, NewVariableEditProposalMutationVariables>(NewVariableEditProposalDocument, options);
      }
export type NewVariableEditProposalMutationHookResult = ReturnType<typeof useNewVariableEditProposalMutation>;
export type NewVariableEditProposalMutationResult = Apollo.MutationResult<NewVariableEditProposalMutation>;
export type NewVariableEditProposalMutationOptions = Apollo.BaseMutationOptions<NewVariableEditProposalMutation, NewVariableEditProposalMutationVariables>;
export const RequestVerificationDocument = gql`
    mutation RequestVerification {
  requestVerification {
    ...FullUserSnippet
  }
}
    ${FullUserSnippetFragmentDoc}`;
export type RequestVerificationMutationFn = Apollo.MutationFunction<RequestVerificationMutation, RequestVerificationMutationVariables>;

/**
 * __useRequestVerificationMutation__
 *
 * To run a mutation, you first call `useRequestVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestVerificationMutation, { data, loading, error }] = useRequestVerificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestVerificationMutation(baseOptions?: Apollo.MutationHookOptions<RequestVerificationMutation, RequestVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestVerificationMutation, RequestVerificationMutationVariables>(RequestVerificationDocument, options);
      }
export type RequestVerificationMutationHookResult = ReturnType<typeof useRequestVerificationMutation>;
export type RequestVerificationMutationResult = Apollo.MutationResult<RequestVerificationMutation>;
export type RequestVerificationMutationOptions = Apollo.BaseMutationOptions<RequestVerificationMutation, RequestVerificationMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>(FullParagraphEditProposalDocument, options);
      }
export function useFullParagraphEditProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>(FullParagraphEditProposalDocument, options);
        }
export type FullParagraphEditProposalQueryHookResult = ReturnType<typeof useFullParagraphEditProposalQuery>;
export type FullParagraphEditProposalLazyQueryHookResult = ReturnType<typeof useFullParagraphEditProposalLazyQuery>;
export type FullParagraphEditProposalQueryResult = Apollo.QueryResult<FullParagraphEditProposalQuery, FullParagraphEditProposalQueryVariables>;
export const LinkFormPageSearchDocument = gql`
    query LinkFormPageSearch($searchString: String!, $limit: Float) {
  searchPages(searchString: $searchString, limit: $limit) {
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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLinkFormPageSearchQuery(baseOptions: Apollo.QueryHookOptions<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>(LinkFormPageSearchDocument, options);
      }
export function useLinkFormPageSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkFormPageSearchQuery, LinkFormPageSearchQueryVariables>(LinkFormPageSearchDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
      }
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, options);
        }
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PagesDocument = gql`
    query Pages($options: ListOptionData) {
  pages(options: $options) {
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePagesQuery(baseOptions?: Apollo.QueryHookOptions<PagesQuery, PagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PagesQuery, PagesQueryVariables>(PagesDocument, options);
      }
export function usePagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PagesQuery, PagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PagesQuery, PagesQueryVariables>(PagesDocument, options);
        }
export type PagesQueryHookResult = ReturnType<typeof usePagesQuery>;
export type PagesLazyQueryHookResult = ReturnType<typeof usePagesLazyQuery>;
export type PagesQueryResult = Apollo.QueryResult<PagesQuery, PagesQueryVariables>;
export const ParagraphDocument = gql`
    query Paragraph($id: String!) {
  paragraph(id: $id) {
    ...DisplayParagraphSnippet
  }
}
    ${DisplayParagraphSnippetFragmentDoc}`;

/**
 * __useParagraphQuery__
 *
 * To run a query within a React component, call `useParagraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useParagraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParagraphQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useParagraphQuery(baseOptions: Apollo.QueryHookOptions<ParagraphQuery, ParagraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParagraphQuery, ParagraphQueryVariables>(ParagraphDocument, options);
      }
export function useParagraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParagraphQuery, ParagraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParagraphQuery, ParagraphQueryVariables>(ParagraphDocument, options);
        }
export type ParagraphQueryHookResult = ReturnType<typeof useParagraphQuery>;
export type ParagraphLazyQueryHookResult = ReturnType<typeof useParagraphLazyQuery>;
export type ParagraphQueryResult = Apollo.QueryResult<ParagraphQuery, ParagraphQueryVariables>;
export const PreviewPageSearchDocument = gql`
    query PreviewPageSearch($searchString: String!, $limit: Float) {
  searchPages(searchString: $searchString, limit: $limit) {
    ...PageCardSnippet
  }
}
    ${PageCardSnippetFragmentDoc}`;

/**
 * __usePreviewPageSearchQuery__
 *
 * To run a query within a React component, call `usePreviewPageSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewPageSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewPageSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePreviewPageSearchQuery(baseOptions: Apollo.QueryHookOptions<PreviewPageSearchQuery, PreviewPageSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewPageSearchQuery, PreviewPageSearchQueryVariables>(PreviewPageSearchDocument, options);
      }
export function usePreviewPageSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewPageSearchQuery, PreviewPageSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewPageSearchQuery, PreviewPageSearchQueryVariables>(PreviewPageSearchDocument, options);
        }
export type PreviewPageSearchQueryHookResult = ReturnType<typeof usePreviewPageSearchQuery>;
export type PreviewPageSearchLazyQueryHookResult = ReturnType<typeof usePreviewPageSearchLazyQuery>;
export type PreviewPageSearchQueryResult = Apollo.QueryResult<PreviewPageSearchQuery, PreviewPageSearchQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>(PreviewParagraphEditProposalDocument, options);
      }
export function usePreviewParagraphEditProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>(PreviewParagraphEditProposalDocument, options);
        }
export type PreviewParagraphEditProposalQueryHookResult = ReturnType<typeof usePreviewParagraphEditProposalQuery>;
export type PreviewParagraphEditProposalLazyQueryHookResult = ReturnType<typeof usePreviewParagraphEditProposalLazyQuery>;
export type PreviewParagraphEditProposalQueryResult = Apollo.QueryResult<PreviewParagraphEditProposalQuery, PreviewParagraphEditProposalQueryVariables>;
export const PreviewQuestionSearchDocument = gql`
    query PreviewQuestionSearch($searchString: String!, $limit: Float) {
  searchQuestions(searchString: $searchString, limit: $limit) {
    ...QuestionCardSnippet
  }
}
    ${QuestionCardSnippetFragmentDoc}`;

/**
 * __usePreviewQuestionSearchQuery__
 *
 * To run a query within a React component, call `usePreviewQuestionSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewQuestionSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewQuestionSearchQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePreviewQuestionSearchQuery(baseOptions: Apollo.QueryHookOptions<PreviewQuestionSearchQuery, PreviewQuestionSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewQuestionSearchQuery, PreviewQuestionSearchQueryVariables>(PreviewQuestionSearchDocument, options);
      }
export function usePreviewQuestionSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewQuestionSearchQuery, PreviewQuestionSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewQuestionSearchQuery, PreviewQuestionSearchQueryVariables>(PreviewQuestionSearchDocument, options);
        }
export type PreviewQuestionSearchQueryHookResult = ReturnType<typeof usePreviewQuestionSearchQuery>;
export type PreviewQuestionSearchLazyQueryHookResult = ReturnType<typeof usePreviewQuestionSearchLazyQuery>;
export type PreviewQuestionSearchQueryResult = Apollo.QueryResult<PreviewQuestionSearchQuery, PreviewQuestionSearchQueryVariables>;
export const QuestionDocument = gql`
    query Question($id: ID, $slug: String) {
  question(id: $id, slug: $slug) {
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
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useQuestionQuery(baseOptions?: Apollo.QueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, options);
      }
export function useQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionQuery, QuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionQuery, QuestionQueryVariables>(QuestionDocument, options);
        }
export type QuestionQueryHookResult = ReturnType<typeof useQuestionQuery>;
export type QuestionLazyQueryHookResult = ReturnType<typeof useQuestionLazyQuery>;
export type QuestionQueryResult = Apollo.QueryResult<QuestionQuery, QuestionQueryVariables>;
export const QuestionsDocument = gql`
    query Questions($options: ListOptionData) {
  questions(options: $options) {
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const RestSsrVariableDocument = gql`
    query RestSSRVariable($id: ID!) {
  variable(id: $id) {
    ...RestSSRVariableSnippet
  }
}
    ${RestSsrVariableSnippetFragmentDoc}`;

/**
 * __useRestSsrVariableQuery__
 *
 * To run a query within a React component, call `useRestSsrVariableQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestSsrVariableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestSsrVariableQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestSsrVariableQuery(baseOptions: Apollo.QueryHookOptions<RestSsrVariableQuery, RestSsrVariableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestSsrVariableQuery, RestSsrVariableQueryVariables>(RestSsrVariableDocument, options);
      }
export function useRestSsrVariableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestSsrVariableQuery, RestSsrVariableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestSsrVariableQuery, RestSsrVariableQueryVariables>(RestSsrVariableDocument, options);
        }
export type RestSsrVariableQueryHookResult = ReturnType<typeof useRestSsrVariableQuery>;
export type RestSsrVariableLazyQueryHookResult = ReturnType<typeof useRestSsrVariableLazyQuery>;
export type RestSsrVariableQueryResult = Apollo.QueryResult<RestSsrVariableQuery, RestSsrVariableQueryVariables>;
export const SearchQuestionsDocument = gql`
    query SearchQuestions($searchString: String!, $limit: Float) {
  searchQuestions(searchString: $searchString, limit: $limit) {
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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchQuestionsQuery(baseOptions: Apollo.QueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, options);
      }
export function useSearchQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuestionsQuery, SearchQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuestionsQuery, SearchQuestionsQueryVariables>(SearchQuestionsDocument, options);
        }
export type SearchQuestionsQueryHookResult = ReturnType<typeof useSearchQuestionsQuery>;
export type SearchQuestionsLazyQueryHookResult = ReturnType<typeof useSearchQuestionsLazyQuery>;
export type SearchQuestionsQueryResult = Apollo.QueryResult<SearchQuestionsQuery, SearchQuestionsQueryVariables>;
export const SearchVariablesDocument = gql`
    query SearchVariables($searchString: String!, $limit: Float) {
  searchVariables(searchString: $searchString, limit: $limit) {
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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchVariablesQuery(baseOptions: Apollo.QueryHookOptions<SearchVariablesQuery, SearchVariablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVariablesQuery, SearchVariablesQueryVariables>(SearchVariablesDocument, options);
      }
export function useSearchVariablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVariablesQuery, SearchVariablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVariablesQuery, SearchVariablesQueryVariables>(SearchVariablesDocument, options);
        }
export type SearchVariablesQueryHookResult = ReturnType<typeof useSearchVariablesQuery>;
export type SearchVariablesLazyQueryHookResult = ReturnType<typeof useSearchVariablesLazyQuery>;
export type SearchVariablesQueryResult = Apollo.QueryResult<SearchVariablesQuery, SearchVariablesQueryVariables>;
export const SsrPageDocument = gql`
    query SSRPage($id: ID, $slug: String) {
  page(id: $id, slug: $slug) {
    ...SSRPageSnippet
  }
}
    ${SsrPageSnippetFragmentDoc}`;

/**
 * __useSsrPageQuery__
 *
 * To run a query within a React component, call `useSsrPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsrPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsrPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSsrPageQuery(baseOptions?: Apollo.QueryHookOptions<SsrPageQuery, SsrPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsrPageQuery, SsrPageQueryVariables>(SsrPageDocument, options);
      }
export function useSsrPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsrPageQuery, SsrPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsrPageQuery, SsrPageQueryVariables>(SsrPageDocument, options);
        }
export type SsrPageQueryHookResult = ReturnType<typeof useSsrPageQuery>;
export type SsrPageLazyQueryHookResult = ReturnType<typeof useSsrPageLazyQuery>;
export type SsrPageQueryResult = Apollo.QueryResult<SsrPageQuery, SsrPageQueryVariables>;
export const SsrQuestionDocument = gql`
    query SSRQuestion($id: ID, $slug: String) {
  question(id: $id, slug: $slug) {
    ...SSRQuestionSnippet
  }
}
    ${SsrQuestionSnippetFragmentDoc}`;

/**
 * __useSsrQuestionQuery__
 *
 * To run a query within a React component, call `useSsrQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsrQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsrQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSsrQuestionQuery(baseOptions?: Apollo.QueryHookOptions<SsrQuestionQuery, SsrQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsrQuestionQuery, SsrQuestionQueryVariables>(SsrQuestionDocument, options);
      }
export function useSsrQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsrQuestionQuery, SsrQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsrQuestionQuery, SsrQuestionQueryVariables>(SsrQuestionDocument, options);
        }
export type SsrQuestionQueryHookResult = ReturnType<typeof useSsrQuestionQuery>;
export type SsrQuestionLazyQueryHookResult = ReturnType<typeof useSsrQuestionLazyQuery>;
export type SsrQuestionQueryResult = Apollo.QueryResult<SsrQuestionQuery, SsrQuestionQueryVariables>;
export const SsrUserDocument = gql`
    query SSRUser($id: String!) {
  user(id: $id) {
    ...SSRUserSnippet
  }
}
    ${SsrUserSnippetFragmentDoc}`;

/**
 * __useSsrUserQuery__
 *
 * To run a query within a React component, call `useSsrUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsrUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsrUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSsrUserQuery(baseOptions: Apollo.QueryHookOptions<SsrUserQuery, SsrUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsrUserQuery, SsrUserQueryVariables>(SsrUserDocument, options);
      }
export function useSsrUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsrUserQuery, SsrUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsrUserQuery, SsrUserQueryVariables>(SsrUserDocument, options);
        }
export type SsrUserQueryHookResult = ReturnType<typeof useSsrUserQuery>;
export type SsrUserLazyQueryHookResult = ReturnType<typeof useSsrUserLazyQuery>;
export type SsrUserQueryResult = Apollo.QueryResult<SsrUserQuery, SsrUserQueryVariables>;
export const SsrVariableDocument = gql`
    query SSRVariable($id: ID!) {
  variable(id: $id) {
    ...SSRVariableSnippet
  }
}
    ${SsrVariableSnippetFragmentDoc}`;

/**
 * __useSsrVariableQuery__
 *
 * To run a query within a React component, call `useSsrVariableQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsrVariableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsrVariableQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSsrVariableQuery(baseOptions: Apollo.QueryHookOptions<SsrVariableQuery, SsrVariableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsrVariableQuery, SsrVariableQueryVariables>(SsrVariableDocument, options);
      }
export function useSsrVariableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsrVariableQuery, SsrVariableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsrVariableQuery, SsrVariableQueryVariables>(SsrVariableDocument, options);
        }
export type SsrVariableQueryHookResult = ReturnType<typeof useSsrVariableQuery>;
export type SsrVariableLazyQueryHookResult = ReturnType<typeof useSsrVariableLazyQuery>;
export type SsrVariableQueryResult = Apollo.QueryResult<SsrVariableQuery, SsrVariableQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatementQuery, StatementQueryVariables>(StatementDocument, options);
      }
export function useStatementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatementQuery, StatementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatementQuery, StatementQueryVariables>(StatementDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>(StatementsFromQuestionDocument, options);
      }
export function useStatementsFromQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatementsFromQuestionQuery, StatementsFromQuestionQueryVariables>(StatementsFromQuestionDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserContributionsDocument = gql`
    query UserContributions($id: String!) {
  user(id: $id) {
    ...UserContributionsSnippet
  }
}
    ${UserContributionsSnippetFragmentDoc}`;

/**
 * __useUserContributionsQuery__
 *
 * To run a query within a React component, call `useUserContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContributionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserContributionsQuery(baseOptions: Apollo.QueryHookOptions<UserContributionsQuery, UserContributionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContributionsQuery, UserContributionsQueryVariables>(UserContributionsDocument, options);
      }
export function useUserContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContributionsQuery, UserContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContributionsQuery, UserContributionsQueryVariables>(UserContributionsDocument, options);
        }
export type UserContributionsQueryHookResult = ReturnType<typeof useUserContributionsQuery>;
export type UserContributionsLazyQueryHookResult = ReturnType<typeof useUserContributionsLazyQuery>;
export type UserContributionsQueryResult = Apollo.QueryResult<UserContributionsQuery, UserContributionsQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VariableQuery, VariableQueryVariables>(VariableDocument, options);
      }
export function useVariableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VariableQuery, VariableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VariableQuery, VariableQueryVariables>(VariableDocument, options);
        }
export type VariableQueryHookResult = ReturnType<typeof useVariableQuery>;
export type VariableLazyQueryHookResult = ReturnType<typeof useVariableLazyQuery>;
export type VariableQueryResult = Apollo.QueryResult<VariableQuery, VariableQueryVariables>;