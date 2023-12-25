import {useEffect, useState} from "react";
import {m_service} from "../services/mservice-api.ts";
import {useCatchUI} from "./useCatchUI.ts";
import {ComicsType} from "../app-types/types.ts";

export const useComics = () => {
    const {onError, error, isLoading} = useCatchUI()

    const [state, setState] = useState<ComicsType>({
        comics: [],
        isPaginating: false,
        offset: 150,
    })



    const incrementLimit = (count: number) => {
        return () => {
            setState((prevState) => (
                {
                    ...prevState,
                    offset: prevState.offset + count

                }
            ))
        }
    }


    const loadComics = () => {
        setState({
            ...state,
            isPaginating: true
        })

        m_service.getComics(9, state.offset)
            .then(newcomics => {
                setState((prevState) => ({
                    ...prevState,
                    comics: [...state.comics, ...newcomics],
                    isPaginating: false,
                }))
            })
            .catch((e) => {
                setState({
                    ...state,
                    isPaginating: false,
                })
                onError(true)
                console.log(e)
            })

    }



    useEffect(() => {

        loadComics()

    }, [state.offset])

    const {comics, isPaginating} = state

    return {
        isLoading,
        error,
        loadComics,
        incrementLimit,
        isPaginating,
        comics,
    }
}