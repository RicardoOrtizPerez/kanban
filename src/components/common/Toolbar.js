import { AppBar, Toolbar as TBar} from '@mui/material'
import React from 'react'

const Toolbar = () => {
    return (
        <AppBar position='fixed' sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            maxHeight: '50px',
            borderBottom: '1px solid #e8e8e8'
        }}>
            <TBar>

            </TBar>
        </AppBar>
    )
}

export default Toolbar