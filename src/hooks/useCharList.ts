import {useCatchUI} from "./useCatchUI.ts";
import {useEffect, useState} from "react";
import {CharItems, CharListState} from "../app-types/types.ts";
import {m_service} from "../services/mservice-api.ts";

export const useCharList = () => {

    const {onError, onLoad, error, isLoading} = useCatchUI()
    const [state, setState] = useState<CharListState>({
        isPaginating: false,
        offset: 210,
        chars: []
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


    const loadChars = () => {
        onLoad(true)

        m_service
            .getAllCharacters({})
            .then(onCharLoaded)
            .catch(onError)


    };

    const paginateChars = () => {
        setState({
            ...state,
            isPaginating: true
        })

        m_service.getAllCharacters({offset: state.offset})
            .then(newchars => {
                setState((prevState) => ({
                    ...prevState,
                    chars: [...state.chars, ...newchars],
                    isPaginating: false,
                }))
                onLoad(false)
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

    const onCharLoaded = (chars: CharItems[]) => {
        setState((prevState) => ({
            ...prevState,
            chars: [...chars],
        }))
    }

    useEffect(() => {
        loadChars()
    }, [])


    useEffect(() => {

        paginateChars()

    }, [state.offset])

    return {
        incrementLimit,
        loadChars,
        isLoading,
        error,
        ...state
    }
}