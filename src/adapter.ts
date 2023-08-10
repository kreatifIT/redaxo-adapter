import type { DocumentNode } from 'graphql';

export type GraphQLResponse = {
    data: any;
    errors?: any;
};

export class RedaxoAdapter {
    private static ENDPOINT: string;
    private static ROOT: string;
    private static AUTH_TOKEN: string | undefined;

    public static init(
        endpoint: string,
        root: string,
        authToken?: string,
    ): void {
        this.ENDPOINT = endpoint;
        this.ROOT = root;
        this.AUTH_TOKEN = authToken;
    }

    public static async query(
        query: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                query: query.loc?.source.body,
                variables,
            },
            clangId,
        );
    }

    public static async mutate(
        mutation: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                query: mutation.loc?.source.body,
                variables,
            },
            clangId,
            false,
        );
    }

    private static getGraphQLEndpoint(clangId: string): string {
        const base = this.ENDPOINT;
        if (!base) {
            throw new Error(
                '[RedaxoAdapter] No GraphQL endpoint defined. Please initialize the RedaxoAdapter.',
            );
        }
        return base.replace('{{clangId}}', clangId);
    }

    private static executeRequest(
        body: Record<string, any>,
        clangId: string,
        throwErrors = true,
    ): Promise<GraphQLResponse> {
        return fetch(this.getGraphQLEndpoint(clangId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.AUTH_TOKEN
                    ? `Bearer ${this.AUTH_TOKEN}`
                    : '',
            },
            body: JSON.stringify({
                ...body,
            }),
        })
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                }
                throw new Error(
                    `[RedaxoAdapter] Failed to connect to GraphQL endpoint "${this.getGraphQLEndpoint(
                        clangId,
                    )}".\n(${res.status} ${res.statusText})`,
                );
            })
            .then((res) => {
                if (res.errors && throwErrors) {
                    const errorMessages = res.errors
                        .map((e: any) => e.message)
                        .join('\n');
                    throw new Error(
                        `[RedaxoAdapter] Error(s) in GraphQL response:\n${errorMessages}\n\n---\n\nReceived Response:\n` +
                            JSON.stringify(res.errors, null, 2),
                    );
                }
                return res;
            });
    }

    public static getRedaxoRoot(): string {
        return this.ROOT;
    }
}
