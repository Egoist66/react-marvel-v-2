import styled from "styled-components";
import {FC, memo, useEffect, useState} from "react";
import {m_service} from "../../services/mservice-api.ts";
import Preloader from "../preloader/preloader.tsx";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import {CharItems, CharListProps, CharListState} from "../../app-types/types.ts";
import {useCatchUI} from "../../hooks/useCatchUI.ts";


const StyledCharList = styled.div``

const CharList: FC<CharListProps> = memo(({selectedChar, onCharSelected}) => {

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


    return (
        <StyledCharList style={isLoading ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50%',
        } : {display: 'block'}} className={'char__list'}>

            <ErrorBoundary error={error} onTryhandler={loadChars}>

                <Preloader isLoading={isLoading} afterSpinner={() => (
                    <>

                        <ul className="char__grid">
                            {state.chars.length ? state.chars.map(char => {
                                return (
                                    <CharListItem
                                        onCharListSelect={onCharSelected}
                                        id={char.id}
                                        selectedChar={selectedChar}
                                        src={char.thumbnail}
                                        alt={char.name}
                                        name={char.name}
                                        key={char.id}
                                    />
                                )
                            }) : <h2>No characters were found!</h2>}
                        </ul>
                        <button style={{display: state.offset >= 1563 ? 'none' : 'block'}}
                                disabled={state.isPaginating}
                                onClick={incrementLimit(9)}
                                className="button button__main button__long">

                            <p className="inner">{state.isPaginating ? 'Loading...' : 'Load more'}</p>
                        </button>

                    </>

                )}/>

            </ErrorBoundary>

        </StyledCharList>
    )

})


type CharListItemProps = {
    src: string
    alt: string
    id: number
    selectedChar: number | null
    name: string
    onCharListSelect: (id: number) => void
}
const CharListItem: FC<CharListItemProps> = ({name, selectedChar, onCharListSelect, src, id, alt}) => {

    return (

        <li onFocus={() => onCharListSelect(id)} tabIndex={0} onClick={() => onCharListSelect(id)}
            style={{overflow: 'hidden'}}
            className={selectedChar === id ? 'char__item_selected char__item' : 'char__item'}>
            <img
                style={{
                    width: src?.endsWith('image_not_available.jpg') ? 230 : 200
                }}
                src={src}
                alt={alt}
            />
            <div className="char__name">{name}</div>
        </li>


    )
}

export default CharList;