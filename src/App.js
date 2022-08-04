import logo from './logo.svg';
import './App.css';
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout';
import Home from './pages/home';
import Projects from './pages/projects';

function App() {
  const theme = createTheme({
    palette: { mode: 'light'}
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home/>} />
            <Route path='projects' element={<Projects/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
