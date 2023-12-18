import AppHeader from "../appHeader/AppHeader";
import styled from "styled-components";
import {FC, memo} from "react";
import {Chars} from "../pages/Chars/Chars.tsx";
import {Route, Switch} from "react-router-dom";
import ComicsList from "../pages/comicsList/ComicsList.tsx";


const StyledApp = styled.div``

const App: FC = memo(() => {

    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>

                <Switch>
                    <Route path={'/'} exact render={() => <Chars />} />
                    <Route path={'/comics'} exact render={() => <ComicsList />} />
                    <Route path={'*'} exact render={() => <h2>404</h2>} />
                </Switch>

            </main>

        </StyledApp>
    )

})

export default App;