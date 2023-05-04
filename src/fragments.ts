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

export const REX_SEO_FRAGMENT = gql`
    fragment SEOFragment on Seo {
        title
        description
        canonical
        robots
        image {
            ...MediaFragment
        }
        alternateLanguages {
            langCode
            url
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
        active
        priority
    }
`;

export const REX_ARTICLE_FRAGMENT = gql`
    fragment ArticleFragment on Article {
        id
        name
        url
        createDate
        updateDate
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
    }
`;

export const REX_CATEGORY_FRAGMENT = gql`
    fragment CategoryFragment on Category {
        id
        name
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
