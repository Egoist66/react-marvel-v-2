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
    onCharSelected: (id: number) => void
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