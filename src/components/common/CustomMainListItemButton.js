import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListItemButton, Avatar, Typography } from '@mui/material'


function stringToColor(string) {
    let hash = 0
    let i
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */
  
    return color
}
  
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            fontSize: '14px',
            width: 35, 
            height: 35,
            mr: '10px' 
        },
        children: `${name.split(' ')[0][0]}`,
    }
}

const CustomMainListItemButton = ({ children, ...props }) => {
    const location = useLocation()

    return (
        <ListItemButton 
            sx={{
                display: 'flex',
                alignContent: 'space-between', 
                '&.Mui-selected': { backgroundColor: '#c7e0f4', borderLeft: '3px solid #0078d4'}}}
            component={Link}
            to={props.to}
            selected={`/app/${props.to}` === location.pathname}>
            {/* Avatar with random color and first name letter */}
            <Avatar {...stringAvatar(props.label)} variant="rounded" />
            <Typography sx={{fontSize: '14px'}}>
                {props.label}
            </Typography>
        </ListItemButton>
    )
}

export default CustomMainListItemButton