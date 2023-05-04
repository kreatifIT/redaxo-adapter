import { gql } from 'graphql-tag';
import { REX_CATEGORY_FRAGMENT, REX_ARTICLE_FRAGMENT } from './fragments';
import type { Category, CategoryIncludes } from './@types';
import GraphQLClient from './client';

const FRAGMENTS = gql`
    ${REX_CATEGORY_FRAGMENT}
    ${REX_ARTICLE_FRAGMENT}
`;

function getCategoryIncludes(includes?: CategoryIncludes) {
    return {
        includeChildren: includes?.children || false,
        includeArticles: includes?.articles || false,
        includeStartArticle: includes?.startArticle || false,
    };
}

export async function getRootCategories(
    clangId: string,
    includes?: CategoryIncludes,
) {
    const { data } = await GraphQLClient.query(
        REX_ROOT_CATEGORIES_QRY,
        {
            ...getCategoryIncludes(includes),
        },
        clangId,
    );
    return data.rootCategories as Category[];
}

const REX_ROOT_CATEGORIES_QRY = gql`
    query rootCategories(
        $includeChildren: Boolean!
        $includeArticles: Boolean!
        $includeStartArticle: Boolean!
    ) {
        rootCategories {
            ...CategoryFragment
            children @include(if: $includeChildren) {
                ...CategoryFragment
            }
            articles @include(if: $includeArticles) {
                ...ArticleFragment
            }
            startArticle @include(if: $includeStartArticle) {
                ...ArticleFragment
            }
        }
    }
    ${FRAGMENTS}
`;
