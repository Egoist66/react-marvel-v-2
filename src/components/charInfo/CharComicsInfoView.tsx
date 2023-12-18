import {FC, memo} from "react";
import {CharComicsInfoProps} from "../../app-types/types.ts";
import ErrorBoundary from "../error-boundary/ErrorBoundary.tsx";
import Preloader from "../preloader/preloader.tsx";
import {drawCharThubmnail} from "../../utils/check-thumbnail.ts";

export const CharComicsInfoView: FC<CharComicsInfoProps> = memo(({char, loadCharInfo, isLoading, error,}) => {
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