import type { NavigationItem } from './@types';
import GraphQLClient from './client';
import { REX_NAVIGATION_ITEM_FRAGMENT } from './fragments';
import { gql } from 'graphql-tag';

export async function getRootNavigation(
    clangId: string,
    id: string,
    depth: number,
) {
    const { data } = await GraphQLClient.query(
        REX_ROOT_NAVIGATION_QRY,
        {
            depth,
            articleId: id,
        },
        clangId,
    );
    return data.rootNavigation as NavigationItem[];
}

export async function getNavigation(
    clangId: string,
    articleId: string | undefined,
    name: string,
) {
    const { data } = await GraphQLClient.query(
        REX_NAVIGATION_QRY,
        {
            name,
            articleId,
        },
        clangId,
    );
    return data.navigation as NavigationItem[];
}

const REX_ROOT_NAVIGATION_QRY = gql`
    query rootNavigation($depth: Int!, $articleId: ID!) {
        rootNavigation(depth: $depth, articleId: $articleId) {
            ...NavigationItemFragment
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
`;

const REX_NAVIGATION_QRY = gql`
    query navigation($name: String!, $articleId: ID) {
        navigation(name: $name, articleId: $articleId) {
            ...NavigationItemFragment
        }
    }
    ${REX_NAVIGATION_ITEM_FRAGMENT}
`;
