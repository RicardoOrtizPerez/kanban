import { Box, Button, Divider, Menu, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import BugReportIcon from '@mui/icons-material/BugReport'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const WorkItems = () => {
    const [filter, setFilter] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };
    const openNWI = Boolean(anchorEl);

    const handleNWI = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseNWI = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ p:'10px'}}>
            <Typography sx={{ mt:2, ml:2}} variant="overline" gutterBottom component="div">
                Work Items
            </Typography>
            <Box sx={{
                display: 'flex',
                backgroundColor: '#EBEDEF',
                p: '10px'
            }}>
                <Select value={filter} displayEmpty sx={{ width: '180px', height: '35px'}} onChange={handleChange}>
                    <MenuItem value="to_me">Assigned to me</MenuItem>
                    <MenuItem value="following">Following</MenuItem>
                    <MenuItem value="mentioned">Mentioned</MenuItem>
                    <MenuItem value="my_activity">My activity</MenuItem>
                    <Divider/>
                    <MenuItem value="recent_updated">Recent updated</MenuItem>
                    <MenuItem value="recent_completed">Recent completed</MenuItem>
                    <MenuItem value="recent_created">Recent created</MenuItem>
                </Select>
                <Button 
                    startIcon={<AddIcon/>} 
                    endIcon={ openNWI ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    aria-controls={ openNWI ? 'nwi-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ openNWI ? 'true' : undefined }
                    onClick={handleNWI}
                    >
                    New Work Item
                </Button>
                <Menu
                    id="nwi-menu"
                    anchorEl={anchorEl}
                    open={openNWI}
                    onClose={handleCloseNWI}
                    MenuListProps={{'aria-labelledby': 'nwi-menu' }}>
                    <MenuItem sx={{ minWidth: '180px' }} onClick={handleCloseNWI}>
                        <FlashOnIcon fontSize="small" sx={{color:'#e06c00', mr:2}}/>
                        Epic
                    </MenuItem>
                    <MenuItem sx={{ minWidth: '180px' }} onClick={handleCloseNWI}>
                        <BugReportIcon fontSize="small" sx={{color:'#339947', mr:2}}/>
                        Issue
                    </MenuItem>
                    <MenuItem sx={{ minWidth: '180px' }} onClick={handleCloseNWI}>
                        <CheckBoxIcon fontSize="small" sx={{color:'#9f840a', mr:2}}/>
                        Task
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}

export default WorkItems