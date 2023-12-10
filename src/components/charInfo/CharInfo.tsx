import styled from "styled-components";
import {FC, memo, useCallback, useEffect, useState} from "react";
import {m_service} from "../../services/mservice-api";
import {drawCharThubmnail} from "../../utils/check-thumbnail";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import Skeleton from "../skeleton/Skeleton";
import {CharComicsInfoProps, CharInfoProps, RandomCharState} from "../../app-types/types.ts";
import {useCatchUI} from "../../hooks/useCatchUI.ts";

const StyledCharInfo = styled.div``;


const CharInfo: FC<CharInfoProps> = memo(({charId}) => {

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

    const loadCharInfo = useCallback(() => {
        onLoad(true)

        m_service
            .getCharacter(() => charId)
            .then((char) => {
                setState({
                    ...state,
                    ...char,
                });
                onLoad(false)
            })
            .catch(onError);
    }, [charId])


    useEffect(() => {
        if(charId === null){
            return
        }
        loadCharInfo()
    }, [charId])


    return (
        <StyledCharInfo className={"char__info"}>
            {!charId ? (

                <StyledCharInfo className={"char__info"}>
                    <Skeleton/>
                </StyledCharInfo>
            ) : (
                <CharComicsInfoView
                    char={state.char}
                    error={error}
                    isLoading={isLoading}
                    loadCharInfo={loadCharInfo}
                />
            )}
        </StyledCharInfo>
    );

})

export default CharInfo;



const CharComicsInfoView: FC<CharComicsInfoProps> = memo(({char, loadCharInfo, isLoading, error,}) => {
    const {comics, description, homepage, name, thumbnail, wiki} = char;
    return (
        <ErrorBoundary onTryhandler={loadCharInfo} error={error}>
            <Preloader
                isLoading={isLoading}
                afterSpinner={() => (
                    <>
                        <div className="char__basics">
                            <img
                                style={{objectFit: drawCharThubmnail({char})}}
                                src={thumbnail}
                                alt={name ? name : ""}
                            />
                            <div>
                                <div className="char__info-name">{name}</div>
                                <div className="char__btns">
                                    <a href={homepage} className="button button__main">
                                        <div className="inner">homepage</div>
                                    </a>
                                    <a href={wiki} className="button button__secondary">
                                        <div className="inner">Wiki</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="char__descr">{description}</div>
                        <div className="char__comics">Comics:</div>
                        <ul className="char__comics-list">
                            {comics?.items.length ? comics?.items.map((c, i: number) => {
                                if (i >= 10) return

                                return (
                                    <li key={c.name} className="char__comics-item">
                                        <a target="_blank" href={c.resourceURI}>{c.name}</a>
                                    </li>
                                )
                            }) : 'No comics for this character'}


                        </ul>
                    </>
                )}
            />
        </ErrorBoundary>
    );
})
