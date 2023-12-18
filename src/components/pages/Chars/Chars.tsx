import {FC, memo, useCallback, useState} from "react";
import ErrorBoundary from "../../error-boundary/ErrorBoundary.tsx";
import RandomChar from "../../randomChar/RandomChar.tsx";
import CharList from "../../charList/CharList.tsx";
import CharInfo from "../../charInfo/CharInfo.tsx";
import decoration from "../../../assets/images/vision.png";

export const Chars: FC = memo(() => {
    const [selectedChar, setChar] = useState<number | null>(null)

    const onCharSelect = useCallback((id: number) => {
        setChar(id)

    }, [selectedChar])

    return (
        <>

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


        </>
    )
})