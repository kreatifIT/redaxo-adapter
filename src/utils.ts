export function parseModuleValues(values?: Record<number, any> | string): any {
    if (!values) return {};
    if (typeof values === 'string') return JSON.parse(values);
    return values;
}

export function getMediaUrl(media: string, imageType?: string) {
    const REDAXO_ROOT = import.meta.env.REDAXO_ROOT as string;
    if (imageType) {
        return `${REDAXO_ROOT}/media/${imageType}/${media}`;
    }
    return `${REDAXO_ROOT}/media/${media}`;
}
