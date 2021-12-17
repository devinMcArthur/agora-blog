import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../withApollo';










export async function getServerPageAlls
    (options: Omit<Apollo.QueryOptions<Types.AllPagesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AllPagesQuery>({ ...options, query: Operations.AllPagesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAlls = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllPagesQuery, Types.AllPagesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AllPagesDocument, options);
};
export type PageAllsComp = React.FC<{data?: Types.AllPagesQuery, error?: Apollo.ApolloError}>;
export const withPageAlls = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllPagesQuery, Types.AllPagesQueryVariables>) => (WrappedComponent:PageAllsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AllPagesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAlls = {
      getServerPage: getServerPageAlls,
      withPage: withPageAlls,
      usePage: useAlls,
    }
export async function getServerPageAllQuestions
    (options: Omit<Apollo.QueryOptions<Types.AllQuestionsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.AllQuestionsQuery>({ ...options, query: Operations.AllQuestionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useAllQuestions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllQuestionsQuery, Types.AllQuestionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.AllQuestionsDocument, options);
};
export type PageAllQuestionsComp = React.FC<{data?: Types.AllQuestionsQuery, error?: Apollo.ApolloError}>;
export const withPageAllQuestions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.AllQuestionsQuery, Types.AllQuestionsQueryVariables>) => (WrappedComponent:PageAllQuestionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.AllQuestionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrAllQuestions = {
      getServerPage: getServerPageAllQuestions,
      withPage: withPageAllQuestions,
      usePage: useAllQuestions,
    }
export async function getServerPageCurrentUser
    (options: Omit<Apollo.QueryOptions<Types.CurrentUserQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.CurrentUserQuery>({ ...options, query: Operations.CurrentUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useCurrentUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CurrentUserDocument, options);
};
export type PageCurrentUserComp = React.FC<{data?: Types.CurrentUserQuery, error?: Apollo.ApolloError}>;
export const withPageCurrentUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) => (WrappedComponent:PageCurrentUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.CurrentUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrCurrentUser = {
      getServerPage: getServerPageCurrentUser,
      withPage: withPageCurrentUser,
      usePage: useCurrentUser,
    }
export async function getServerPageFullParagraphEditProposal
    (options: Omit<Apollo.QueryOptions<Types.FullParagraphEditProposalQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.FullParagraphEditProposalQuery>({ ...options, query: Operations.FullParagraphEditProposalDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useFullParagraphEditProposal = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FullParagraphEditProposalQuery, Types.FullParagraphEditProposalQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.FullParagraphEditProposalDocument, options);
};
export type PageFullParagraphEditProposalComp = React.FC<{data?: Types.FullParagraphEditProposalQuery, error?: Apollo.ApolloError}>;
export const withPageFullParagraphEditProposal = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.FullParagraphEditProposalQuery, Types.FullParagraphEditProposalQueryVariables>) => (WrappedComponent:PageFullParagraphEditProposalComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.FullParagraphEditProposalDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrFullParagraphEditProposal = {
      getServerPage: getServerPageFullParagraphEditProposal,
      withPage: withPageFullParagraphEditProposal,
      usePage: useFullParagraphEditProposal,
    }
export async function getServerPageLinkFormSearch
    (options: Omit<Apollo.QueryOptions<Types.LinkFormPageSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.LinkFormPageSearchQuery>({ ...options, query: Operations.LinkFormPageSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useLinkFormSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.LinkFormPageSearchQuery, Types.LinkFormPageSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.LinkFormPageSearchDocument, options);
};
export type PageLinkFormSearchComp = React.FC<{data?: Types.LinkFormPageSearchQuery, error?: Apollo.ApolloError}>;
export const withPageLinkFormSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.LinkFormPageSearchQuery, Types.LinkFormPageSearchQueryVariables>) => (WrappedComponent:PageLinkFormSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.LinkFormPageSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrLinkFormSearch = {
      getServerPage: getServerPageLinkFormSearch,
      withPage: withPageLinkFormSearch,
      usePage: useLinkFormSearch,
    }
export async function getServerPage
    (options: Omit<Apollo.QueryOptions<Types.PageQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PageQuery>({ ...options, query: Operations.PageDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const use = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PageDocument, options);
};
export type PageComp = React.FC<{data?: Types.PageQuery, error?: Apollo.ApolloError}>;
export const withPage = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PageQuery, Types.PageQueryVariables>) => (WrappedComponent:PageComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PageDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssr = {
      getServerPage: getServerPage,
      withPage: withPage,
      usePage: use,
    }
export async function getServerPages
    (options: Omit<Apollo.QueryOptions<Types.PagesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PagesQuery>({ ...options, query: Operations.PagesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const uses = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PagesQuery, Types.PagesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PagesDocument, options);
};
export type PagesComp = React.FC<{data?: Types.PagesQuery, error?: Apollo.ApolloError}>;
export const withPages = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PagesQuery, Types.PagesQueryVariables>) => (WrappedComponent:PagesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PagesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrs = {
      getServerPage: getServerPages,
      withPage: withPages,
      usePage: uses,
    }
export async function getServerPageParagraph
    (options: Omit<Apollo.QueryOptions<Types.ParagraphQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.ParagraphQuery>({ ...options, query: Operations.ParagraphDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useParagraph = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParagraphQuery, Types.ParagraphQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.ParagraphDocument, options);
};
export type PageParagraphComp = React.FC<{data?: Types.ParagraphQuery, error?: Apollo.ApolloError}>;
export const withPageParagraph = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.ParagraphQuery, Types.ParagraphQueryVariables>) => (WrappedComponent:PageParagraphComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.ParagraphDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrParagraph = {
      getServerPage: getServerPageParagraph,
      withPage: withPageParagraph,
      usePage: useParagraph,
    }
export async function getServerPagePreviewSearch
    (options: Omit<Apollo.QueryOptions<Types.PreviewPageSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PreviewPageSearchQuery>({ ...options, query: Operations.PreviewPageSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePreviewSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewPageSearchQuery, Types.PreviewPageSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PreviewPageSearchDocument, options);
};
export type PagePreviewSearchComp = React.FC<{data?: Types.PreviewPageSearchQuery, error?: Apollo.ApolloError}>;
export const withPagePreviewSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewPageSearchQuery, Types.PreviewPageSearchQueryVariables>) => (WrappedComponent:PagePreviewSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PreviewPageSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPreviewSearch = {
      getServerPage: getServerPagePreviewSearch,
      withPage: withPagePreviewSearch,
      usePage: usePreviewSearch,
    }
export async function getServerPagePreviewParagraphEditProposal
    (options: Omit<Apollo.QueryOptions<Types.PreviewParagraphEditProposalQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PreviewParagraphEditProposalQuery>({ ...options, query: Operations.PreviewParagraphEditProposalDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePreviewParagraphEditProposal = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewParagraphEditProposalQuery, Types.PreviewParagraphEditProposalQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PreviewParagraphEditProposalDocument, options);
};
export type PagePreviewParagraphEditProposalComp = React.FC<{data?: Types.PreviewParagraphEditProposalQuery, error?: Apollo.ApolloError}>;
export const withPagePreviewParagraphEditProposal = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewParagraphEditProposalQuery, Types.PreviewParagraphEditProposalQueryVariables>) => (WrappedComponent:PagePreviewParagraphEditProposalComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PreviewParagraphEditProposalDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPreviewParagraphEditProposal = {
      getServerPage: getServerPagePreviewParagraphEditProposal,
      withPage: withPagePreviewParagraphEditProposal,
      usePage: usePreviewParagraphEditProposal,
    }
export async function getServerPagePreviewQuestionSearch
    (options: Omit<Apollo.QueryOptions<Types.PreviewQuestionSearchQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PreviewQuestionSearchQuery>({ ...options, query: Operations.PreviewQuestionSearchDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePreviewQuestionSearch = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewQuestionSearchQuery, Types.PreviewQuestionSearchQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PreviewQuestionSearchDocument, options);
};
export type PagePreviewQuestionSearchComp = React.FC<{data?: Types.PreviewQuestionSearchQuery, error?: Apollo.ApolloError}>;
export const withPagePreviewQuestionSearch = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PreviewQuestionSearchQuery, Types.PreviewQuestionSearchQueryVariables>) => (WrappedComponent:PagePreviewQuestionSearchComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PreviewQuestionSearchDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPreviewQuestionSearch = {
      getServerPage: getServerPagePreviewQuestionSearch,
      withPage: withPagePreviewQuestionSearch,
      usePage: usePreviewQuestionSearch,
    }
export async function getServerPageQuestion
    (options: Omit<Apollo.QueryOptions<Types.QuestionQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.QuestionQuery>({ ...options, query: Operations.QuestionDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useQuestion = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.QuestionQuery, Types.QuestionQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.QuestionDocument, options);
};
export type PageQuestionComp = React.FC<{data?: Types.QuestionQuery, error?: Apollo.ApolloError}>;
export const withPageQuestion = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.QuestionQuery, Types.QuestionQueryVariables>) => (WrappedComponent:PageQuestionComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.QuestionDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrQuestion = {
      getServerPage: getServerPageQuestion,
      withPage: withPageQuestion,
      usePage: useQuestion,
    }
export async function getServerPageQuestions
    (options: Omit<Apollo.QueryOptions<Types.QuestionsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.QuestionsQuery>({ ...options, query: Operations.QuestionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useQuestions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.QuestionsQuery, Types.QuestionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.QuestionsDocument, options);
};
export type PageQuestionsComp = React.FC<{data?: Types.QuestionsQuery, error?: Apollo.ApolloError}>;
export const withPageQuestions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.QuestionsQuery, Types.QuestionsQueryVariables>) => (WrappedComponent:PageQuestionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.QuestionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrQuestions = {
      getServerPage: getServerPageQuestions,
      withPage: withPageQuestions,
      usePage: useQuestions,
    }
export async function getServerPageRestSsrVariable
    (options: Omit<Apollo.QueryOptions<Types.RestSsrVariableQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.RestSsrVariableQuery>({ ...options, query: Operations.RestSsrVariableDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useRestSsrVariable = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.RestSsrVariableQuery, Types.RestSsrVariableQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.RestSsrVariableDocument, options);
};
export type PageRestSsrVariableComp = React.FC<{data?: Types.RestSsrVariableQuery, error?: Apollo.ApolloError}>;
export const withPageRestSsrVariable = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.RestSsrVariableQuery, Types.RestSsrVariableQueryVariables>) => (WrappedComponent:PageRestSsrVariableComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.RestSsrVariableDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrRestSsrVariable = {
      getServerPage: getServerPageRestSsrVariable,
      withPage: withPageRestSsrVariable,
      usePage: useRestSsrVariable,
    }
export async function getServerPageSearchQuestions
    (options: Omit<Apollo.QueryOptions<Types.SearchQuestionsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SearchQuestionsQuery>({ ...options, query: Operations.SearchQuestionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSearchQuestions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchQuestionsQuery, Types.SearchQuestionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SearchQuestionsDocument, options);
};
export type PageSearchQuestionsComp = React.FC<{data?: Types.SearchQuestionsQuery, error?: Apollo.ApolloError}>;
export const withPageSearchQuestions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchQuestionsQuery, Types.SearchQuestionsQueryVariables>) => (WrappedComponent:PageSearchQuestionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SearchQuestionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSearchQuestions = {
      getServerPage: getServerPageSearchQuestions,
      withPage: withPageSearchQuestions,
      usePage: useSearchQuestions,
    }
export async function getServerPageSearchVariables
    (options: Omit<Apollo.QueryOptions<Types.SearchVariablesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SearchVariablesQuery>({ ...options, query: Operations.SearchVariablesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSearchVariables = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchVariablesQuery, Types.SearchVariablesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SearchVariablesDocument, options);
};
export type PageSearchVariablesComp = React.FC<{data?: Types.SearchVariablesQuery, error?: Apollo.ApolloError}>;
export const withPageSearchVariables = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SearchVariablesQuery, Types.SearchVariablesQueryVariables>) => (WrappedComponent:PageSearchVariablesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SearchVariablesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSearchVariables = {
      getServerPage: getServerPageSearchVariables,
      withPage: withPageSearchVariables,
      usePage: useSearchVariables,
    }
export async function getServerPageSsr
    (options: Omit<Apollo.QueryOptions<Types.SsrPageQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SsrPageQuery>({ ...options, query: Operations.SsrPageDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSsr = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrPageQuery, Types.SsrPageQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SsrPageDocument, options);
};
export type PageSsrComp = React.FC<{data?: Types.SsrPageQuery, error?: Apollo.ApolloError}>;
export const withPageSsr = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrPageQuery, Types.SsrPageQueryVariables>) => (WrappedComponent:PageSsrComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SsrPageDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSsr = {
      getServerPage: getServerPageSsr,
      withPage: withPageSsr,
      usePage: useSsr,
    }
export async function getServerPageSsrQuestion
    (options: Omit<Apollo.QueryOptions<Types.SsrQuestionQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SsrQuestionQuery>({ ...options, query: Operations.SsrQuestionDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSsrQuestion = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrQuestionQuery, Types.SsrQuestionQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SsrQuestionDocument, options);
};
export type PageSsrQuestionComp = React.FC<{data?: Types.SsrQuestionQuery, error?: Apollo.ApolloError}>;
export const withPageSsrQuestion = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrQuestionQuery, Types.SsrQuestionQueryVariables>) => (WrappedComponent:PageSsrQuestionComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SsrQuestionDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSsrQuestion = {
      getServerPage: getServerPageSsrQuestion,
      withPage: withPageSsrQuestion,
      usePage: useSsrQuestion,
    }
export async function getServerPageSsrUser
    (options: Omit<Apollo.QueryOptions<Types.SsrUserQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SsrUserQuery>({ ...options, query: Operations.SsrUserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSsrUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrUserQuery, Types.SsrUserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SsrUserDocument, options);
};
export type PageSsrUserComp = React.FC<{data?: Types.SsrUserQuery, error?: Apollo.ApolloError}>;
export const withPageSsrUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrUserQuery, Types.SsrUserQueryVariables>) => (WrappedComponent:PageSsrUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SsrUserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSsrUser = {
      getServerPage: getServerPageSsrUser,
      withPage: withPageSsrUser,
      usePage: useSsrUser,
    }
export async function getServerPageSsrVariable
    (options: Omit<Apollo.QueryOptions<Types.SsrVariableQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.SsrVariableQuery>({ ...options, query: Operations.SsrVariableDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useSsrVariable = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrVariableQuery, Types.SsrVariableQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.SsrVariableDocument, options);
};
export type PageSsrVariableComp = React.FC<{data?: Types.SsrVariableQuery, error?: Apollo.ApolloError}>;
export const withPageSsrVariable = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.SsrVariableQuery, Types.SsrVariableQueryVariables>) => (WrappedComponent:PageSsrVariableComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.SsrVariableDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrSsrVariable = {
      getServerPage: getServerPageSsrVariable,
      withPage: withPageSsrVariable,
      usePage: useSsrVariable,
    }
export async function getServerPageStatement
    (options: Omit<Apollo.QueryOptions<Types.StatementQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.StatementQuery>({ ...options, query: Operations.StatementDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useStatement = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StatementQuery, Types.StatementQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.StatementDocument, options);
};
export type PageStatementComp = React.FC<{data?: Types.StatementQuery, error?: Apollo.ApolloError}>;
export const withPageStatement = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StatementQuery, Types.StatementQueryVariables>) => (WrappedComponent:PageStatementComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.StatementDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrStatement = {
      getServerPage: getServerPageStatement,
      withPage: withPageStatement,
      usePage: useStatement,
    }
export async function getServerPageStatementsFromQuestion
    (options: Omit<Apollo.QueryOptions<Types.StatementsFromQuestionQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.StatementsFromQuestionQuery>({ ...options, query: Operations.StatementsFromQuestionDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useStatementsFromQuestion = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StatementsFromQuestionQuery, Types.StatementsFromQuestionQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.StatementsFromQuestionDocument, options);
};
export type PageStatementsFromQuestionComp = React.FC<{data?: Types.StatementsFromQuestionQuery, error?: Apollo.ApolloError}>;
export const withPageStatementsFromQuestion = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.StatementsFromQuestionQuery, Types.StatementsFromQuestionQueryVariables>) => (WrappedComponent:PageStatementsFromQuestionComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.StatementsFromQuestionDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrStatementsFromQuestion = {
      getServerPage: getServerPageStatementsFromQuestion,
      withPage: withPageStatementsFromQuestion,
      usePage: useStatementsFromQuestion,
    }
export async function getServerPageUser
    (options: Omit<Apollo.QueryOptions<Types.UserQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.UserQuery>({ ...options, query: Operations.UserDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useUser = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.UserDocument, options);
};
export type PageUserComp = React.FC<{data?: Types.UserQuery, error?: Apollo.ApolloError}>;
export const withPageUser = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) => (WrappedComponent:PageUserComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.UserDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrUser = {
      getServerPage: getServerPageUser,
      withPage: withPageUser,
      usePage: useUser,
    }
export async function getServerPageUserContributions
    (options: Omit<Apollo.QueryOptions<Types.UserContributionsQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.UserContributionsQuery>({ ...options, query: Operations.UserContributionsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useUserContributions = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserContributionsQuery, Types.UserContributionsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.UserContributionsDocument, options);
};
export type PageUserContributionsComp = React.FC<{data?: Types.UserContributionsQuery, error?: Apollo.ApolloError}>;
export const withPageUserContributions = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.UserContributionsQuery, Types.UserContributionsQueryVariables>) => (WrappedComponent:PageUserContributionsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.UserContributionsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrUserContributions = {
      getServerPage: getServerPageUserContributions,
      withPage: withPageUserContributions,
      usePage: useUserContributions,
    }
export async function getServerPageVariable
    (options: Omit<Apollo.QueryOptions<Types.VariableQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.VariableQuery>({ ...options, query: Operations.VariableDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useVariable = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VariableQuery, Types.VariableQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.VariableDocument, options);
};
export type PageVariableComp = React.FC<{data?: Types.VariableQuery, error?: Apollo.ApolloError}>;
export const withPageVariable = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.VariableQuery, Types.VariableQueryVariables>) => (WrappedComponent:PageVariableComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.VariableDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrVariable = {
      getServerPage: getServerPageVariable,
      withPage: withPageVariable,
      usePage: useVariable,
    }