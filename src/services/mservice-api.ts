import {DataRootCharacters, RootComics, RootFoundChar} from "../app-types/types.ts";
import {RandomID} from "../utils/randomId.ts";
import {MDataService} from "./mdata-service.ts";

type getAllCharsParams = {
    offset?: number,
    limit?: number
}
class MService extends MDataService {

    private _apiBase: string = 'https://gateway.marvel.com:443/v1/public/'
    private _apiKey: string = `apikey=${import.meta.env.VITE_API_KEY}`
    private _limitCount: number = 9
    private _charOffset: number = 210


    private async getResource(url: string, format: 'text' | 'json') {


        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        return await response[format]()

    }

    async getAllCharacters({offset = this._charOffset, limit = this._limitCount}: getAllCharsParams) {
        const chars: DataRootCharacters = await this.getResource(`${this._apiBase}characters?limit=${limit}
            &offset=${offset}
            &${this._apiKey}`.trim(), 'json'
        )

        const {data: {results}} = chars


        return this.transformCharsData(results)
    }

    async getCharacter(id: () => RandomID | null) {


        const char: DataRootCharacters = await this.getResource(`${this._apiBase}characters/${id()}?${this._apiKey}`, 'json')
        return this.transformCharData(char.data.results)

    }

    async getComics(limit = this._limitCount, offset = 150){
        const comics: RootComics = await this.getResource(`${this._apiBase}comics?limit=${limit}&offset=${offset}&${this._apiKey.trim()}`, 'json')

        return this.transformComicsData(comics.data.results)
    }


        async getSingleComic(id: string){
        const comic: RootComics = await this.getResource(`${this._apiBase}comics/${id}?${this._apiKey.trim()}`, 'json')

        return this.transformSingleComicData(comic.data.results)
    }

    async findSingleChar(name: string){
        const foundChar: RootFoundChar = await this.getResource(`${this._apiBase}characters?name=${name}&${this._apiKey.trim()}`, 'json')

        return this.transformFoundChar(foundChar.data.results)
    }




}

export const m_service = new MService()

