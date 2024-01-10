import {RootCharactersType, CharItems, ComicsResult, ComicsListStateType, ResultFound} from "../app-types/types";
import {cutString} from "../utils/string-cut";
import {FoundCharState} from "../components/charInfo/CharForm.tsx";


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
                comicsLink: r?.resourceURI,
                name: r?.title,
                description: r?.description || 'There is no description',
                id: r.id,
                pages: r?.pageCount,
                price: r?.prices[0]?.price + '$' || 'No price',
                thumbnail: `${r?.thumbnail?.path}.${r?.thumbnail.extension}`
            }
            return transformedChars
        })
    }
    protected transformSingleComicData = (results: ComicsResult[]) => {

        return {
            comic: {
                comicsLink: results[0]?.resourceURI,
                name: results[0]?.title,
                description: results[0]?.description || 'There is no description',
                id: results[0]?.id,
                pages: results[0]?.pageCount,
                price: results[0]?.prices[0]?.price + '$' || 'No price',
                thumbnail: `${results[0]?.thumbnail?.path}.${results[0]?.thumbnail.extension}`
            }
        }
    }

    protected transformFoundChar = (results: ResultFound[]) => {
        const result: FoundCharState = {
            id: results[0]?.id ?? null,
            message: results.length <= 0 ? 'Such character does not exist' : 'Here it is!'

        }
        return result
    }

}
