import React from "react"
import {Box} from '@mui/material'
import { Outlet } from 'react-router-dom'
import Sidebar from "../common/Sidebar"
import Toolbar from "../common/Toolbar"

const AppLayout = () => {
    return (
        <Box sx={{
            display: 'flex'
        }}>
            <Toolbar />
            <Sidebar />
            <Box sx={{
                flexGrow: 1,
                pt: '64px',
                pl: '10px',
                pr: '10px',
                width: 'max-content'
            }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default AppLayout