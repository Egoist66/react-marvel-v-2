import AppHeader from "../appHeader/AppHeader";
import styled from "styled-components";
import {FC, memo} from "react";
import {Chars} from "../pages/Chars/Chars.tsx";
import ComicsList from "../pages/comicsList/ComicsList.tsx";
import {Route, Routes} from "react-router-dom";


const StyledApp = styled.div``

const App: FC = memo(() => {

    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>

                <Routes>
                    <Route  index element={<Chars/>}/>
                    <Route path={'/comics'} element={<ComicsList/>}/>
                    <Route path={'*'} element={<h2>404</h2>}/>
                </Routes>


            </main>

        </StyledApp>
    )

})

export default App;