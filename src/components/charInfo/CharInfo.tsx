import styled from "styled-components";
import {FC, memo, useEffect} from "react";
import Skeleton from "../skeleton/Skeleton";
import {CharInfoProps} from "../../app-types/types.ts";
import {useChar} from "../../hooks/useChar.ts";
import {CharComicsInfoView} from "./CharComicsInfoView.tsx";

const StyledCharInfo = styled.div``;


const CharInfo: FC<CharInfoProps> = memo(({charId}) => {

    const {loadCharInfo, isLoading, char, error} = useChar(charId!)

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
                    char={char}
                    error={error}
                    isLoading={isLoading}
                    loadCharInfo={loadCharInfo}
                />
            )}
        </StyledCharInfo>
    );

})

export default CharInfo;



