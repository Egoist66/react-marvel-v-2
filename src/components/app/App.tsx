import AppHeader from "../appHeader/AppHeader";
import styled from "styled-components";
import {FC, memo} from "react";
import {AppRoutes} from "../../routes/Routes.tsx";


const StyledApp = styled.div``

const App: FC = memo(() => {


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