import {CharViewProps} from "../app-types/types.ts";

export const drawCharThubmnail = ({char}: CharViewProps) => {
    
    return char.thumbnail?.endsWith('image_not_available.jpg') ? 'contain' : 'cover'
}

export const drawComicsThubmnail = (thumbnail: string) => {

    return thumbnail?.endsWith('image_not_available.jpg') ? 'contain' : 'cover'
}