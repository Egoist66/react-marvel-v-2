import { CharViewProps } from "../components/randomChar/RandomChar"

export const drawCharThubmnail = ({char}: CharViewProps) => {
    
    return char.thumbnail?.endsWith('image_not_available.jpg') ? 'contain' : 'cover'
}