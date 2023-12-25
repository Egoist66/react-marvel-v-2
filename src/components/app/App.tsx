import AppHeader from "../appHeader/AppHeader";
import styled from "styled-components";
import {FC, memo} from "react";
import {useTitle} from "../../hooks/useTitle.ts";
import {AppRoutes} from "../../routes/Routes.tsx";


const StyledApp = styled.div``

const App: FC = memo(() => {

    useTitle('Home - Characters')

    return (
        <StyledApp className="app">
            <AppHeader/>
            <main>

                <AppRoutes />

            </main>

        </StyledApp>
    )

})

export default App;