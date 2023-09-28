export type Article = {
    id: string;
    name: string;
    slices: ArticleSlice[];
    startArticle: boolean;
    siteStartArticle: boolean;
    url: string;
    link: Link;
    clang: Clang;
    createdAt: string;
    updatedAt: string;
    breadcrumbs: Breadcrumb[];
    online: boolean;
};

export type ArticleSlice = {
    id: string;
    moduleCode: string;
    values?: any;
    media?: any;
    mediaList?: any;
    link?: any;
    linkList?: any;
    online: boolean;
};

export type Category = {
    id: string;
    name: string;
    url: string;
    startArticle: Article;
    articles: Article[];
    children: Category[];
    online: boolean;
};

export type Clang = {
    id: string;
    code: string;
    active: boolean;
    url: string;
    online: boolean;
};

export type Link = {
    url: string;
    label: string;
    target: string;
    type: string;
};

export type Media = {
    id: string;
    filename: string;
    focusPoint: number[];
    title: string;
    alt: string;
    src: string;
    srcset: string;
    width: number;
    height: number;
};

export type ArticleIncludes = {
    slices?: boolean;
    clang?: boolean;
    metadata?: boolean;
    breadcrumbs?: boolean;
};

export type CategoryIncludes = {
    articles?: boolean;
    children?: boolean;
    startArticle?: boolean;
};

export type Wildcard = {
    id: string;
    wildcard: string;
    replace: string;
};

export type Metadata = {
    title: string;
    description: string;
    robots: string;
    canonical: string;
    image: Media;
    createdAt: string;
    updatedAt: string;
    breadcrumbs: Breadcrumb[];
};

export type NavigationItem = {
    id: string;
    label: string;
    url: string;
    parentId: string;
    internal: boolean;
    active: boolean;
};

export type Breadcrumb = {
    label: string;
    url: string;
};

export type Forward = {
    url: string;
    status: number;
};

export type ContentType = {
    type: string;
    elementId: string;
    clangs: Clang[];
    metadata: Metadata;
    relatedArticle?: Article;
};
