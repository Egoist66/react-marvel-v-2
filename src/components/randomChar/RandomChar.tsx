import mjolnir from "../../assets/images/mjolnir.png";
import styled from "styled-components";
import {FC, memo, useEffect} from "react";
import Preloader from "../preloader/preloader";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import {useChar} from "../../hooks/useChar.ts";
import {RandomCharView} from "./RandomCharView.tsx";

const StyledRandomChar = styled.div``;


const RandomChar: FC = memo(() => {

    const {loadRandomChar, isLoading, error, char} = useChar()

    useEffect(() => {
        loadRandomChar()
    }, [])


    return (
        <ErrorBoundary onTryhandler={loadRandomChar} error={error}>
            <StyledRandomChar className="randomchar">
                <Preloader
                    isLoading={isLoading}
                    afterSpinner={() => <RandomCharView char={char}/>}
                />

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        onClick={loadRandomChar}
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


export default RandomChar;
