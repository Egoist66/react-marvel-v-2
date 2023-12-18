import {FC, memo} from "react";
import {CharViewProps} from "../../app-types/types.ts";
import {drawCharThubmnail} from "../../utils/check-thumbnail.ts";

export const RandomCharView: FC<CharViewProps> = memo(({char}) => {


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