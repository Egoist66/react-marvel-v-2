import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../assets/images/vision.png';
import styled from "styled-components";
import {FC, memo, useCallback, useState} from "react";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";


const StyledApp = styled.div``

const App: FC = memo(() => {
    const [selectedChar, setChar] = useState<number | null>(null)

    const onCharSelect = useCallback((id: number) => {
        setChar(id)

    }, [selectedChar])

    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">

                    <ErrorBoundary>
                        <CharList
                            selectedChar={selectedChar}
                            onCharSelect={onCharSelect}

                        />
                    </ErrorBoundary>


                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>

        </StyledApp>
    )

})

export default App;