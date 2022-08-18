import React from "react"
import {Box} from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from "../common/Sidebar"
import Toolbar from "../common/Toolbar"
import MainSidebar from "../common/mainSidebar"

const AppLayout = () => {
    const location = useLocation()
    // console.log(location)
    return (
        <Box sx={{ display: 'flex'}}>
            <Toolbar />
            {/* use MainSidebar when location  is app/:asociation */}
            {location.pathname.includes('app/') ? <MainSidebar /> : <Sidebar />}
            {/* { location.pathname === '/app/' ? <MainSidebar /> : <Sidebar /> } */}


            <Box sx={{
                flexGrow: 1,
                pt: '64px',
                pl: '10px',
                pr: '10px',
                width: '80%',
                backgroundColor: '#f8f8f8'
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default AppLayout