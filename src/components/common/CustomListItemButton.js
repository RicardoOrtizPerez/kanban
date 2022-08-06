import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CustomListItemButton = ({ children, ...props }) => {
    const location = useLocation()
    return (
        <ListItemButton 
            sx={{ '&.Mui-selected': { backgroundColor: '#F5F5F5', borderLeft: '4px solid #00BFA5'}}}
            component={Link}
            to={props.to}
            selected={props.to === location.pathname}>
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.label} />
        </ListItemButton>
    )
}

export default CustomListItemButton