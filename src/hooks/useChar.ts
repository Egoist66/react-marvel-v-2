import {useCatchUI} from "./useCatchUI.ts";
import {useCallback, useState} from "react";
import {RandomCharState} from "../app-types/types.ts";
import {randomId} from "../utils/randomId.ts";
import {m_service} from "../services/mservice-api.ts";

export const useChar = (charID?: number) => {
    const {onError, onLoad, error, isLoading} = useCatchUI()
    const [state, setState] = useState<RandomCharState>({
        char: {
            description: null,
            homepage: "",
            name: null,
            comics: null,
            thumbnail: "",
            wiki: "",
        },
    })


    const loadRandomChar = () => {
        onLoad(true)

            m_service
                .getCharacter(randomId)
                .then((char) => {
                    setState({
                        ...state,
                        ...char,
                    });
                    onLoad(false)
                })
                .catch(onError);
        }




    const loadCharInfo = useCallback((id?: number) => {
        onLoad(true)

        m_service
            .getCharacter(() => id ? id : charID!)
            .then((char) => {
                setState({
                    ...state,
                    ...char,
                });
                onLoad(false)
            })
            .catch(onError);
    }, [charID])




    return {
        loadRandomChar,
        loadCharInfo,
        isLoading,
        error,
        ...state
    }
}