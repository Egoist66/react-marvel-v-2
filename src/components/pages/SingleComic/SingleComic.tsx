import styled from "styled-components";
import {NavLink, useParams} from "react-router-dom";
import {memo, useEffect, useState} from "react";
import {ComicsListStateType} from "../Comics/ComicsList.tsx";
import {m_service} from "../../../services/mservice-api.ts";
import {useCatchUI} from "../../../hooks/useCatchUI.ts";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import Preloader from "../../preloader/preloader.tsx";

const StyledSingleComic = styled.div`


`

type SingleComicType = {
    comic: ComicsListStateType
}
const SingleComic = memo(() => {

    const {id} = useParams()
    const {isLoading, error, onError, onLoad} = useCatchUI()
    const [state, setState] = useState<SingleComicType>({
        comic: {
            comicsLink: '',
            id: '',
            description: '',
            pages: '',
            name: '',
            price: '',
            thumbnail: ''
        }
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

    console.log(isLoading)
    useEffect(() => {
        loadComic()
    }, [])

    return (
        <ErrorBoundary onTryhandler={loadComic} error={error}>
            <Preloader isLoading={isLoading} afterSpinner={() => (
                <StyledSingleComic className="single-comic">
                    <img src={state.comic.thumbnail} alt="x-men" className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{state.comic.name}</h2>
                        <p className="single-comic__descr">{state.comic.description}</p>
                        <p className="single-comic__descr">Pages: {state.comic.pages}</p>
                        <p className="single-comic__descr">Language: en-us</p>
                        <div className="single-comic__price">{state.comic.price}</div>
                    </div>
                    <NavLink to={'/comics'} className="single-comic__back">Back to all</NavLink>
                </StyledSingleComic>
            )}/>
        </ErrorBoundary>
    )
})

export default SingleComic;