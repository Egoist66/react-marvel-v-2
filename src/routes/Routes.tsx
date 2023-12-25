import {FC, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Spinner} from "../components/preloader/spinner.tsx";


const LazyChars = lazy(() => import('../components/pages/Chars/Chars.tsx'))
const LazyComics = lazy(() => import('../components/pages/Comics/ComicsList.tsx'))
const LazySingleComic = lazy(() => import('../components/pages/SingleComic/SingleComic.tsx'))
const LazyPage404 = lazy(() => import('../components/pages/404/404.tsx'))

export const AppRoutes: FC = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route  index element={<LazyChars/>}/>
                <Route path={'comics'} element={<LazyComics/>}/>
                <Route path={'comics/:id'} element={<LazySingleComic/>}/>
                <Route path={'*'} element={<LazyPage404 />}/>
            </Routes>
        </Suspense>
    )
}