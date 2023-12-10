import {useState} from "react";

type useCatchUIState = {
    isLoading: boolean
    error: boolean
}

export const useCatchUI = () => {
    const [state, setState] = useState<useCatchUIState>({
        error: false,
        isLoading: false
    })

    const onError = (isError: boolean) => {
        setState({
            ...state,
            isLoading: false,
            error: isError
        });
    };

    const onLoad = (isLoading: boolean) => {
        setState({
            ...state,
            isLoading,
            error: false
        });
    }

    return {
        onError,
        onLoad,
        ...state
    }
}