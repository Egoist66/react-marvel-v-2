import styled from "styled-components";
import {FC, memo} from "react";
import Preloader from "../preloader/preloader.tsx";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import {CharListItemProps, CharListProps} from "../../app-types/types.ts";
import {useCharList} from "../../hooks/useCharList.ts";
import {Button} from "../reusable/Button.tsx";


const StyledCharList = styled.div``

const CharList: FC<CharListProps> = memo(({selectedChar, onCharSelect}) => {

    const {
        isLoading,
        error,
        incrementLimit,
        loadChars,
        isPaginating,
        offset,
        chars
    } = useCharList()


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
                            {chars.length ? chars.map(char => {
                                return (
                                    <CharListItem
                                        onCharListSelect={onCharSelect}
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
                        <Button style={{display: offset >= 1563 ? 'none' : 'block'}} onClick={incrementLimit(9)}
                                className="button__main button__long">

                            <p>{isPaginating ? 'Loading...' : 'Load more'}</p>
                        </Button>

                    </>

                )}/>

            </ErrorBoundary>

        </StyledCharList>
    )

})


const CharListItem: FC<CharListItemProps> = memo(({name, selectedChar, onCharListSelect, src, id, alt}) => {

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
})

export default CharList;