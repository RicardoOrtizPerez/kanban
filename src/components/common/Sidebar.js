import React, { useState } from 'react'
import { Box, Drawer, IconButton, List, ListItem,ListItemIcon, ListItemText, ListItemButton, Typography, StepIcon, Collapse } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import AssignmentIcon from '@mui/icons-material/Assignment';
import AppsIcon from '@mui/icons-material/Apps'
import BallotIcon from '@mui/icons-material/Ballot'
import EventIcon from '@mui/icons-material/Event';

const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const handleClick = () => {
        setOpen(!open);
    }

    const sidebarWidth = 250

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
            <Box sx={{height:'64px'}}>
            </Box>
            <List sx={{ width: '100%', component: 'nav', minHeight: '400px'}}>
                <ListItemButton component={Link} to="/projects" activeClassName="seleccionado"
                className={(navData) =>
                    console.log(navData)
                    // navData.isActive ? styles.activeTab : styles.inactiveTab
                  }>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ViewAgendaIcon />
                    </ListItemIcon>
                    <ListItemText primary="Boards" />
                    {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </ListItemButton>
                <Collapse in={!open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 2 }}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Work Items" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 2 }}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Boards" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 2 }}>
                            <ListItemIcon>
                                <BallotIcon />
                            </ListItemIcon>
                            <ListItemText primary="Backlogs" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 2 }}>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Delivery plans" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    )
}

export default Sidebar