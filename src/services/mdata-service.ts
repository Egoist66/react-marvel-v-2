import {RootCharactersType, CharItems, ComicsResult} from "../app-types/types";
import {cutString} from "../utils/string-cut";
import {ComicsListStateType} from "../components/pages/comicsList/ComicsList.tsx";


export class MDataService {

    /**
     *
     *
     * @protected
     * @param {RootCharactersType[]} results
     * @memberof MDataService
     */
    protected transformCharData = (results: RootCharactersType[]) => {
        return {
            char: {
                id: results[0].id,
                name: results[0]?.name,
                comics: results[0].comics,
                description: cutString(results[0]?.description) || 'No description',
                thumbnail: `${results[0]?.thumbnail?.path}.${results[0]?.thumbnail.extension}`,
                wiki: results[0]?.urls.find(u => u.type === 'wiki')?.url,
                homepage: results[0]?.urls.find(u => u.type === 'homepage')?.url,
            }

        }
    }
    /**
     *
     *
     * @protected
     * @param {RootCharactersType[]} results
     * @memberof MDataService
     */
    protected transformCharsData = (results: RootCharactersType[]) => {

        return results.map(r => {

            const transformedChars: CharItems = {
                id: r?.id,
                name: r?.name || 'No name',
                description: cutString(r?.description) || 'No description',
                thumbnail: `${r?.thumbnail?.path}.${r?.thumbnail.extension}`,
                wiki: r?.urls.find(u => u.type === 'wiki')?.url,
                homepage: r?.urls.find(u => u.type === 'homepage')?.url,
            }
            return transformedChars
        })

    }
    protected transformComicsData = (results: ComicsResult[]) => {

        return results.map(r => {

            const transformedChars: ComicsListStateType = {
                comicsLink: r.resourceURI,
                name: r.title,
                id: r.id,
                price: r.prices[0].price,
                thumbnail: `${r?.thumbnail?.path}.${r?.thumbnail.extension}`
            }
            return transformedChars
        })
    }

}
