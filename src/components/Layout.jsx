import React from 'react'
import {ThemeProvider,createTheme, useMediaQuery} from "@mui/material"
import { CssBaseline } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';



function Layout() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const theme= React.useMemo(
  () =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
  [prefersDarkMode],
);

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