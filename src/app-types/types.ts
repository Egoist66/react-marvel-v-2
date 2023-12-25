export interface RootCharactersType {


    id: number
    name: string
    description: string
    modified: string
    thumbnail: Thumbnail
    resourceURI: string
    comics: Comics
    series: Series
    stories: Stories
    events: Events
    urls: Url[]

}

export interface Thumbnail {
    path: string
    extension: string
}

export interface Comics {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
}

export interface Item {
    resourceURI: string
    name: string
}

export interface Series {
    available: number
    collectionURI: string
    items: Item2[]
    returned: number
}

export interface Item2 {
    resourceURI: string
    name: string
}

export interface Stories {
    available: number
    collectionURI: string
    items: Item3[]
    returned: number
}

export interface Item3 {
    resourceURI: string
    name: string
    type: string
}

export interface Events {
    available: number
    collectionURI: string
    items: Item4[]
    returned: number
}

export interface Item4 {
    resourceURI: string
    name: string
}

export interface Url {
    type: string
    url: string
}


export interface DataWrapper {

    offset: number
    limit: number
    total: number
    count: number,
    results: RootCharactersType[]

}

export interface DataRootCharacters {
    code: number
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    etag: string
    data: DataWrapper

}




export interface CharListState {
    offset: number
    isPaginating: boolean
    chars: CharItems[]
}

export interface CharItems {
    id: number
    description: string,
    homepage: string | undefined,
    name: string,
    thumbnail: string,
    wiki: string | undefined,
}

export interface CharListProps {
    onCharSelect: (id: number) => void
    selectedChar: number | null
}


export interface CharInner {
    name: string | null;
    description: string | null;
    thumbnail: string | undefined;
    homepage: string | undefined;
    wiki: string | undefined;
    comics: Comics | null
}

export interface RandomCharState {
    char: CharInner;
}

export type CharViewProps = {
    char: {
        name: string | null;
        description: string | null;
        thumbnail: string | undefined;
        homepage: string | undefined;
        comics: Comics | null
        wiki: string | undefined;
    };
};

export interface CharInfoProps  {
    charId: number | null;
}

export interface CharComicsInfoProps extends RandomCharState {
    loadCharInfo: () => void;
    isLoading: boolean
    error: boolean
}

export type CharListItemProps = {
    src: string
    alt: string
    id: number
    selectedChar: number | null
    name: string
    onCharListSelect: (id: number) => void
}

// Comics

export interface RootComics {
    code: string
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    data: ComicsData
    etag: string
}

export interface ComicsData {
    offset: string
    limit: string
    total: string
    count: string
    results: ComicsResult[]
}

export interface ComicsResult {
    id: string
    digitalId: string
    title: string
    issueNumber: string
    variantDescription: string
    description: string
    modified: string
    isbn: string
    upc: string
    diamondCode: string
    ean: string
    issn: string
    format: string
    pageCount: string
    textObjects: TextObject[]
    resourceURI: string
    urls: Url[]
    series: Series
    variants: Variant[]
    collections: Collection[]
    collectedIssues: CollectedIssue[]
    dates: Date[]
    prices: Price[]
    thumbnail: Thumbnail
    images: Image[]
    creators: Creators
    characters: Characters
    stories: ComicsStories
    events: ComicsEvents
}

export interface TextObject {
    type: string
    language: string
    text: string
}

export interface Url {
    type: string
    url: string
}

export interface Series {
    resourceURI: string
    name: string
}

export interface Variant {
    resourceURI: string
    name: string
}

export interface Collection {
    resourceURI: string
    name: string
}

export interface CollectedIssue {
    resourceURI: string
    name: string
}

export interface Date {
    type: string
    date: string
}

export interface Price {
    type: string
    price: string
}

export interface Thumbnail {
    path: string
    extension: string
}

export interface Image {
    path: string
    extension: string
}

export interface Creators {
    available: string
    returned: string
    collectionURI: string
    items: Item[]
}

export interface Item {
    resourceURI: string
    name: string
    role: string
}

export interface Characters {
    available: string
    returned: string
    collectionURI: string
    items: Item2[]
}

export interface Item2 {
    resourceURI: string
    name: string
    role: string
}

export interface ComicsStories {
    available: string
    returned: string
    collectionURI: string
    items: Item3[]
}

export interface Item3 {
    resourceURI: string
    name: string
    type: string
}

export interface ComicsEvents {
    available: string
    returned: string
    collectionURI: string
    items: Item4[]
}

export interface Item4 {
    resourceURI: string
    name: string
}


export type ComicsListStateType = {
    comicsLink: string
    thumbnail: string
    description: string
    name: string
    pages: number | string
    price: string
    id: string
}

export type ComicsType = {
    comics: ComicsListStateType[]
    isPaginating: boolean
    offset: number
}

export type SingleComicType = {
    comic: ComicsListStateType
}