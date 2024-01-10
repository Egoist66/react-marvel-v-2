import styled from "styled-components";
import {FC, memo} from "react";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import Preloader from "../../preloader/preloader.tsx";
import {drawComicsThubmnail} from "../../../utils/check-thumbnail.ts";
import AppBanner from "../../appBanner/AppBanner.tsx";
import {Button} from "../../reusable/Button.tsx";
import {NavLink} from "react-router-dom";
import {useTitle} from "../../../hooks/useTitle.ts";
import {useComics} from "../../../hooks/useComics.ts";


const StyledComicsList = styled.div`


`


const ComicsList: FC = memo(() => {

    useTitle('Comics')
    const {
        error,
        loadComics,
        incrementLimit,
        comics,
        isPaginating
    } = useComics()

    return (
        <>
            <AppBanner/>

            <StyledComicsList className="comics__list">

                <ErrorBoundary error={error} onTryhandler={loadComics}>
                    <Preloader isLoading={!comics.length} afterSpinner={() => (
                        <ul className="comics__grid">

                            {comics ? comics.map((c, i) => (
                                <li key={i} className="comics__item">
                                    <NavLink to={`/comics/${c.id}`}>
                                        <img  style={{objectFit: drawComicsThubmnail(c.thumbnail)}} src={c.thumbnail}
                                             alt={c.name} className="comics__item-img"/>
                                        <div className="comics__item-name">{c.name}</div>
                                        <div className="comics__item-price">{c.price}</div>
                                    </NavLink>
                                </li>
                            )) : <h2>No comics found...</h2>}


                        </ul>
                    )}/>
                </ErrorBoundary>
                <Button disabled={isPaginating} onClick={incrementLimit(9)} className="button__main button__long">
                    {isPaginating ? 'Loading...' : 'Load more'}
                </Button>
            </StyledComicsList>

        </>
    )
})

export default ComicsList;