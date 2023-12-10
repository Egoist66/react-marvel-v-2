import mjolnir from "../../assets/images/mjolnir.png";
import styled from "styled-components";
import {FC, memo, useEffect, useState} from "react";
import {m_service} from "../../services/mservice-api";
import {randomId} from "../../utils/randomId";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import {CharViewProps, RandomCharState} from "../../app-types/types";
import {drawCharThubmnail} from "../../utils/check-thumbnail";

const StyledRandomChar = styled.div``;


const RandomChar: FC = memo(() => {

    const [state, setState] = useState<RandomCharState>({
        isLoading: false,
        error: false,
        char: {
            description: null,
            homepage: "",
            name: null,
            comics: null,
            thumbnail: "",
            wiki: "",
        },
    })


    const onError = () => {
        setState({
            ...state,
            isLoading: false,
            error: true
        });
    };

    const updateRandomChar = () => {
        setState({
            ...state,
            isLoading: true,
            error: false,
        });

        m_service
            .getCharacter(randomId)
            .then((char) => {
                setState({
                    ...state,
                    isLoading: false,
                    error: false,
                    ...char,
                });
            })
            .catch(onError);
    };

    useEffect(() => {
        updateRandomChar()
    }, [])


    return (
        <ErrorBoundary onTryhandler={updateRandomChar} error={state.error}>
            <StyledRandomChar className="randomchar">
                <Preloader
                    isLoading={state.isLoading}
                    afterSpinner={() => <CharView char={state.char}/>}
                />

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        onClick={updateRandomChar}
                        className="button button__main"
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </StyledRandomChar>
        </ErrorBoundary>
    );

})


const CharView: FC<CharViewProps> = memo(({char}) => {


    return (
        <div className="randomchar__block">
            <img
                style={{
                    objectFit: drawCharThubmnail({char})
                }}
                src={char.thumbnail}
                alt="Random character"
                className={"randomchar__img"}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{char.name}</p>
                <p className="randomchar__descr">{char.description}</p>
                <div className="randomchar__btns">
                    <a href={char.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a
                        target="_blank"
                        href={char.wiki}
                        className="button button__secondary"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
})

export default RandomChar;
