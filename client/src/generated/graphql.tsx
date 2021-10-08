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
};

export type Query = {
  __typename?: 'Query';
  page?: Maybe<PageClass>;
  pages: Array<PageClass>;
  searchPages: Array<PageClass>;
  variable?: Maybe<VariableClass>;
  searchVariables: Array<VariableClass>;
  question?: Maybe<QuestionClass>;
  questions: Array<QuestionClass>;
  statement?: Maybe<StatementClass>;
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


export type QueryStatementArgs = {
  id: Scalars['ID'];
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
  statements: Array<StatementClass>;
  version: Scalars['Float'];
  mostRecent: Scalars['Boolean'];
};

export type StatementClass = {
  __typename?: 'StatementClass';
  _id: Scalars['ID'];
  page: PageClass;
  versions: Array<StatementVersionClass>;
  current: Scalars['Boolean'];
};

export type StatementVersionClass = {
  __typename?: 'StatementVersionClass';
  stringArray: Array<StringArrayClass>;
  sources: StatementSourcesClass;
  questions: Array<QuestionClass>;
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
  image?: Maybe<Image>;
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
  sourceURL?: Maybe<Scalars['String']>;
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


export type Image = {
  __typename?: 'Image';
  name: Scalars['String'];
  sourceURL: Scalars['String'];
  caption: Scalars['String'];
  buffer: Scalars['String'];
  contentType: Scalars['String'];
};

export type StatementSourcesClass = {
  __typename?: 'StatementSourcesClass';
  pages: Array<PageClass>;
  urls: Array<Scalars['String']>;
};

export type QuestionClass = {
  __typename?: 'QuestionClass';
  _id: Scalars['ID'];
  question: Scalars['String'];
  referencedCount: Scalars['Float'];
  relatedPages: Array<PageClass>;
};

export type DisplayParagraphSnippetFragment = (
  { __typename?: 'ParagraphClass' }
  & { statements: Array<(
    { __typename?: 'StatementClass' }
    & DisplayStatementSnippetFragment
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
    )>, sources: (
      { __typename?: 'StatementSourcesClass' }
      & Pick<StatementSourcesClass, 'urls'>
      & { pages: Array<(
        { __typename?: 'PageClass' }
        & Pick<PageClass, '_id' | 'slug' | 'title'>
      )> }
    ), questions: Array<(
      { __typename?: 'QuestionClass' }
      & Pick<QuestionClass, '_id' | 'question'>
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
      { __typename?: 'Image' }
      & ImageSnippetFragment
    )> }
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

export type ImageSnippetFragment = (
  { __typename?: 'Image' }
  & Pick<Image, 'name' | 'sourceURL' | 'caption' | 'buffer' | 'contentType'>
);

export type LinkFormPageSnippetFragment = (
  { __typename?: 'PageClass' }
  & Pick<PageClass, '_id' | 'title'>
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

export type QuestionCardSnippetFragment = (
  { __typename?: 'QuestionClass' }
  & Pick<QuestionClass, '_id' | 'question' | 'referencedCount'>
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
    & Pick<VariableVersionClass, 'finalValue' | 'createdAt' | 'sourceURL'>
  )>, relatedPages: Array<(
    { __typename?: 'PageClass' }
    & PageCardSnippetFragment
  )> }
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

export const LinkFormPageSnippetFragmentDoc = gql`
    fragment LinkFormPageSnippet on PageClass {
  _id
  title
}
    `;
export const ImageSnippetFragmentDoc = gql`
    fragment ImageSnippet on Image {
  name
  sourceURL
  caption
  buffer
  contentType
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
    sources {
      urls
      pages {
        _id
        slug
        title
      }
    }
    questions {
      _id
      question
    }
  }
}
    ${FullStringArraySnippetFragmentDoc}`;
export const DisplayParagraphSnippetFragmentDoc = gql`
    fragment DisplayParagraphSnippet on ParagraphClass {
  statements {
    ...DisplayStatementSnippet
  }
}
    ${DisplayStatementSnippetFragmentDoc}`;
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
    sourceURL
    finalValue
  }
  relatedPages {
    ...PageCardSnippet
  }
}
    ${PageCardSnippetFragmentDoc}`;
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