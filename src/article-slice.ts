import { gql } from 'graphql-tag';
import { REX_ARTICLE_SLICE_FRAGMENT } from './fragments';

export const REX_ARTICLE_SLICE_QRY = gql`
    query articleSlice($id: ID!) {
        articleSlice(id: $id) {
            ...ArticleSliceFragment
        }
    }
    ${REX_ARTICLE_SLICE_FRAGMENT}
`;
