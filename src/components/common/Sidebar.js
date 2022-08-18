import React, { useState } from 'react'
import { Box, Drawer, List  } from '@mui/material'
import { useLocation} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import AssignmentIcon from '@mui/icons-material/Assignment';
import AppsIcon from '@mui/icons-material/Apps'
import BallotIcon from '@mui/icons-material/Ballot'
import EventIcon from '@mui/icons-material/Event';
import CustomListItemButton from './CustomListItemButton';
import CollapseMenuButton from './CollapseMenuButton';

const Sidebar = () => {
    const location = useLocation()
    const [open, setOpen] = useState(true)
    const handleClick = () => {
        setOpen(!open);
    }

    const sidebarWidth = 250
    const project_id = 'sxsxsx';

    return (
        <Drawer
            container={window.document.body}
            variant='permanent'
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100vh',
                '& > div': { borderRight: 'none' },
                // backgroundColor: '#1B2631',
                [`& .MuiDrawer-paper`]: { 
                    width: sidebarWidth, 
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    backgroundColor: '#EBEDEF',

                }
            }}>
            <Box sx={{height:'50px'}}>
            </Box>
            <List sx={{ width: '100%', component: 'nav', minHeight: '400px'}}>
                <CustomListItemButton icon={<DashboardIcon/>} to='/app/projects' label='Projects' />
                <CollapseMenuButton 
                    icon={<ViewAgendaIcon />} 
                    label='Boards'
                    items={[
                        { icon: <AssignmentIcon/>, to:`/app/work_items/${project_id}`, label: 'Work Items' },
                        { icon: <AppsIcon/>, to: `/app/boards/${project_id}`, label: 'Boards' },
                        { icon: <BallotIcon/>, to: '/app/backlogs', label: 'Backlogs' },
                        { icon: <EventIcon/>, to: '/app/delivery-plans', label: 'Delivery plans' }
                    ]}       
                />
            </List>
        </Drawer>
    )
}

export default Sidebar