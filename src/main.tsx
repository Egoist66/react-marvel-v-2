import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import {GlobalStyles} from "./styles/global.ts";
import {ThemeProvider} from "styled-components";
import {AppTheme} from "./theme/theme.ts";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={AppTheme}>
        <BrowserRouter>
            <GlobalStyles/>
            <App/>
        </BrowserRouter>
    </ThemeProvider>
)
