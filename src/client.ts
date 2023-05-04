import type { DocumentNode } from 'graphql';

export type GraphQLResponse = {
    data: any;
    errors?: any;
};

export default class GraphQLClient {
    public static async query(
        query: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return new Promise((resolve) => {
            this.executeRequest(
                {
                    query: query.loc?.source.body,
                    variables,
                },
                clangId,
            ).then((res) => {
                resolve(res);
            });
        });
    }

    public static async mutate(
        mutation: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                mutation: mutation.loc?.source.body,
                variables,
            },
            clangId,
        );
    }

    private static getGraphQLEndpoint(clangId: string): string {
        const base = import.meta.env.REDAXO_ENDPOINT as string;
        if (!base) {
            throw new Error(
                'No GraphQL endpoint defined. Please initialize the GraphQLClient correctly.',
            );
        }
        return base.replace('{{clangId}}', clangId);
    }

    private static executeRequest(
        body: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return fetch(this.getGraphQLEndpoint(clangId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.text();
            })
            .then((res) => {
                if (res.errors) {
                    console.error(
                        'GraphQL request failed. Response:\n',
                        JSON.stringify(res.errors, null, 2),
                    );
                }
                return res;
            })
            .catch((err) => {
                return { errors: err, data: {} };
            });
    }
}
