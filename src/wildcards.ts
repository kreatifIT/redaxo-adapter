import { gql } from 'graphql-tag';
import type { Wildcard } from './@types';
import { RedaxoAdapter } from './adapter';

export async function getWildcards(clangId: string) {
    const { data } = await RedaxoAdapter.query(REX_WILDCARDS_QRY, {}, clangId);
    return data.wildCards as Wildcard[];
}

export const REX_WILDCARDS_QRY = gql`
    query WildCards {
        wildCards {
            id
            wildcard
            replace
        }
    }
`;
