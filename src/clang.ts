import { gql } from 'graphql-tag';
import { REX_CLANG_FRAGMENT } from './fragments';
import type { Clang } from './@types';
import RedaxoAdapter from './redaxo';

export async function getClangs(articleId: string, clangId: string) {
    const { data } = await RedaxoAdapter.query(
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
