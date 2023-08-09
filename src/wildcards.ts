import { gql } from 'graphql-tag';
import type { Wildcard } from './@types';
import { RedaxoAdapter } from './adapter';

export async function getWildcards(clangId: string) {
    const { data } = await RedaxoAdapter.query(REX_WILDCARDS_QRY, {}, clangId);
    return data.wildCards as Wildcard[];
}

export async function getWildcard(
    key: string,
    clangId: string,
): Promise<string | null> {
    const { data } = await RedaxoAdapter.query(
        REX_WILDCARD_QRY,
        { key },
        clangId,
    );
    return (data.wildCard?.replace as string) ?? null;
}

export async function getSelectedWildcards(
    clangId: string,
    keys: string[],
): Promise<Wildcard[]> {
    const { data } = await RedaxoAdapter.query(
        SELECTED_WILDCARDS_QRY,
        {
            keys,
        },
        clangId,
    );
    return data.selectedWildCards;
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

export const REX_WILDCARD_QRY = gql`
    query WildCard($key: String!) {
        wildCard(key: $key) {
            replace
        }
    }
`;

export const SELECTED_WILDCARDS_QRY = gql`
    query SelectedWildCards($keys: [String!]!) {
        selectedWildCards(keys: $keys) {
            id
            replace
            wildcard
        }
    }
`;
