import { gql } from 'graphql-tag';
import { REX_MEDIA_FRAGMENT } from './fragments';
import GraphQLClient from './client';
import type { Media } from './@types';

export async function getMedia(
    name: string,
    mediaType: string,
    clangId: string,
) {
    const { data } = await GraphQLClient.query(
        REX_MEDIA_QRY,
        {
            name,
            mediaType,
        },
        clangId,
    );
    return data.media as Media;
}

const REX_MEDIA_QRY = gql`
    query Media($name: String!, $mediaType: String!) {
        media(name: $name, mediaType: $mediaType) {
            ...MediaFragment
        }
    }
    ${REX_MEDIA_FRAGMENT}
`;
