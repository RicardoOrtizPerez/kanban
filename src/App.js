import logo from './logo.svg';
import './App.css';
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/home'
import Projects from './pages/projects'
import WorkItems from './pages/work_items'
import Board from './pages/board'
import Login from './pages/login'

function App() {
  const theme = createTheme({
    palette: { mode: 'light'}
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route path="/app/:organization" element={<Projects/>} />
            <Route path='/app/projects' element={<Projects/>} />
            <Route path='/app/work_items/:project_id' element={<WorkItems/>} />
            <Route path="/app/boards/:project_id" element={<Board/>} />
          </Route>
          <Route path="/main" element={<AppLayout />}>
            <Route path="/main/:organization" element={<Projects/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
