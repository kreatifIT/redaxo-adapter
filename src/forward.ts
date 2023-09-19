import {REX_FORWARD_FRAGMENT} from "./fragments";
import {RedaxoAdapter} from "./adapter";
import {type Forward} from "./@types";
import {gql} from "graphql-tag";

const FORWARD_QRY = gql`
    query Forward($id: ID!) {
        forward(id: $id) {
            ...ForwardFragment
        }
    }
    ${REX_FORWARD_FRAGMENT}
`;

const REDIRECT_QRY = gql`
    query redirect($id: ID!) {
        articleRedirect(id: $id) {
            ...ForwardFragment
        }
    }
    ${REX_FORWARD_FRAGMENT}
`;

export async function getForward(id: string, clangId: string): Promise<Forward> {
    const {data} = await RedaxoAdapter.query(FORWARD_QRY, {id}, clangId);
    return data.forward;
}

export async function getArticleRedirect(id: string, clangId: string): Promise<Forward> {
    const {data} = await RedaxoAdapter.query(REDIRECT_QRY, {id}, clangId);
    return data.articleRedirect;
}
