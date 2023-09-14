import type { DocumentNode } from 'graphql';

export type GraphQLResponse = {
    data: any;
    errors?: any;
};

type RequestOptions = {
    disableCache?: boolean;
    bearerToken?: string;
    throwErrors?: boolean;
};

export class RedaxoAdapter {
    private static ENDPOINT: string;
    private static ROOT: string;
    private static AUTH_TOKEN: string | undefined;
    private static CACHE = new Map<string, any>();
    private static ALLOW_CACHE = false;

    public static init(
        endpoint: string,
        root: string,
        authToken?: string,
        allowCache?: boolean,
    ): void {
        this.ENDPOINT = endpoint;
        this.ROOT = root;
        this.AUTH_TOKEN = authToken;
        this.ALLOW_CACHE = allowCache || false;
    }

    public static async query(
        query: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
        options: RequestOptions = {},
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                query: query.loc?.source.body,
                variables,
            },
            clangId,
            {
                throwErrors: true,
                disableCache: false,
                ...options,
            },
        );
    }

    public static async mutate(
        mutation: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
        options: RequestOptions = {},
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                query: mutation.loc?.source.body,
                variables,
            },
            clangId,
            {
                throwErrors: false,
                disableCache: true,
                ...options,
            },
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
        options: RequestOptions,
    ): Promise<GraphQLResponse> {
        const useCache = this.ALLOW_CACHE && !options.disableCache;
        const authToken = options.bearerToken || this.AUTH_TOKEN;
        const cacheKey = JSON.stringify({
            clangId,
            body,
        });
        return new Promise((resolve, reject) => {
            if (useCache) {
                const entry = this.CACHE.get(cacheKey);
                if (entry) {
                    resolve(entry);
                }
            }
            fetch(this.getGraphQLEndpoint(clangId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken ? `Bearer ${authToken}` : '',
                },
                body: JSON.stringify(body),
            })
                .then((res) => {
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
                    if (res.errors && options.throwErrors) {
                        const errorMessages = res.errors
                            .map((e: any) => e.message)
                            .join('\n');
                        throw new Error(
                            `[RedaxoAdapter] Error(s) in GraphQL response:\n${errorMessages}\n\n---\n\nReceived Response:\n` +
                                JSON.stringify(res.errors, null, 2),
                        );
                    } else {
                        if (useCache) {
                            this.CACHE.set(cacheKey, res);
                        }
                        resolve(res);
                    }
                });
        });
    }

    public static getRedaxoRoot(): string {
        return this.ROOT.replace(/\/$/g, '');
    }
}
