export interface GoogleSearchItem {
    title: string,
    link: string,
    snippet: string,
}

export interface GoogleSearchResponse {
    items: GoogleSearchItem[]
}