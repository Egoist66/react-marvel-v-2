import {m_service} from "../services/mservice-api.ts";
import {useEffect, useState} from "react";
import {SingleComicType} from "../app-types/types.ts";
import {useCatchUI} from "./useCatchUI.ts";

export const useComic = (id: string | undefined) => {

    const {onError, error, isLoading, onLoad} = useCatchUI()
    const [state, setState] = useState<SingleComicType>({
        comic: {
            comicsLink: '',
            id: '',
            description: '',
            pages: '',
            name: '',
            price: '',
            thumbnail: ''
        },
    })

    const loadComic = () => {
        onLoad(true)
        m_service.getSingleComic(id!)
            .then(({comic}) => {
                setState({
                    ...state,
                    comic: {...comic}
                })
                onLoad(false)
            })
            .catch(onError)

    }

    useEffect(() => {
        loadComic()
    }, [id])

    const {comic} = state
    return {
        error,
        isLoading,
        comic,
        loadComic,

    }
}