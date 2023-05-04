import { gql } from 'graphql-tag';
import { REX_CLANG_FRAGMENT } from './fragments';
import type { Clang } from './@types';
import GraphQLClient from './client';

export async function getClangs(articleId: string, clangId: string) {
    const { data } = await GraphQLClient.query(
        REX_CLANG_QRY,
        {
            articleId,
        },
        clangId,
    );
    return data.clangs as Clang[];
}

const REX_CLANG_QRY = gql`
    query clangs($articleId: ID!) {
        clangs(articleId: $articleId) {
            ...ClangFragment
        }
    }
    ${REX_CLANG_FRAGMENT}
`;
