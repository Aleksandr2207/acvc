import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { AppProps } from "next/app";
import { theme } from "../constants/mainTheme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <MuiThemeProvider theme={theme}>
        <Component {...pageProps} />
    </MuiThemeProvider>
);

export default App;
