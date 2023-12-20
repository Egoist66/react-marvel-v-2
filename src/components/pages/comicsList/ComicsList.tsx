import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import {m_service} from "../../../services/mservice-api.ts";
import {useCatchUI} from "../../../hooks/useCatchUI.ts";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import Preloader from "../../preloader/preloader.tsx";
import {drawComicsThubmnail} from "../../../utils/check-thumbnail.ts";
import AppBanner from "../../appBanner/AppBanner.tsx";


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
    isPaginating: boolean
    offset: number
}
const ComicsList: FC = () => {

    const {onError, error, isLoading, onLoad} = useCatchUI()
    const [state, setState] = useState<ComicsType>({
        comics: [],
        isPaginating: false,
        offset: 150,
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


    const paginateComics = () => {
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

    useEffect(() => {
        loadComics()
    }, [])

    useEffect(() => {

        paginateComics()

    }, [state.offset])
    return (
        <>
            <AppBanner/>

            <StyledComicsList className="comics__list">

                <ErrorBoundary error={error} onTryhandler={loadComics}>
                    <Preloader isLoading={isLoading} afterSpinner={() => (
                        <ul className="comics__grid">

                            {state.comics ? state.comics.map((c, i) => (
                                <li key={i} className="comics__item">
                                    <a target={'_blank'} href={c.comicsLink}>
                                        <img style={{objectFit: drawComicsThubmnail(c.thumbnail)}} src={c.thumbnail}
                                             alt="ultimate war" className="comics__item-img"/>
                                        <div className="comics__item-name">{c.name}</div>
                                        <div className="comics__item-price">{c.price}$</div>
                                    </a>
                                </li>
                            )) : <h2>No comics exists...</h2>}


                        </ul>
                    )}/>
                </ErrorBoundary>
                <button onClick={incrementLimit(9)} className="button button__main button__long">
                    <div className="inner">{state.isPaginating ? 'Loading...' : 'Load more'}</div>
                </button>
            </StyledComicsList>

        </>
    )
}

export default ComicsList;