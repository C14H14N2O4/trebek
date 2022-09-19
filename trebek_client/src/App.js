import { Link } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import React from 'react'
import './styles/App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  }
})

export default function App() {
  return (
    <div className="App">
     <div>
      <ThemeProvider theme={theme}>
      <Stack spacing={2}>
       <nav>
          <Link to="/player" style={{ textDecoration: 'none'}}>
            <Button variant="contained">Register</Button>
            </Link>
      </nav>
      <nav>
          <Link to="/moderator" style={{ textDecoration: 'none'}}>
          <Button variant="contained">Moderate</Button>
            </Link>
      </nav>
      <nav>
          <Link to="/about" style={{ textDecoration: 'none'}}>
          <Button variant="contained">About</Button>
            </Link>
      </nav>
      </Stack>
      </ThemeProvider>
     </div>
    </div>
  );
}

