import { gql } from 'graphql-tag';
import type { Wildcard } from './@types';
import GraphQLClient from './client';

export async function getWildcards(clangId: string) {
    const { data } = await GraphQLClient.query(REX_WILDCARDS_QRY, {}, clangId);
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
