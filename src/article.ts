import { gql } from 'graphql-tag';
import {
    REX_ARTICLE_FRAGMENT,
    REX_CLANG_FRAGMENT,
    REX_ARTICLE_SLICE_FRAGMENT,
    REX_METADATA_FRAGMENT,
} from './fragments';
import type { Article, ArticleIncludes } from './@types';
import { RedaxoAdapter } from './adapter';

export async function getArticleByPath(
    path: string,
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await RedaxoAdapter.query(
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
    const { data } = await RedaxoAdapter.query(
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
    const { data } = await RedaxoAdapter.query(
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
    const { data } = await RedaxoAdapter.query(
        REX_SITE_START_ARTICLE_QRY,
        {
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.siteStartArticle as Article;
}

export async function getSelectedArticles(
    ids: string[],
    clangId: string,
    includes?: ArticleIncludes,
) {
    const { data } = await RedaxoAdapter.query(
        REX_SELECTED_ARTICLES_QRY,
        {
            ids,
            ...getArticleIncludes(includes),
        },
        clangId,
    );
    return data.selectedArticles as Article[];
}

function getArticleIncludes(includes?: ArticleIncludes) {
    return {
        includeSlices: includes?.slices || false,
        includeClang: includes?.clang || false,
        includeMetadata: includes?.metadata || false,
    };
}

const FRAGMENTS = gql`
    ${REX_ARTICLE_FRAGMENT}
    ${REX_CLANG_FRAGMENT}
    ${REX_ARTICLE_SLICE_FRAGMENT}
    ${REX_METADATA_FRAGMENT}
`;

const REX_ARTICLE_QRY = gql`
    query article(
        $id: ID!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeMetadata: Boolean!
    ) {
        article(id: $id) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            metadata @include(if: $includeMetadata) {
                ...MetadataFragment
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
        $includeMetadata: Boolean!
    ) {
        articleByPath(path: $path) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            metadata @include(if: $includeMetadata) {
                ...MetadataFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_ROOT_ARTICLES_QRY = gql`
    query rootArticles(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeMetadata: Boolean!
    ) {
        rootArticles {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            metadata @include(if: $includeMetadata) {
                ...MetadataFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_SITE_START_ARTICLE_QRY = gql`
    query siteStartArticle(
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeMetadata: Boolean!
    ) {
        siteStartArticle {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            metadata @include(if: $includeMetadata) {
                ...MetadataFragment
            }
        }
    }
    ${FRAGMENTS}
`;

const REX_SELECTED_ARTICLES_QRY = gql`
    query selectedArticles(
        $ids: [ID!]!
        $includeClang: Boolean!
        $includeSlices: Boolean!
        $includeMetadata: Boolean!
    ) {
        selectedArticles(ids: $ids) {
            ...ArticleFragment
            clang @include(if: $includeClang) {
                ...ClangFragment
            }
            slices @include(if: $includeSlices) {
                ...ArticleSliceFragment
            }
            metadata @include(if: $includeMetadata) {
                ...MetadataFragment
            }
        }
    }
    ${FRAGMENTS}
`;
