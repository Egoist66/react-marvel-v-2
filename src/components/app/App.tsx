import AppHeader from "../appHeader/AppHeader";
import styled from "styled-components";
import {FC, memo} from "react";
import {Chars} from "../pages/Chars/Chars.tsx";
import ComicsList from "../pages/Comics/ComicsList.tsx";
import {Route, Routes} from "react-router-dom";
import {Page404} from "../pages/404/404.tsx";
import SingleComic from "../pages/SingleComic/SingleComic.tsx";


const StyledApp = styled.div``

const App: FC = memo(() => {

    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>

                <Routes>
                    <Route  index element={<Chars/>}/>
                    <Route path={'comics'} element={<ComicsList/>}/>
                    <Route path={'comics/:id'} element={<SingleComic/>}/>
                    <Route path={'*'} element={<Page404 />}/>
                </Routes>


            </main>

        </StyledApp>
    )

})

export default App;