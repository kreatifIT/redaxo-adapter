import { gql } from 'graphql-tag';
import {
    REX_ARTICLE_FRAGMENT,
    REX_CLANG_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
    REX_SEO_FRAGMENT,
    REX_BREADCRUMB_FRAGMENT,
} from './fragments';
import type { Article, ArticleIncludes } from './@types';
import GraphQLClient from './client';

export async function getArticleByPath(
    path: string,
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await GraphQLClient.query(
        REX_ARTICLE_BY_PATH_QRY,
        {
            path,
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.articleByPath as Article;
}

export async function getRootArticles(
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await GraphQLClient.query(
        REX_ROOT_ARTICLES_QRY,
        {
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.rootArticles as Article[];
}

export async function getArticleById(
    id: string,
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await GraphQLClient.query(
        REX_ARTICLE_QRY,
        {
            id,
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.article as Article;
}

export async function getSiteStartArticle(
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await GraphQLClient.query(
        REX_SITE_START_ARTICLE_QRY,
        {
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.siteStartArticle as Article;
}

function getArticleIncludes(includes?: ArticleIncludes) {
    return {
        includeSlices: includes?.slices || false,
        includeClang: includes?.clang || false,
        includeSeo: includes?.seo || false,
        includeBreadcrumbs: includes?.breadcrumbs || false,
    };
}

const FRAGMENTS = gql`
    ${REX_ARTICLE_FRAGMENT}
    ${REX_CLANG_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
    ${REX_SEO_FRAGMENT}
    ${REX_BREADCRUMB_FRAGMENT}
`;

const REX_ARTICLE_QRY = gql`
    query article(
        $id: ID!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        article(id: $id) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_ARTICLE_BY_PATH_QRY = gql`
    query articleByPath(
        $path: String!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        articleByPath(path: $path) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_ROOT_ARTICLES_QRY = gql`
    query rootArticles(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        rootArticles {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_SITE_START_ARTICLE_QRY = gql`
    query siteStartArticle(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeSeo: Boolean!
        $includeBreadcrumbs: Boolean!
    ) {
        siteStartArticle {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            seo @include(if: $includeSeo) {
                ...SEOFragment
            }
            breadcrumbs @include(if: $includeBreadcrumbs) {
                ...BreadcrumbFragment
            }
        }
    }
    ${FRAGMENTS}
`;
