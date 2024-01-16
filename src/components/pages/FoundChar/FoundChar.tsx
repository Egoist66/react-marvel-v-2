import styled from "styled-components";
import {NavLink, useParams} from "react-router-dom";
import {memo, useEffect} from "react";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import Preloader from "../../preloader/preloader.tsx";
import {useChar} from "../../../hooks/useChar.ts";
import {Helmet} from 'react-helmet'

const StyledFoundChar = styled.div`


`


const FoundChar = memo(() => {

    const {id} = useParams()
    const {isLoading, error, char, loadCharInfo} = useChar()


    useEffect(() => {
        console.log('effect')
        loadCharInfo(+id!)
    }, [])


    return (

        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Character - ${char.name ?? ''}`}</title>
                <meta name="description" content="Page with character description" />
                <link rel="canonical" href="/characters" />
            </Helmet>


            <ErrorBoundary onTryhandler={() => loadCharInfo(+id!)} error={error}>
                <Preloader isLoading={isLoading} afterSpinner={() => (
                    <StyledFoundChar className="single-comic">
                        <img src={char.thumbnail} alt={char.name!} className="single-comic__img"/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{char.name}</h2>
                            <p className="single-comic__descr">{char.description}</p>
                        </div>
                        <NavLink to={'/'} className="single-comic__back">Back to home</NavLink>
                    </StyledFoundChar>
                )}/>
            </ErrorBoundary>

        </>
    )
})

export default FoundChar;