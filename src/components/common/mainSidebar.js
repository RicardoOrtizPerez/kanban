import { Box, Divider, Drawer, List, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import organizationApi from '../../api/organizationApi'
import CustomMainListItemButton from './CustomMainListItemButton'


const MainSidebar = () => {
    const sidebarWidth = 250
    const [asociations, setAsociations] = React.useState([])

    useEffect(() => {
        let loaded = false
        if (!loaded) {
            organizationApi.getAllOrganizations().then(response => {
                setAsociations(response)
            })
        }
        return () => loaded = true
    },[])

    return (
        <Drawer
            container={window.document.body}
            variant='permanent'
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100vh',
                '& > div': { borderRight: 'none' },
                [`& .MuiDrawer-paper`]: {
                    width: sidebarWidth,
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #e0e0e0'
                }
            }}>
            <Box sx={{height:'50px'}} />
            <Typography variant='body2' sx={{ p:'10px', color: '#888888', fontSize: '15px', fontWeight: '700'}}>
                Organizations
            </Typography>
            <Divider sx={{ ml: '5px', mr: '5px'}} />
            <List sx={{ width: '100%', component: 'nav', minHeight: '400px'}}>
                {
                    asociations.map((asociation, index) => (
                        <CustomMainListItemButton key={index} label={asociation.name} to={asociation._id} />
                    ))
                }
            </List>
        </Drawer>
    )
}

export default MainSidebar