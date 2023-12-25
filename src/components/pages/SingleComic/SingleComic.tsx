import styled from "styled-components";
import {NavLink, useParams} from "react-router-dom";
import {memo} from "react";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import Preloader from "../../preloader/preloader.tsx";
import {useTitle} from "../../../hooks/useTitle.ts";
import {useComic} from "../../../hooks/useComic.ts";

const StyledSingleComic = styled.div`


`


const SingleComic = memo(() => {

    const {id} = useParams()
    const {
        loadComic,
        error,
        isLoading,
        comic
    } = useComic(id)

    useTitle(`Comic - ${comic.name}`,
        [id, comic.name]
    )



    return (
        <ErrorBoundary onTryhandler={loadComic} error={error}>
            <Preloader isLoading={isLoading} afterSpinner={() => (
                <StyledSingleComic className="single-comic">
                    <img src={comic.thumbnail} alt={comic.name} className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{comic.name}</h2>
                        <p className="single-comic__descr">{comic.description}</p>
                        <p className="single-comic__descr">Pages: {comic.pages}</p>
                        <p className="single-comic__descr">Language: en-us</p>
                        <div className="single-comic__price">{comic.price}</div>
                    </div>
                    <NavLink to={'/comics'} className="single-comic__back">Back to all</NavLink>
                </StyledSingleComic>
            )}/>
        </ErrorBoundary>
    )
})

export default SingleComic;