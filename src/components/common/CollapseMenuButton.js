import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CustomListItemButton from './CustomListItemButton';

const CollapseMenuButton = ({ children, ...props }) => {
    const location = useLocation()
    const [open, setOpen] = useState(true)
    const handleClick = () => {
        setOpen(!open);
    }
    const items = props.items
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.label} />
                {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </ListItemButton>
            <Collapse in={!open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.map((item, index) => {
                        return <CustomListItemButton key={index} icon={item.icon} to={item.to} label={item.label} />
                    })}
                </List>
            </Collapse>
        </>
    )
}

export default CollapseMenuButton
