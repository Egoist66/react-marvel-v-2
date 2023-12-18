import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import {m_service} from "../../services/mservice-api.ts";
import {useCatchUI} from "../../hooks/useCatchUI.ts";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import Preloader from "../preloader/preloader.tsx";
import {drawComicsThubmnail} from "../../utils/check-thumbnail.ts";


const StyledComicsList = styled.div`


`

export type ComicsListStateType = {
    comicsLink: string
    thumbnail: string
    name: string
    price: string
    id: string
}

type ComicsType = {
    comics: ComicsListStateType[]
}
const ComicsList: FC = () => {

    const {onError, error, isLoading, onLoad} = useCatchUI()
    const [state, setState] = useState<ComicsType>({
        comics: []
    })

    const loadComics = () => {
        onLoad(true)
        m_service.getComics()
            .then(comics => {
                setState({
                    ...state,
                    comics: [...comics]
                })
                onLoad(false)

            })
            .catch(onError)

    }


    useEffect(() => {
        loadComics()
    }, [])
    return (
        <StyledComicsList className="comics__list">
            <ErrorBoundary error={error} onTryhandler={() => {
            }}>
                <ul className="comics__grid">

                    <Preloader isLoading={isLoading} afterSpinner={() => (

                        <>
                            {state.comics ? state.comics.map(c => (
                                <li key={c.id} className="comics__item">
                                    <a href={c.comicsLink}>
                                        <img style={{objectFit: drawComicsThubmnail(c.thumbnail)}} src={c.thumbnail} alt="ultimate war" className="comics__item-img"/>
                                        <div className="comics__item-name">{c.name}</div>
                                        <div className="comics__item-price">{c.price}$</div>
                                    </a>
                                </li>
                            )): <h2>No comics exists...</h2>}


                        </>

                    )}/>

                </ul>
            </ErrorBoundary>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </StyledComicsList>
    )
}

export default ComicsList;