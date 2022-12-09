import React from 'react'
import {ThemeProvider,createTheme} from "@mui/material"
import { CssBaseline } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const theme=createTheme({
    palette:{
        mode:"light"
    },
});
function Layout() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* fixes browser inconsistencies */}
        <Header/>

        <main>
            <Outlet/>
        </main>

        <footer></footer>
    </ThemeProvider>
  )
}

export default Layout