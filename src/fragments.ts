import { gql } from 'graphql-tag';

export const REX_MEDIA_FRAGMENT = gql`
    fragment MediaFragment on Media {
        id
        filename
        focusPoint
        title
        alt
        src
        srcset
        width
        height
    }
`;

export const REX_METADATA_FRAGMENT = gql`
    fragment MetadataFragment on Metadata {
        title
        description
        updatedAt
        createdAt
        robots
        canonical
        image {
            ...MediaFragment
        }
    }
    ${REX_MEDIA_FRAGMENT}
`;

export const REX_CLANG_FRAGMENT = gql`
    fragment ClangFragment on Clang {
        id
        name
        code
        url
        online
        active
        priority
    }
`;

export const REX_ARTICLE_FRAGMENT = gql`
    fragment ArticleFragment on Article {
        id
        name
        url
        createdAt
        updatedAt
        online
    }
`;

export const REX_ARTICLE_SLICE_FRAGMENT = gql`
    fragment ArticleSliceFragment on ArticleSlice {
        id
        moduleCode
        values
        media
        mediaList
        link
        linkList
        online
    }
`;

export const REX_CATEGORY_FRAGMENT = gql`
    fragment CategoryFragment on Category {
        id
        name
        online
        url
    }
`;

export const REX_BREADCRUMB_FRAGMENT = gql`
    fragment BreadcrumbFragment on Breadcrumb {
        label
        url
    }
`;

export const REX_NAVIGATION_ITEM_FRAGMENT = gql`
    fragment NavigationItemFragment on NavigationItem {
        id
        label
        url
        internal
        active
        parentId
    }
`;
