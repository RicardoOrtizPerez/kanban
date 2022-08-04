import { AppBar, Toolbar as TBar} from '@mui/material'
import React from 'react'

const Toolbar = () => {
    return (
        <AppBar position='fixed' sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#1B2631',
            boxShadow: 'none',
        }}>
            <TBar>

            </TBar>
        </AppBar>
    )
}

export default Toolbar